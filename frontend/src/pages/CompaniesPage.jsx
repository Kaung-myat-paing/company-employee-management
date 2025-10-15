import { useEffect, useState, useCallback } from "react";
import API from "../api";
import { Link } from "react-router-dom";
export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

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
    if (window.confirm("Are you sure you want to delete this company?")) {
      await API.delete(`/companies/${id}`);
      loadCompanies();
    }
  };

  return (
    <div>
      <h2>Companies</h2>
      <Link to="/companies/new">
        <button>Create New Company</button>
      </Link>
      <table border="1" cellPadding="8" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Website</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>{company.email}</td>
              <td>{company.address}</td>
              <td>{company.website}</td>
              <td>
                <Link to={`/companies/${company.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(company.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
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
      </div>
    </div>
  );
}
