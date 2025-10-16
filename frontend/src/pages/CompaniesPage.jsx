import { useEffect, useState, useCallback } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Table from "../components/Table/Table";
import TableRow from "../components/Table/TableRow";
import TablePagination from "../components/Table/TablePagination";
import TableHeader from "../components/Table/TableHeader";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const loadCompanies = useCallback(async () => {
    try {
      const res = await API.get(`/companies?page=${page}&limit=${limit}`);
      setCompanies(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to load companies:", err);
    }
  }, [page, limit]);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  const handleDelete = async (id) => {
    if (!isAuthenticated) {
      alert("You must be logged in to delete a company.");
      navigate("/login", { state: { from: { pathname: "/companies" } } });
      return;
    }
    if (window.confirm("Are you sure you want to delete this company?")) {
      await API.delete(`/companies/${id}`);
      loadCompanies();
    }
  };

  return (
    <div className="m-4 p-4">
      <div className="flex pb-3">
        <h2 className="title">Companies</h2>
        <Link to="/companies/new">
        <button className="btn-secondary ml-3">Create New Company</button>
      </Link>
      </div>
      <Table>
        <TableHeader
          columns={["ID", "Name", "Email", "Address", "Website", "Actions"]}
        />
        <tbody>
          {companies.map((c) => (
            <TableRow key={c.id}>
              <td className="px-4 py-2">{c.id}</td>
              <td className="px-4 py-2">{c.name}</td>
              <td className="px-4 py-2">{c.email}</td>
              <td className="px-4 py-2">{c.address}</td>
              <td className="px-4 py-2">{c.website}</td>
              <td className="px-4 py-2 text-left space-x-2">
                <Link to={`/companies/${c.id}`}>
                  <button className="btn-secondary text-green-700 border-green-700 hover:bg-green-800 hover:text-white">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="btn-secondary text-red-700 border-red-700 hover:bg-red-800 hover:text-white"
                >
                  Delete
                </button>
              </td>
            </TableRow>
          ))}
        </tbody>
      </Table>

      <TablePagination
        currentPage={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
      />
      {/* <table className="min-w-full border border-gray-200 bg-white shadow-sm rounded-lg">
        <thead className="bg-indigo-50 text-indigo-700">
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Address</th>
            <th className="px-4 py-2 border">Website</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id} className="hover:bg-indigo-50 transition">
              <td className="px-4 py-2 border">{company.id}</td>
              <td className="px-4 py-2 border">{company.name}</td>
              <td className="px-4 py-2 border">{company.email}</td>
              <td className="px-4 py-2 border">{company.address}</td>
              <td className="px-4 py-2 border">{company.website}</td>
              <td className="px-4 py-2 border text-center">
                <Link to={`/companies/${company.id}`}>
                  <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2">Edit</button>
                </Link>
                <button onClick={() => handleDelete(company.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      {/* <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {Math.ceil(total / limit) || 1}
        </span>
        <button
          onClick={() =>
            setPage((p) => (p < Math.ceil(total / limit) ? p + 1 : p))
          }
          disabled={page >= Math.ceil(total / limit)}
        >
          Next
        </button>
      </div> */}
    </div>
  );
}
