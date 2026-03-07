"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { flattenError } from "zod";
import { bookSchema } from "@/validations/book.schema";
import { updateBook } from "@/redux/books/book.actions";
import { BookOpen, User, Tag } from "lucide-react";

export default function EditBookForm({ book }: any) {
    const router = useRouter();
    const dispatch = useDispatch();

    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [tags, setTags] = useState(book.tags.join(", "));
    const [status, setStatus] = useState(book.status);
    const [errors, setErrors] = useState<any>({});

    const submit = () => {
        const tagArray = tags
            .split(",")
            .map((t: any) => t.trim())
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

        dispatch(
            updateBook({
                id: book._id,
                data: result.data
            })
        );

        router.push("/books");
    };

    return (
        <div className="max-w-md mx-auto border rounded-lg p-6 mt-10 bg-white">
            <h1 className="text-xl font-semibold mb-6">Edit Book</h1>
            <div className="flex flex-col gap-4">
                <div className="flex items-center border rounded px-3 h-10">
                    <BookOpen size={16} className="text-gray-500 mr-2" />
                    <input
                        className="outline-none w-full text-sm"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                    />
                </div>

                {errors.title && (
                    <p className="text-red-500 text-sm">{errors.title[0]}</p>
                )}

                <div className="flex items-center border rounded px-3 h-10">
                    <User size={16} className="text-gray-500 mr-2" />
                    <input
                        className="outline-none w-full text-sm"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Author"
                    />
                </div>

                {errors.author && (
                    <p className="text-red-500 text-sm">{errors.author[0]}</p>
                )}

                <div className="flex items-center border rounded px-3 h-10">
                    <Tag size={16} className="text-gray-500 mr-2" />
                    <input
                        className="outline-none w-full text-sm"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        placeholder="Tags (comma separated)"
                    />
                </div>

                <select
                    className="border rounded h-10 px-2"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="want_to_read">Want to Read</option>
                    <option value="reading">Reading</option>
                    <option value="completed">Completed</option>
                </select>

                <button
                    onClick={submit}
                    className="bg-black text-white h-10 rounded"
                >
                    Update Book
                </button>

            </div>
        </div>
    );
}