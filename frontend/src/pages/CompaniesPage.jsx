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
  const limit = 10;

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const loadCompanies = useCallback(async () => {
    try {
      const res = await API.get(`/companies?page=${page}&limit=${limit}`);
      setCompanies(res.data.data || []);
      setTotal(res.data.total ?? 0);
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

    if (!window.confirm("Are you sure you want to delete this company?"))
      return;

    try {
      await API.delete(`/companies/${id}`);

      const totalAfter = Math.max(0, total - 1);
      const lastPageAfter = Math.max(1, Math.ceil(totalAfter / limit));

      if (page > lastPageAfter) {
        // Delete the last item on the last page: go back one page
        setPage(lastPageAfter);
      } else {
        // Stay on the same page and refetch
        await loadCompanies();
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/login", { state: { from: { pathname: "/companies" } } });
      } else {
        console.error("Failed to delete company", err);
      }
    }
  };

  return (
    <div className="m-4 p-4">
      <div className="flex pb-3">
        <Link to="/companies/new">
          <button className="btn btn-outline-secondary">
            Create New Company
          </button>
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
                  <button className="btn btn-outline-primary">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="btn btn-outline-secondary"
                >
                  Delete
                </button>
                <Link to={`/employees?companyId=${c.id}`}>
                  <button className="btn btn-primary">View Employees</button>
                </Link>
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

    </div>
  );
}
