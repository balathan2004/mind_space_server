import { Tag } from "../types";
import { createTag, getAllTags, getTag, updateTag } from "../db/tags.functions";
import { generateUUID } from "../utils/helpers";

export const TagService = {
    async get(userId: string) {
        const data = (await getAllTags(userId)) as unknown as Tag[];
        return data;
    },

    async getDoc(doc_id: string, userId: string) {
        const data = await getTag(doc_id, userId);
        return data;
    },

    async create(userId: string, name: string) {
        const now = new Date();

        const tag: Tag = {
            _id: generateUUID(16),
            name: name,
            userId: userId,
            createdAt: new Date(),
        };

        await createTag(tag);
        return tag;
    },

    async update(userId: string, note: Tag) {

        await updateTag(userId, note);
        return note;
    },
};
