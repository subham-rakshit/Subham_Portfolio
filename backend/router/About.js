import express from "express";
import { aboutControllerObj } from "../controller/About.js";
import { verifyToken } from "../utilis/verifyUser.js";

export const aboutRouter = express.Router();

aboutRouter
  .route("/about/create/:userId")
  .post(verifyToken, aboutControllerObj.createAboutDetails);
