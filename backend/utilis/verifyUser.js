import jwt from "jsonwebtoken";
import { JWT_SIGNATURE } from "../config/envConfig.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    const authError = {
      status: 401,
      message: "Invalid user!",
      extraDetails: "User unauthenticated!",
    };

    return next(authError);
  } else {
    jwt.verify(token, JWT_SIGNATURE, (err, user) => {
      if (err) {
        const jwtError = {
          status: 401,
          message: "Invalid user, token not found!",
          extraDetails: "User unauthenticated!",
        };

        return next(jwtError);
      } else {
        req.user = user;
        next();
      }
    });
  }
};
