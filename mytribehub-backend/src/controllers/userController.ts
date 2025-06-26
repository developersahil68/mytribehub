import User from "./../models/userModel";
import { Request, Response, NextFunction } from "express";

import catchAsync from "./../utils/catchAsync";
import AppError from "../utils/appError";

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
