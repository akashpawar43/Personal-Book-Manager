import { type Response } from "express";
import * as bookService from "../services/book.service";
import { type AuthRequest } from "../middleware/auth.middleware";
import { sendError, sendSuccess } from "../utils/response.util";

export const createBook = async (req: AuthRequest, res: Response) => {
  try {
    const book = await bookService.createBook(req.body, req.userId!);

    return sendSuccess(res, book, "Book created successfully", 201);
  } catch (error) {
    return sendError(res, "Error creating Book", 500);
  }
};

export const getBooks = async (req: AuthRequest, res: Response) => {
  try {
    const status = req.query.status as string | undefined;
    const tag = req.query.tag as string | undefined;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const books = await bookService.getBooks(req.userId!, { status, tag, page, limit });

    return sendSuccess(res, books, "Books fetched successfully");
  } catch (error) {
    return sendError(res, "Internal Server Error", 500);
  }
};

export const getBookById = async (req: AuthRequest, res: Response) => {
  try {
    const bookId = req.params.id as string;
    
    const book = await bookService.getBookById(bookId, req.userId!);
    
    return sendSuccess(res, book, "Book fetched successfully");
  } catch (error) {
    return sendError(res, "Internal Server Error", 500);
  }
};

export const updateBook = async (req: AuthRequest, res: Response) => {
  try {
    const bookId = req.params.id as string;
    const book = await bookService.updateBook(
      bookId,
      req.body,
      req.userId!
    );
    
    return sendSuccess(res, book, "Book updated successfully");
  } catch (error) {
    return sendError(res, "Internal Server Error", 500);
  }
};

export const deleteBook = async (req: AuthRequest, res: Response) => {
  try {
    const bookId = req.params.id as string;
    await bookService.deleteBook(bookId, req.userId!);
    
    return sendSuccess(res, null, "Book deleted successfully");
  } catch (error) {
    return sendError(res, "Internal Server Error", 500);
  }
};