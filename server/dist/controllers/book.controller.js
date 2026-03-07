"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getBooks = exports.createBook = void 0;
const bookService = __importStar(require("../services/book.service"));
const response_util_1 = require("../utils/response.util");
const createBook = async (req, res) => {
    try {
        const book = await bookService.createBook(req.body, req.userId);
        return (0, response_util_1.sendSuccess)(res, book, "Book created successfully", 201);
    }
    catch (error) {
        return (0, response_util_1.sendError)(res, "Error creating Book", 500);
    }
};
exports.createBook = createBook;
const getBooks = async (req, res) => {
    try {
        const status = req.query.status;
        const tag = req.query.tag;
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const books = await bookService.getBooks(req.userId, { status, tag, page, limit });
        return (0, response_util_1.sendSuccess)(res, books, "Books fetched successfully");
    }
    catch (error) {
        return (0, response_util_1.sendError)(res, "Internal Server Error", 500);
    }
};
exports.getBooks = getBooks;
const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await bookService.getBookById(bookId, req.userId);
        return (0, response_util_1.sendSuccess)(res, book, "Book fetched successfully");
    }
    catch (error) {
        return (0, response_util_1.sendError)(res, "Internal Server Error", 500);
    }
};
exports.getBookById = getBookById;
const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await bookService.updateBook(bookId, req.body, req.userId);
        return (0, response_util_1.sendSuccess)(res, book, "Book updated successfully");
    }
    catch (error) {
        return (0, response_util_1.sendError)(res, "Internal Server Error", 500);
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;
        await bookService.deleteBook(bookId, req.userId);
        return (0, response_util_1.sendSuccess)(res, null, "Book deleted successfully");
    }
    catch (error) {
        return (0, response_util_1.sendError)(res, "Internal Server Error", 500);
    }
};
exports.deleteBook = deleteBook;
