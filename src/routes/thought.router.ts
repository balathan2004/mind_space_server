import { Router } from "express";
import { ThoughtContoller } from "../controllers/thought.controller";
import { validateBody } from "../middlewares/bodyValidator";
import { thoughtSchema } from "../schemas/thoughtSchema";
const thoughtRouter = Router();



thoughtRouter.get("/", ThoughtContoller.get);

thoughtRouter.get("/:id", ThoughtContoller.getSingle);

// thoughtRouter.post(
//   "/",
//   validateBody(thoughtSchema),
//   ThoughtContoller.create,
// );

thoughtRouter.put(
  "/:id",
  validateBody(thoughtSchema),
  ThoughtContoller.update,
);




export default thoughtRouter;
