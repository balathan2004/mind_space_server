import { Schema, model } from "mongoose";
import { generateUUID } from "../../utils/helpers";
const ThoughtSchema = new Schema(
  {
    _id: { type: String, default: () => generateUUID(16) },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: {
      ref: "Tag",
      type: [String],
      default: [],
    },
    occurredAt: { type: Date },
    readsAt: {
      type: [Date],
      default: [],
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "lastModified" },
  },
);

export const ThoughtModel = model("Thought", ThoughtSchema);
