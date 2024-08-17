import User from "../models/userSchema.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

//if user is authenticated or not

export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "not valid user" });
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log(decoded, "decoded token");
  req.user = await User.findById(decoded.userId);

  if (!req.user) {
    return res.status(404).json({ error: "no user found" });
  }

  next();
});

//Handling user roles

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "not valid type user Access denied",
      });
    }
    next();
  };
};
