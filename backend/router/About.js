import express from "express";
import { aboutControllerObj } from "../controller/About.js";
import { verifyToken } from "../utilis/verifyUser.js";

export const aboutRouter = express.Router();

//NOTE: Create About details
aboutRouter
  .route("/about/create/:userId")
  .post(verifyToken, aboutControllerObj.createAboutDetails);

//NOTE: Get About Details
aboutRouter.route("/about").get(aboutControllerObj.getAboutDetails);

//NOTE: Get Skills details
aboutRouter.route("/about/skills").get(aboutControllerObj.getSkillsDetails);

//NOTE: Delete the perticular skill details
aboutRouter
  .route("/deleteSkill/:skillId/:userId")
  .delete(verifyToken, aboutControllerObj.deleteSpecificSkill);

//NOTE: Get Certificates details
aboutRouter
  .route("/about/certificates")
  .get(aboutControllerObj.getCertificatesDetails);

//NOTE: Delete the perticular certificate details
aboutRouter
  .route("/deleteCertificate/:certificateId/:userId")
  .delete(verifyToken, aboutControllerObj.deleteSpecificCertificate);

//NOTE: Update about details
aboutRouter
  .route("/updateAbout/:userId")
  .put(verifyToken, aboutControllerObj.updateAbout);
