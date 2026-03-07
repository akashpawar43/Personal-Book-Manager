import Book from "../models/book.model";

interface BookFilters {
  status?: string;
  tag?: string;
  page?: number;
  limit?: number;
}

export const createBook = async (data: any, userId: string) => {
  return Book.create({ ...data, user: userId });
};

export const getBooks = async (userId: string, filters: BookFilters) => {
  const { status, tag, page = 1, limit = 10 } = filters;

  const query: any = { user: userId };

  if (status) {
    query.status = status;
  }

  if (tag) {
    query.tags = { $in: [tag] };
  }

  const skip = (page - 1) * limit;

  const [books, total] = await Promise.all([
    Book.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Book.countDocuments(query)
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

export const getBookById = async (id: string, userId: string) => {
  const book = await Book.findOne({
    _id: id,
    user: userId
  });

  if (!book) {
    throw new Error("Book not found");
  }

  return book;
};

export const updateBook = async (id: string, data: any, userId: string) => {
  return Book.findOneAndUpdate(
    { _id: id, user: userId },
    data,
    { returnDocument: "after" }
  );
};

export const deleteBook = async (id: string, userId: string) => {
  return Book.findOneAndDelete({ _id: id, user: userId });
};