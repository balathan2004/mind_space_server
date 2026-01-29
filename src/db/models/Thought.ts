import { Schema, model } from "mongoose";
import { generateUUID } from "../../utils/helpers";
const ThoughtSchema = new Schema(
  {
    _id: { type: String, default: ()=>generateUUID(16) },
    uid: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }], // array ✅
    occurredAt: { type: Date },
    readsAt: [{ type: Date }],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "lastModified" },
  },
);

export const ThoughtModel = model("Thought", ThoughtSchema);
