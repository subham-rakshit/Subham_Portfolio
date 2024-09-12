import express from "express";
import { contactControler } from "../controller/Contact.js";

export const contactRouter = express.Router();

contactRouter.route("/contact/query").post(contactControler);
