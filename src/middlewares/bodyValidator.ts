import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

export const validateBody =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body.data);

    if (!result.success) {

      const message = result.error.issues
        .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
        .join(", ");

      console.log("validation error ", message);

      throw new AppError(
        "Validation Error" +
        message,
        400,
      );
    }

    req.body = result.data;

    next();
  };
