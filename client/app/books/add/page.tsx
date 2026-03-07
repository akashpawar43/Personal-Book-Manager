"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { flattenError } from "zod";
import { ADD_BOOK_CLEAR, addBook } from "@/redux/books/book.actions";
import { bookSchema } from "@/validations/book.schema";

export default function AddBookForm() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { addSuccess } = useSelector((state: any) => state.books);

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [tags, setTags] = useState("");
    const [status, setStatus] = useState("want_to_read");
    const [errors, setErrors] = useState<any>({});

    const submit = () => {
        const tagArray = tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);

        const result = bookSchema.safeParse({
            title,
            author,
            tags: tagArray,
            status
        });

        if (!result.success) {
            const fieldErrors = flattenError(result.error).fieldErrors;
            setErrors(fieldErrors);
            return;
        }

        setErrors({});

        dispatch(addBook(result.data));
    };

    useEffect(() => {
        if (addSuccess) {
            dispatch({ type: ADD_BOOK_CLEAR });
            router.push("/books");
        }
    }, [addSuccess, router]);

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h1 className="text-xl font-semibold mb-6">Add Book</h1>
            <div className="flex flex-col gap-4">
                <div>
                    <input
                        className="border p-2 rounded w-full"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.title[0]}
                        </p>
                    )}
                </div>
                <div>
                    <input
                        className="border p-2 rounded w-full"
                        placeholder="Author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    {errors.author && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.author[0]}
                        </p>
                    )}
                </div>
                <div>
                    <input
                        className="border p-2 rounded w-full"
                        placeholder="Tags (comma separated)"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                </div>
                <div>
                    <select
                        className="border p-2 rounded w-full"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="want_to_read">Want to Read</option>
                        <option value="reading">Reading</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button
                    onClick={submit}
                    className="bg-black text-white py-2 rounded"
                >
                    Add Book
                </button>
            </div>
        </div>
    );
}