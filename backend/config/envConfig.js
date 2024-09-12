import dotenv from "dotenv";

dotenv.config();

export const {
  PORT,
  MONGODB_URI,
  ADMIN_VERIFY_KEY,
  JWT_SIGNATURE,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_MAIL,
  SMTP_PASSWORD,
  ORIGIN_URL,
} = process.env;
