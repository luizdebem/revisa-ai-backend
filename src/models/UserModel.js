import mongoose from "mongoose";

export const USER_ROLES = {
  "ROLE_TEACHER": 1,
  "ROLE_STUDENT": 2
};

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  role: {
    type: Number,
    required: true
  }
}, { timestamps: true, versionKey: false });

const User = mongoose.model("User", UserSchema);

export default User;