import {
    DataListResponseConfig,
    DataResponseConfig,
    ResponseConfig,
    Tag,
    VerifiedJwtRequest,
} from "../types";
import { TagService } from "../services/tag.services";
import { Response, Request } from "express";
import { AppError } from "../utils/appError";
import { tagCreateInput } from "../schemas/thoughtSchema";




export const TagContoller = {
    async get(req: Request, res: Response<DataListResponseConfig<Tag>>) {
        const { jwt } = req as VerifiedJwtRequest;
        const { _id } = jwt;
        const data = await TagService.get(_id);
        res.status(200).json({ data, message: "documents fetched" });
    },

    async getSingle(req: Request, res: Response<DataResponseConfig<Tag>>) {
        const { jwt } = req as VerifiedJwtRequest;
        const { _id } = jwt;
        const id = req.params.id as string;
        console.log({ _id, id });
        if (!id) throw new AppError("Document id is required", 400);

        const data = await TagService.getDoc(_id, id);

        res.json({ data: data, message: "document fetched" });
    },

    async create(req: Request, res: Response<ResponseConfig>) {
        const { jwt } = req as VerifiedJwtRequest;
        const { _id } = jwt;
        const { name } = req.body as tagCreateInput;

        const data = await TagService.create(_id, name);
        res.status(201).json({ message: "Document created" });
    },

    async update(req: Request, res: Response<ResponseConfig>) {
        const { jwt } = req as VerifiedJwtRequest;
        const { _id } = jwt;
        const doc_id = req.params.id as string;

        const note = req.body;

        if (doc_id !== note._id) {
            throw new AppError("Document ID does not match thought ID", 400);
        }

        const data = await TagService.update(_id, note);
        res.json({ message: "Document updated" });
    },
};
