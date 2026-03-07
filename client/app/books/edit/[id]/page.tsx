"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import API from "@/lib/api";
import EditBookForm from "@/components/EditBookForm";

export default function EditBookPage() {
    const { id } = useParams();
    const [book, setBook] = useState<any>(null);

    useEffect(() => {
        const fetchBook = async () => {
            const res = await API.get(`/books/${id}`);
            setBook(res.data.data);
        };

        fetchBook();
    }, [id]);

    if (!book) return <p className="text-center mt-10">Loading...</p>;

    return <EditBookForm book={book} />;
}