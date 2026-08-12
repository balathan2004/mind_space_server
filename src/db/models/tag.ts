import { Schema, model } from "mongoose";
import { generateUUID } from "../../utils/helpers";
const TagSchema = new Schema(
    {
        _id: { type: String, default: () => generateUUID(16) },
        userId: {
            type: String,
            required: true,
            index: true,
        },
        name: { type: String, required: true },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: "lastModified" },
    },
);

export const TagModel = model("Tag", TagSchema);
