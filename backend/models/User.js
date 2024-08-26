import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SIGNATURE } from "../config/envConfig.js";

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//INFO: Middleware for hash the password before save in DB
userSchema.pre("save", async function (next) {
  const me = this; // me = existed user details in DB

  // If password is already hashed then we have to call the next function
  if (!me.isModified("password")) {
    next();
  }
  // Password hashing
  try {
    const hashPassword = await bcrypt.hash(me.password, 10); // Hashed the password
    me.password = hashPassword;
  } catch (error) {
    next(error);
  }
});

//INFO: Middleware for Token Generation
userSchema.methods.generateToken = function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      JWT_SIGNATURE,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.log(`Token generation ERROR: ${error}`);
  }
};

//INFO: Middleware for Compare Password
userSchema.methods.comparePassword = function (password, comparePassword) {
  return bcrypt.compareSync(password, comparePassword);
};

const UserCollection = new mongoose.model("User", userSchema);

export default UserCollection;
