import express from "express";
import {
  signup,
  login,
  protect,
  forgotPassword,
  resetPassword,
} from "./../controllers/authController";
import { getUser, getMe } from "./../controllers/userController";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.get("/me", protect, getMe);
router.route("/:id").get(protect, getUser);
export default router;
