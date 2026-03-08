"use client";

import { deleteBook, UPDATE_BOOK_CLEAR, updateBook } from "@/redux/books/book.actions";
import { BookOpen, CircleCheck, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BookCard({ book }: any) {
  const dispatch = useDispatch();
  const { updateSuccess } = useSelector((state: any) => state.books);

  const handleStatusChange = (status: string) => {
    dispatch(
      updateBook({
        id: book._id,
        data: { status },
      })
    );
  };

  const handleDelete = () => {
    dispatch(deleteBook(book._id));
  };

  useEffect(() => {
    if (updateSuccess) {
      dispatch({ type: UPDATE_BOOK_CLEAR });
    }
  }, [updateSuccess]);

  return (
    <div className="border rounded-lg p-4 flex justify-between items-start bg-white">
      <div>
        <h3 className="font-semibold text-lg">{book.title}</h3>
        <p className="text-sm text-gray-600">{book.author}</p>
        <p className="text-xs text-gray-400 mt-1">
          Status: {book.status}
        </p>
        <div className="flex gap-2 mt-2 flex-wrap">
          {book?.tags?.map((tag: string, i: number) => (
            <span
              key={i}
              className="text-xs px-2 py-1 bg-gray-100 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-3 text-gray-600">
        <button
          onClick={() => handleStatusChange("reading")}
          className="hover:text-blue-500"
        >
          <BookOpen size={18} />
        </button>

        <button
          onClick={() => handleStatusChange("completed")}
          className="hover:text-green-500"
        >
          <CircleCheck size={18} />
        </button>

        <Link
          href={`/books/edit/${book._id}`}
          className="text-gray-600 hover:text-black"
        >
          <Pencil size={18} />
        </Link>

        <button
          onClick={handleDelete}
          className="hover:text-red-500"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
}