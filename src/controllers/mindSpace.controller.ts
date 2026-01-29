import {
  DataListResponseConfig,
  DataResponseConfig,
  ResponseConfig,
  VerifiedJwtRequest,
} from "../types";
import { ThoughtService } from "../services/mindSpace.services";
import { Response, Request } from "express";
import { AppError } from "../utils/appError";
import { Thought } from "../types";
export const MindSpaceContoller = {
  async get(req: Request, res: Response<DataListResponseConfig<Thought>>) {
    const { jwt } = req as VerifiedJwtRequest;
    const { uid } = jwt;
    const data = await ThoughtService.get(uid);
    res.status(200).json({ data, message: "documents fetched" });
  },

  async getSingle(req: Request, res: Response<DataResponseConfig<Thought>>) {
    const { jwt } = req as VerifiedJwtRequest;
    const { uid } = jwt;
    const id = req.params.id as string;
    console.log({uid,id});
    if (!id) throw new AppError("Document id is required", 400);

    const data = await ThoughtService.getDoc( uid,id);

    res.json({ data: data as any, message: "document fetched" });
  },

  async create(req: Request, res: Response<ResponseConfig>) {
    const { jwt } = req as VerifiedJwtRequest;
    const { uid } = jwt;
    const note = req.body;
    console.log({ note });
    const data = await ThoughtService.create(uid, note);
    res.status(201).json({ message: "Document created" });
  },

  async update(req: Request, res: Response<ResponseConfig>) {
    const { jwt } = req as VerifiedJwtRequest;
    const { uid } = jwt;
    const doc_id = req.params.id as string;

    const note = req.body;

    if (doc_id !== note._id) {
      throw new AppError("Document ID does not match thought ID", 400);
    }

    const data = await ThoughtService.update(uid, note);
    res.json({ message: "Document updated" });
  },
};
