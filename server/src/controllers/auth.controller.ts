import { type Request, type Response } from "express";
import * as authService from "../services/auth.service";
import { sendError, sendSuccess } from "../utils/response.util";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await authService.registerUser(email, password);

    return sendSuccess(res, data, "User registered successfully", 201);
  } catch (error: any) {
    return sendError(res, error.message, 400);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await authService.loginUser(email, password);

    return sendSuccess(res, data, "Login successful");
  } catch (error: any) {
    return sendError(res, error.message, 400);
  }
};