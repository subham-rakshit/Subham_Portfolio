import mongoose from "mongoose";
import { MONGODB_URI } from "../config/envConfig.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connection Successful to DB");
  } catch (error) {
    console.log(`Database connection error: ${error}`);
    process.exit(0);
  }
};
