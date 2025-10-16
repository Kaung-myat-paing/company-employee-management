export default function TableHeader({ columns }) {
  return (
    <thead className="bg-indigo-50 text-[var(--color-on-primary)]">
      <tr>
        {columns.map((col, idx) => (
          <th
            key={idx}
            className="px-4 py-2 text-left font-semibold border-b border-indigo-100"
          >
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
}