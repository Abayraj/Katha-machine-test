import User from "../models/userSchema.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

export const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;
  console.log(token, "token");

  if (!token) {
    return res.status(400).json({ error: "Verification token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decoded,"jwtt")
    const { email, username, password } = decoded;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.redirect(`${process.env.BASE_URL_FRONT_END}/#/login`);
    }

    // Save the user data to the database
    const user = new User({ username, password, email, isVerified: true });
    await user.save();
    return res.redirect(`${process.env.BASE_URL_FRONT_END}/#/login`);
  } catch (error) {
    res.status(400).json({ error: "Invalid or expired token sign up again" });
  }
});
