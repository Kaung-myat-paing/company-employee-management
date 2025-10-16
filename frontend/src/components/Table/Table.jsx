export default function Table({ children, className = "" }) {
  return (
    <div className="overflow-x-auto">
      <table
        className={`min-w-full border border-gray-200 bg-white shadow-sm rounded-lg ${className}`}
      >
        {children}
      </table>
    </div>
  );
}