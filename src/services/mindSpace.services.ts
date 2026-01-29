import { Thought } from "../types";
import { createThought, getAllThoughts, getThought } from "../db/db.functions";

export const ThoughtService = {
  async get(uid: string) {
    const data = (await getAllThoughts(uid)) as unknown as Thought[];
    return data;
  },

  async getDoc(doc_id: string, uid: string) {
    const data = await getThought(doc_id, uid);
    return data;
  },

  async create(uid: string, note: Thought) {
    const now = new Date();

    const newThought: Thought = {
      _id: note._id!,
      title: note.title ?? "",
      description: note.description ?? "",
      uid: uid,
      occurredAt: note.occurredAt ? new Date(note.occurredAt) : now,
      createdAt: new Date(),
      lastModified: new Date(),
      readsAt: [now],
      tags: note.tags ?? [],
    };

    await createThought(newThought);
    return newThought;
  },

  async update(uid: string, note: Thought) {
    return { note };
  },
};
