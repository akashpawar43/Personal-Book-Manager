export default function Pagination({ page, totalPages, onPage }: any) {
    return (
        <div className="flex gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
                <button
                    key={i}
                    onClick={() => onPage(i + 1)}
                    className={`px-3 py-1 border ${page === i + 1 ? "bg-black text-white" : ""
                        }`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
}