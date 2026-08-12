import {
  DataListResponseConfig,
  DataResponseConfig,
  ResponseConfig,
  VerifiedJwtRequest,
} from "../types";
import { ThoughtService } from "../services/thought.services";
import { Response, Request } from "express";
import { AppError } from "../utils/appError";
import { Thought } from "../types";
export const ThoughtContoller = {
  async get(req: Request, res: Response<DataListResponseConfig<Thought>>) {
    const { jwt } = req as VerifiedJwtRequest;
    const { _id } = jwt;
    const data = await ThoughtService.get(_id);
    res.status(200).json({ data, message: "documents fetched" });
  },

  async getSingle(req: Request, res: Response<DataResponseConfig<Thought>>) {
    const { jwt } = req as VerifiedJwtRequest;
    const { _id } = jwt;
    const id = req.params.id as string;
    console.log({ _id, id });
    if (!id) throw new AppError("Document id is required", 400);

    const data = await ThoughtService.getDoc(_id, id);

    res.json({ data: data, message: "document fetched" });
  },

  // async create(req: Request, res: Response<ResponseConfig>) {
  //   const { jwt } = req as VerifiedJwtRequest;
  //   const { _id } = jwt;
  //   const note = req.body;
  //   console.log({ note });
  //   const data = await ThoughtService.create(_id, note);
  //   res.status(201).json({ message: "Document created" });
  // },

  async update(req: Request, res: Response<ResponseConfig>) {
    const { jwt } = req as VerifiedJwtRequest;
    const { _id } = jwt;
    const doc_id = req.params.id as string;

    const note = req.body;

    if (doc_id !== note._id) {
      throw new AppError("Document ID does not match thought ID", 400);
    }

    const data = await ThoughtService.update(_id, note);
    res.json({ message: "Document updated" });
  },
};
