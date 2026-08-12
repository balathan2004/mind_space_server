import { Schema, model } from "mongoose";
import { generateUUID } from "../../utils/helpers";

const UserSchema = new Schema(
    {
        _id: { type: String, default: () => generateUUID(16) },
        displayName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        createdAt: {
            type: Number,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

export const UserModel = model("User", UserSchema);