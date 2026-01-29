import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { AppError } from "../utils/appError";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../utils/config";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../jwt/jwt";
import { SecureUser, User } from "../types";
import { generateUsername } from "unique-username-generator";
import { print } from "../utils/logger";
import { getUser } from "../db/db.functions";

export const AuthServices = {
  async login({ email, password }: { email: string; password: string }) {
    const uid = (await signInWithEmailAndPassword(auth, email, password)).user
      .uid;

    if (!uid) {
      throw new AppError("Account not found", 400);
    }

    const user = await getUser(uid);
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
      created_at: new Date().getTime(),
      display_name: generateUsername("-", 5),
      uid: uid,
    };

    await setDoc(doc(firestore, "users", uid), user);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return { ...user, accessToken, refreshToken } as SecureUser;
  },

  async verifyUsingRefresh(token: string) {
    const payload = verifyRefreshToken(token);

    const { created_at, display_name, email, uid } = payload as User;

    const user = {
      created_at,
      display_name,
      email,
      uid,
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
