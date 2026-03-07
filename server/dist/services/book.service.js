"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBookById = exports.getBooks = exports.createBook = void 0;
const book_model_1 = __importDefault(require("../models/book.model"));
const createBook = async (data, userId) => {
    return book_model_1.default.create({ ...data, user: userId });
};
exports.createBook = createBook;
const getBooks = async (userId, filters) => {
    const { status, tag, page = 1, limit = 10 } = filters;
    const query = { user: userId };
    if (status) {
        query.status = status;
    }
    if (tag) {
        query.tags = { $in: [tag] };
    }
    const skip = (page - 1) * limit;
    const [books, total] = await Promise.all([
        book_model_1.default.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        book_model_1.default.countDocuments(query)
    ]);
    return {
        books,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit)
        }
    };
};
exports.getBooks = getBooks;
const getBookById = async (id, userId) => {
    const book = await book_model_1.default.findOne({
        _id: id,
        user: userId
    });
    if (!book) {
        throw new Error("Book not found");
    }
    return book;
};
exports.getBookById = getBookById;
const updateBook = async (id, data, userId) => {
    return book_model_1.default.findOneAndUpdate({ _id: id, user: userId }, data, { returnDocument: "after" });
};
exports.updateBook = updateBook;
const deleteBook = async (id, userId) => {
    return book_model_1.default.findOneAndDelete({ _id: id, user: userId });
};
exports.deleteBook = deleteBook;
