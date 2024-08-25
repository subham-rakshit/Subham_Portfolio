import dotenv from "dotenv";

dotenv.config();

export const { PORT, MONGODB_URI, ADMIN_VERIFY_KEY, JWT_SIGNATURE } =
  process.env;
