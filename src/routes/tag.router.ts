import { Router } from "express";
import { Request, Response } from "express";
import { validateBody } from "../middlewares/bodyValidator";
import { tagCreateSchema, tagPatchSchema } from "../schemas/thoughtSchema";
import { TagContoller } from "../controllers/tag.controller";
const tagRouter = Router();


tagRouter.get("/", TagContoller.get);

tagRouter.get("/:id", TagContoller.getSingle);

tagRouter.post(
  "/",
  validateBody(tagCreateSchema),
  TagContoller.create,
);

tagRouter.put(
  "/:id",
  validateBody(tagPatchSchema),
  TagContoller.update,
);

export default tagRouter;
