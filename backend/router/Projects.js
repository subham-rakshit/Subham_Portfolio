import express from "express";
import { verifyToken } from "../utilis/verifyUser.js";
import { projectsControllerObj } from "../controller/Projects.js";

export const projectRouter = express.Router();

//NOTE: Create a new project
projectRouter
  .route("/project/create/:userId")
  .post(verifyToken, projectsControllerObj.createNewProject);

//NOTE: Extract all projects from DB
projectRouter.route("/projects/get").get(projectsControllerObj.getAllProjects);

//NOTE: Delete the perticular project
projectRouter
  .route("/deleteProject/:projectId/:userId")
  .delete(verifyToken, projectsControllerObj.deleteSpecificProject);
