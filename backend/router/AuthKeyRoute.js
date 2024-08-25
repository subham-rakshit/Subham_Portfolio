import express from "express";
import { adminKeyChecks } from "../controller/AuthKeyController.js";

export const adminKeyRouter = express.Router();

adminKeyRouter.route("/key").post(adminKeyChecks);
