"use client";

import { BookOpen, Tag, X } from "lucide-react";

export default function FilterBar({ status, tag, onFilter, onClear }: any) {
    const hasFilter = status || tag;
    return (
        <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2 border rounded px-3 h-10">
                <BookOpen size={16} className="text-gray-500" />
                <select
                    value={status}
                    onChange={(e) => onFilter({ status: e.target.value })}
                    className="outline-none bg-transparent text-sm"
                >
                    <option value="">All</option>
                    <option value="reading">Reading</option>
                    <option value="completed">Completed</option>
                </select>
            </div>

            <div className="flex items-center gap-2 border rounded px-3 h-10 w-64">
                <Tag size={16} className="text-gray-500" />
                <input
                    value={tag}
                    placeholder="Tag"
                    onChange={(e) => onFilter({ tag: e.target.value })}
                    className="outline-none text-sm w-full"
                />
            </div>

            {hasFilter && (
                <button
                    onClick={onClear}
                    className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
                >
                    <X size={16} />
                    Clear
                </button>
            )}
        </div>
    );
}