import User from "../models/userSchema.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/nodemailerService.js";

export const UserSingUp = asyncHandler(async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {

    return res
      .status(400)
      .json({ error: "Username, password, and email are required" });

  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log(existingUser);
    return res
      .status(409)
      .json({ error: "User already exists. Please log in." });
  }

  const verificationToken = jwt.sign(
    { email, username, password },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  // Send verification email
  const verificationUrl = `${process.env.BASE_URL_BACK_END}/verify-email?token=${verificationToken}`;
  await sendEmail(
    email,
    verificationUrl
  );

  res.status(200).json({
    message: "Please check your email to verify your account.",
  });
});

// Password Reset
export const passwordResetRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      error:
        "No account with that email address exists check given mail or please sign in",
    });
  }

  // Generate a reset token

  const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h", 
  });

  const resetURL = `${process.env.BASE_URL_FRONT_END}/reset-password?token=${resetToken}`;

  await sendEmail(
    email,
    resetURL

  );

  res.status(200).json({ message: "Password reset email sent check mail." });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, password } = req.body;

  console.log(token, password, req.body);

  if (!token || !password) {
    return res
      .status(400)
      .json({ error: "Token and new password are required" });
  }
  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "Password must be at least 8 characters long" });
  }
  try {
    // Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    user.password = password;

    await user.save(); // The pre-save middleware will hash the password and save

    res.status(200).json({ message: "Password has been reset successfully." });
  } catch (error) {
    res.status(400).json({ error: "Invalid or expired token" });
  }
});

export const LogIn = asyncHandler(async (req, res) => {
  const { password, email } = req.body;
   
  if (!password || !email) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found. Please sign up." });
  }
  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  

  res.status(200).json({ token });
});

export const UserProfile = asyncHandler(async (req, res) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("username email role");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {

    res.status(500).json({ error: "Server error" });
  }
});
