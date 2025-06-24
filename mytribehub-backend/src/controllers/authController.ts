import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";
import User, { IUser } from "./../models/userModel";
import { promisify } from "util";
import crypto from "crypto";

import { Email } from "./../utils/email";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

const signToken = (id: string): string => {
  const jwtSecret = process.env.JWT_SECRET;
  const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

  if (!jwtSecret || !jwtExpiresIn) {
    throw new Error("JWT_SECRET or JWT_EXPIRES_IN not defined.");
  }

  const signOptions: jwt.SignOptions = {
    expiresIn: jwtExpiresIn as any,
  };
  return jwt.sign({ id }, jwtSecret as jwt.Secret, signOptions);
};
const createSendToken = (
  user: IUser,
  statusCode: number,
  res: Response
): void => {
  const token = signToken(user._id.toString());
  if (!process.env.JWT_COOKIE_EXPIRES_IN) {
    throw new Error(
      "JWT_COOKIE_EXPIRES_IN is not defined in environment variables."
    );
  }

  const jwtCookieExpiresInMs = parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10);

  const cookieOptions: { expires: Date; httpOnly: boolean; secure?: boolean } =
    {
      expires: new Date(
        Date.now() + jwtCookieExpiresInMs * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newUser = await User.create({
      Fullname: req.body.Fullname,
      email: req.body.email,
      password: req.body.password,
    });
    createSendToken(newUser, 201, res);
  } catch (err: any) {
    console.error("Signup error:", err);
    res.status(400).json({
      status: "fail",
      message: err.message || "An unknown error occurred during signup.",
    });
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("please provide an email and password.");
    }

    const user = await User.findOne({ email }).select("+password");
    if (
      !user ||
      !(await user.correctPassword(password, user.password as any))
    ) {
      throw new Error("Incorrect email or password");
    }
    createSendToken(user, 201, res);
  } catch (err: any) {
    console.error("login error:", err);
    res.status(400).json({
      status: "fail",
      message: err.message || "An unknown error occurred during login.",
    });
  }
};

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw new Error("You are not loggen in ! Please log in to get access");
    }
    // const jwtSecret: string = process.env.JWT_SECRET as string;
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECREt is not in the environment variables");
    }
    // token verification
    const decoded = await (promisify(jwt.verify) as any)(
      token,
      process.env.JWT_SECRET
    );

    // check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new Error("The user belonging to this token does no longer exits");
    }

    // check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      throw new Error("User recently changed password! Please log in again");
    }

    // grant access
    req.user = currentUser;
    // res.locals.user = currentUser; if i choose serverside rendering then this
    next();
  } catch (err: any) {
    console.error("authentication error:", err);
    res.status(400).json({
      status: "fail",
      message:
        err.message ||
        "An unknown error occurred during authenticating the user.",
    });
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // get user based on email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw new Error("there is no user with this email address");
  }

  // generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //send it to user's email

  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err: any) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(400).json({
      status: "fail",
      message:
        err.message || "An unknown error occurred during password reset.",
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any | Response> => {
  try {
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "Token is invalid or has expired",
      });
    }

    user.password = req.body.password;
    // user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    return createSendToken(user, 200, res);
  } catch (err: any) {
    console.error("Reset password error:", err);
    return res.status(400).json({
      status: "fail",
      message:
        err.message || "An unknown error occurred during password reset.",
    });
  }
};
