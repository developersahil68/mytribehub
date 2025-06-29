import User from "./../models/userModel";
import { Request, Response, NextFunction } from "express";

import catchAsync from "./../utils/catchAsync";
import AppError from "../utils/appError";

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
