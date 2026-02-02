import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import { ApiError } from "../utils/ApiError";

export const validate =
  (schema: ObjectSchema) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    });

    if (error) {
      throw ApiError.badRequest(
        "Validation error",
        error.details.map((d) => d.message)
      );
    }

    // replace body with validated, sanitized value
    req.body = value;
    next();
  };

