import express from "express";
import { userController } from "../controller/User.js";
import { verifyToken } from "../utilis/verifyUser.js";

export const userRouter = express.Router();

userRouter.route("/login").post(userController.login);
userRouter.route("/signout").post(userController.signOut);
userRouter
  .route("/getProfileDetails")
  .get(verifyToken, userController.getProfileDetails);
userRouter
  .route("/updateInfo/:userId")
  .put(verifyToken, userController.updateInfo);
