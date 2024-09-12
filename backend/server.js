import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { ORIGIN_URL, PORT } from "./config/envConfig.js";
import { connectDB } from "./utilis/mongodb.js";
import { errorMiddleware } from "./middlewares/ErrorMiddleware.js";
import {
  aboutRouter,
  adminKeyRouter,
  contactRouter,
  projectRouter,
  userRouter,
} from "./router/index.js";

const app = express();
app.use(
  cors({
    origin: ORIGIN_URL,
    credentials: true, // Allow credentials (cookies) to be sent
  })
);
app.use(cookieParser());
app.use(express.json()); //INFO: JSON parse

//NOTE: API route
app.use("/api/admin", adminKeyRouter);
app.use("/api/admin", userRouter);
app.use("/api/admin", projectRouter);
app.use("/api/admin", aboutRouter);
app.use("/api/user", contactRouter);

//NOTE: Error middleware
app.use(errorMiddleware);

//NOTE: Connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
