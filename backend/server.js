import express from "express";
import { PORT } from "./config/envConfig.js";
import { connectDB } from "./utilis/mongodb.js";
import { errorMiddleware } from "./middlewares/ErrorMiddleware.js";
import { adminKeyRouter, userRouter } from "./router/index.js";

const app = express();
app.use(express.json()); // JSON parse

// API route
app.use("/api/admin", adminKeyRouter);
app.use("/api/admin", userRouter);

// Error middleware
app.use(errorMiddleware);

// Connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
