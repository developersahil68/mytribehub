import User from "./../models/userModel";
import { Request, Response, NextFunction } from "express";

// Get User
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let query = User.findById(req.params.id);
    const doc = await query;

    if (!doc) {
      throw new Error("No document found with that id");
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  } catch (err: any) {
    console.error("authentication error:", err);
    res.status(400).json({
      status: "fail",
      message: "An unknown error occurred .",
    });
  }
};
