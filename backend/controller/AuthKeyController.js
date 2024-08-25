import { ADMIN_VERIFY_KEY } from "../config/envConfig.js";

export const adminKeyChecks = (req, res, next) => {
  try {
    const { authKey } = req.body;

    // Checks admin's key
    if (authKey === ADMIN_VERIFY_KEY) {
      return res.status(200).json({
        success: true,
        message: "You have successfully access ADMIN panel",
      });
    } else {
      const authKeyError = {
        status: 401,
        message: "Unauthorized",
        extraDetails: "Access to the ADMIN panel is unauthorized.",
      };

      return next(authKeyError);
    }
  } catch (error) {
    return next(error);
  }
};
