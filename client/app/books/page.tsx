"use client";

import { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "@/redux/books/book.actions";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import FilterBar from "@/components/FilterBar";
import { BookOpen, Plus } from "lucide-react";

export default function BooksPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { books, pagination } = useSelector((state: any) => state.books);

  const page = Number(searchParams.get("page")) || 1;
  const status = searchParams.get("status") || "";
  const tag = searchParams.get("tag") || "";

  useEffect(() => {
    dispatch(getBooks({ status, tag, page, limit: 5 }));
  }, [page, status, tag]);

  const updateQuery = (params: any) => {
    const query = new URLSearchParams(searchParams.toString());

    Object.keys(params).forEach((key) => {
      if (params[key]) {
        query.set(key, params[key]);
      } else {
        query.delete(key);
      }
    });

    router.push(`/books?${query.toString()}`);
  };

  const handlePage = (p: number) => {
    updateQuery({ page: p });
  };

  const handleFilter = (filters: any) => {
    updateQuery({
      ...filters,
      page: 1,
    });
  };

  const clearFilters = () => {
    router.push("/books");
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 font-semibold text-lg">
          <BookOpen size={18} />
          Books
        </div>
        <Link
          href="/books/add"
          className="flex items-center gap-1 bg-black text-white px-3 py-2 rounded text-sm"
        >
          <Plus size={16} />
          Add Book
        </Link>
      </div>

      <FilterBar
        status={status}
        tag={tag}
        onFilter={handleFilter}
        onClear={clearFilters}
      />

      <div className="grid gap-4">
        {books?.map((book: any) => (
          <BookCard
            key={book._id}
            book={book}
          />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={pagination?.totalPages || 0}
        onPage={handlePage}
      />
    </div >
  );
}