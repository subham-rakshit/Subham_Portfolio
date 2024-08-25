import express from "express";
import { userController } from "../controller/User.js";

export const userRouter = express.Router();

userRouter.route("/login").post(userController.login);
