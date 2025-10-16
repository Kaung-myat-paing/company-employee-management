export default function TablePagination({ currentPage, total, limit, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / limit));
  const page = Math.min(Math.max(1, currentPage), totalPages);

  if (totalPages <= 1) return null;

  const goTo = (p) => {
    if (!onPageChange) return;
    const next = Math.min(Math.max(1, p), totalPages);
    if (next !== page) onPageChange(next);
  };

  const buildPages = () => {
    const pages = [];
    const maxButtons = 7; // includes first/last and ellipses
    if (totalPages <= maxButtons) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }
    const siblings = 1;
    const start = Math.max(2, page - siblings);
    const end = Math.min(totalPages - 1, page + siblings);

    pages.push(1);
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);
    return pages;
  };

  const items = buildPages();

  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="text-sm text-gray-600">
        Showing {(page - 1) * limit + 1} to {Math.min(page * limit, total)} of {total}
      </div>

      <div className="flex items-center gap-1">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => goTo(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          Prev
        </button>

        {items.map((it, idx) =>
          it === "..." ? (
            <span key={`e-${idx}`} className="px-2 select-none">
              …
            </span>
          ) : (
            <button
              key={it}
              onClick={() => goTo(it)}
              className={`px-3 py-1 border rounded ${
                it === page ? "bg-[var(--color-primary)] text-[var(--color-on-primary)] border-[var(--color-primary)]" : "hover:bg-gray-50"
              }`}
              aria-current={it === page ? "page" : undefined}
            >
              {it}
            </button>
          )
        )}

        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => goTo(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
}