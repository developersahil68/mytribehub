import User from "./../models/userModel";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import sharp from "sharp";

import catchAsync from "./../utils/catchAsync";
import AppError from "../utils/appError";

//image uploading

const multerStorage = multer.memoryStorage();

const multerFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image ! Please upload only images", 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadUserPhoto = upload.single("photo");
export const resizeUserPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user?.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`public/img/users/${req.file.filename}`);

    next();
  }
);

const filterObj = (
  obj: Record<string, any>,
  ...allowedFields: string[]
): Record<string, any> => {
  const newObj: Record<string, any> = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// update me
export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body?.password) {
      return next(new AppError("this route is not for password updates", 400));
    }

    // filtering the fields that we dont want to update
    const filteredBody = filterObj(req.body, "fullName", "email");

    if (req.file) filteredBody.photo = req.file.filename;

    //updating user doc
    const updatedUser = await User.findByIdAndUpdate(
      req.user?.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  }
);
// GEt me
export const getMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?._id;

    if (!userId) {
      return res
        .status(401)
        .json({ message: "User ID not found in session/token." });
    }

    const user = await User.findById(userId).select("-password"); // Exclude password
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ success: true, user });
  }
);
// Get User
export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let query = User.findById(req.params.id);
    const doc = await query;

    if (!doc) {
      return next(new AppError("No document found with that id", 500));
      // throw new Error("No document found with that id");
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  }
);
