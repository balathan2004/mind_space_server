import { Thought } from "../types";
import { getAllThoughts, getThought, updateThought } from "../db/thought.functions";

export const ThoughtService = {
  async get(userId: string) {
    const data = (await getAllThoughts(userId)) as unknown as Thought[];
    return data;
  },

  async getDoc(doc_id: string, userId: string) {
    const data = await getThought(doc_id, userId);
    return data;
  },

  // async create(userId: string, note: Thought) {
  //   const now = new Date();

  //   const newThought: Thought = {
  //     _id: note._id!,
  //     title: note.title ?? "",
  //     description: note.description ?? "",
  //     userId: userId,
  //     occurredAt: note.occurredAt ? new Date(note.occurredAt) : now,
  //     createdAt: new Date(),
  //     lastModified: new Date(),
  //     readsAt: [now],
  //     tags: note.tags ?? [],
  //   };

  //   await createThought(newThought);
  //   return newThought;
  // },

  async update(userId: string, note: Thought) {
    return await updateThought(userId, note);
  },
};
