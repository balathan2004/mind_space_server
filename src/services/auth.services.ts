import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AppError } from "../utils/appError";
import { auth } from "../utils/config";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../jwt/jwt";
import { SecureUser, User } from "../types";
import { generateUsername } from "unique-username-generator";
import { print } from "../utils/logger";
import { createUser, getUser } from "../db/db.functions";

export const AuthServices = {
  async login({ email, password }: { email: string; password: string }) {
    const uid = (await signInWithEmailAndPassword(auth, email, password)).user
      .uid;

    if (!uid) {
      throw new AppError("Account not found", 400);
    }

    let user = await getUser(uid)

    const userData: User = {
      email,
      createdAt: new Date().getTime(),
      displayName: generateUsername("-", 5),
      _id: uid,
    };


    if (user == null) {
      user = userData
      await createUser(userData);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    return { ...user, accessToken, refreshToken } as SecureUser;
  },

  async register({ email, password }: { email: string; password: string }) {
    const uid = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    ).then((user) => user.user.uid);

    const user: User = {
      email,
      createdAt: new Date().getTime(),
      displayName: generateUsername("-", 5),
      _id: uid,
    };

    await createUser(user);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { ...user, accessToken, refreshToken } as SecureUser;
  },

  async verifyUsingRefresh(token: string) {
    const payload = verifyRefreshToken(token);

    const { createdAt, displayName, email, _id } = payload as User;

    const user = {
      createdAt,
      displayName,
      email,
      _id,
    };

    if (!user) {
      print("data not found");
      throw new AppError("unauthorised", 400);
    }

    const accessToken = generateAccessToken(user);

    return { ...user, accessToken } as SecureUser;
  },

  async forgetPassword(email: string) {
    const res = await sendPasswordResetEmail(auth, email);
  },
};
