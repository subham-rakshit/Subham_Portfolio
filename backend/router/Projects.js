import express from "express";
import { verifyToken } from "../utilis/verifyUser.js";
import { projectsControllerObj } from "../controller/Projects.js";

export const projectRouter = express.Router();

projectRouter
  .route("/project/create/:userId")
  .post(verifyToken, projectsControllerObj.createNewProject);
