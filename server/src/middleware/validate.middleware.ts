import { type Request, type Response, type NextFunction } from "express";
import { ZodError, ZodType, flattenError } from "zod";
import { sendError } from "../utils/response.util";

export const validate =
  (schema: ZodType<any>) =>
    (req: Request, res: Response, next: NextFunction) => {
      try {
        schema.parse(req.body);
        next();
      } catch (error: any) {
        if (error instanceof ZodError) {
          const formattedError = flattenError(error);

          return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: formattedError.fieldErrors
          });
        }

        return sendError(res, "Internal Server Error", 400);
      }
    };