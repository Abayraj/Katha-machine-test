import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true, 
    minlength: 6,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 100,
    match: [/.+@.+\..+/, "Please enter a valid email address"], // Basic email format validation 
    lowercase:true
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
    default: "user",
  },
  isVerified: { type: Boolean, default: false },
});

// Hash the password before saving the user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (err) {
    next(err); 
  }
});

userSchema.methods.comparePassword = function (NewPassword) {
  return bcrypt.compare(NewPassword, this.password);
};

const User = mongoose.model("Users", userSchema);
export default User;
