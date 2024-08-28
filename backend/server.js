import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from "./config/envConfig.js";
import { connectDB } from "./utilis/mongodb.js";
import { errorMiddleware } from "./middlewares/ErrorMiddleware.js";
import { adminKeyRouter, userRouter } from "./router/index.js";

const app = express();
app.use(cookieParser());
app.use(express.json()); //INFO: JSON parse

//NOTE: API route
app.use("/api/admin", adminKeyRouter);
app.use("/api/admin", userRouter);

//NOTE: Error middleware
app.use(errorMiddleware);

//NOTE: Connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
