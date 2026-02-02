import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";

// Global error-handling middleware
export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        details: err.details
      }
    });
  }

  return res.status(500).json({
    error: {
      message: "Something went wrong"
    }
  });
}

