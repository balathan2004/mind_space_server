import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
} from "firebase/firestore";
import { firestore } from "../utils/config";
import mongoose from "mongoose";
import { encryptedDoc, Thought, User } from "../types";
import { AppError } from "../utils/appError";
import { thoughtSchema } from "../schemas/thoughtSchema";
import { ThoughtModel } from "./models/Thought";

export const collectionRefMaker = (uid: string) => {
  const collectionRef = collection(firestore, `mindspace/${uid}/thoughts`);

  return collectionRef;
};

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("🔥 MongoDB connected");
  } catch (err) {
    console.error("❌ Mongo connection failed", err);
    process.exit(1);
  }
};

export const getUser = async (uid: string) => {
  const docRef = doc(firestore, "users", uid);
  const user = await getDoc(docRef);

  if (!user.exists()) {
    throw new AppError("User not found", 400);
  }
  return user.data() as User;
};

export const createUser = async (user: User) => {
  const docRef = doc(firestore, "users", user.uid);
  const document = await getDoc(docRef);
  if (document.exists()) {
    throw new AppError("User dupilcate error", 400);
  }

  await setDoc(docRef, user);
};

export const getThought = async (uid: string, doc_id: string) => {
  const data = (await ThoughtModel.findOne({
    uid: uid,
    _id: doc_id,
  })) as Thought;
  console.log("doc found", { data });
  return data;
};

export const getAllThoughts = async (uid: string) => {
  const data = await ThoughtModel.find({ uid: uid });
  return data;
};

export const createThought = async (data: Thought) => {
  const { createdAt, lastModified, ...safeData } = data;
  const res = await ThoughtModel.create(safeData);
};

export async function paginatedDocs(
  collectionRef: CollectionReference<DocumentData, DocumentData>,
  cursor?: string,
) {
  let q;

  if (!cursor) {
    q = query(collectionRef, orderBy("__name__", "desc"), limit(Number(10)));
  } else {
    q = query(
      collectionRef,
      orderBy("__name__", "desc"),
      startAfter(cursor),
      limit(10),
    );
  }

  const snap = await getDocs(q);
  const docs = snap.docs.map((doc) => doc.data() as encryptedDoc);

  return docs;
}
