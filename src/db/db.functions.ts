import mongoose from "mongoose";
import { User } from "../types";
import { AppError } from "../utils/appError";
import { UserModel } from "./models/user";



export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {
      user: process.env.MONGODB_USERNAME,
      pass: process.env.MONGODB_PASSWORD,
      dbName: "mindspace",
    });
    console.log("🔥 MongoDB connected");
  } catch (err) {
    console.error("❌ Mongo connection failed", err);
    process.exit(1);
  }
};

export const getUser = async (uid: string) => {

  const user = await UserModel.findById(uid).lean() as User

  if (!user) return null;

  return user

};

export const createUser = async (user: User) => {
  const existingUser = await UserModel.findOne({ _id: user._id });

  if (existingUser) {
    throw new AppError("User duplicate error", 400);
  }

  return await UserModel.create(user);
};
