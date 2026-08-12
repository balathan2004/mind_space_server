
import { Tag } from "../types";
import { TagModel } from "./models/tag";


export const getTag = async (userId: string, doc_id: string) => {
  const data = (await TagModel.findOne({
    userId: userId,
    _id: doc_id,
  })) as Tag;
  console.log("doc found", { data });
  return data;
};

export const getAllTags = async (userId: string) => {
  const data = await TagModel.find({ userId: userId });
  return data;
};

export const createTag = async (data: Tag) => {
  const { createdAt, ...safeData } = data;
  const res = await TagModel.create(safeData);
};


export const updateTag = async (userId: string, data: Tag) => {
  const { _id, ...safeData } = data;
  const res = await TagModel.findOneAndUpdate(
    { userId: userId, _id: _id },
    safeData,

    {
      new: true, upsert: true,
      setDefaultsOnInsert: true,
    }
  );
  return res;
}


