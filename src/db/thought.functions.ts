import { Thought, } from "../types";
import { ThoughtModel } from "./models/Thought";


export const getThought = async (userId: string, doc_id: string) => {
  const data = (await ThoughtModel.findOne({
    userId: userId,
    _id: doc_id,
  }).populate('tags')) as Thought | null;
  if (!data) {
    throw new Error("Document not found");
  }

  console.log("doc found", { data });
  return data;
};

export const getAllThoughts = async (userId: string) => {
  const data = await ThoughtModel.find({ userId: userId }).populate('tags')
  return data;
};

// export const createThought = async (data: Thought) => {
//   const { createdAt, lastModified, ...safeData } = data;
//   const res = await ThoughtModel.create(safeData);
// };


export const updateThought = async (userId: string, data: Thought) => {
  const { _id, ...safeData } = data;
  const res = await ThoughtModel.findOneAndUpdate(
    { userId: userId, _id: _id },
    safeData,

    {
      new: true, upsert: true,
      setDefaultsOnInsert: true,
    }
  );
  return res;
}
