export default function TableRow({ children }) {
  return (
    <tr className="hover:bg-indigo-50 transition border-b border-gray-100">
      {children}
    </tr>
  );
}