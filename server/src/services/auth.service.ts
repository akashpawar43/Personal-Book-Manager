import User from "../models/user.model";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

export const registerUser = async (email: string, password: string) => {
  const existing = await User.findOne({ email });

  if (existing) throw new Error("User already exists");

  const hashed = await hashPassword(password);

  const user = await User.create({
    email,
    password: hashed
  });

  const token = generateToken(user._id.toString());

  return { user, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("Invalid credentials");

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) throw new Error("Invalid credentials");

  const token = generateToken(user._id.toString());

  return { user, token };
};