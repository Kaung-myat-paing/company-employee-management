import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import Table from "../components/Table/Table";
import TableRow from "../components/Table/TableRow";
import TablePagination from "../components/Table/TablePagination";
import TableHeader from "../components/Table/TableHeader";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  // sync companyId with URL query param
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCompanyId = searchParams.get("companyId") || "";
  const [companyFilter, setCompanyFilter] = useState(initialCompanyId);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Keep local state in sync if the URL changes
  useEffect(() => {
    const id = searchParams.get("companyId") || "";
    setCompanyFilter(id);
  }, [searchParams]);

  // When the filter changes, reset to page 1 and update the URL
  useEffect(() => {
    setPage(1);
    const next = new URLSearchParams(searchParams);
    if (companyFilter) next.set("companyId", companyFilter);
    else next.delete("companyId");
    setSearchParams(next, { replace: true });
  }, [companyFilter]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [companyFilter, page]);

  const fetchCompanies = async () => {
    try {
      const res = await API.get("/companies");
      const list = res.data?.data ?? res.data;
      setCompanies(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Failed to load companies:", err);
      setCompanies([]);
    }
  };

  const fetchEmployees = async () => {
    const res = await API.get("/employees", {
      params: {
        companyId: companyFilter || undefined,
        page,
        limit,
      },
    });

    const { total, data } = res.data;
    setEmployees(data || []);
    setTotal(total ?? 0);
  };

  const handleDelete = async (id) => {
    if (!isAuthenticated) {
      alert("You must be logged in to delete an employee.");
      navigate("/login", { state: { from: { pathname: "/employees" } } });
      return;
    }

    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;

    try {
      await API.delete(`/employees/${id}`);

      const totalAfter = Math.max(0, total - 1);
      const lastPageAfter = Math.max(1, Math.ceil(totalAfter / limit));

      if (page > lastPageAfter) {
        // Delete the last item on the last page: go back one page
        setPage(lastPageAfter);
      } else {
        // Stay on the same page and refetch
        await fetchEmployees();
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/login", { state: { from: { pathname: "/employees" } } });
      } else {
        console.error("Failed to delete employee:", err);
      }
    }
  };

  return (
    <div className="m-4 p-4">
      <div className="flex pb-3 items-center justify-between">
        <div>
          <Link to="/employees/new">
          <button className="btn btn-outline-secondary">
            Create New Employee
          </button>
        </Link>
        </div>
        <div>
          <label className="form-label">Filter by Company:</label>
          <select
          className="form-input"
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
        >
          <option value="">All Companies</option>
          {(companies || []).map((c) => (
            <option key={c.id} value={String(c.id)}>
              {c.name}
            </option>
          ))}
        </select>
        </div>
      </div>
     
      <Table>
        <TableHeader
          columns={[
            "ID",
            "First Name",
            "Last Name",
            "Company",
            "Email",
            "Phone",
            "Actions",
          ]}
        />
        <tbody>
          {employees.map((e) => (
            <TableRow key={e.id}>
              <td className="px-4 py-2">{e.id}</td>
              <td className="px-4 py-2">{e.firstName}</td>
              <td className="px-4 py-2">{e.lastName}</td>
              <td className="px-4 py-2">{e.Company?.name}</td>
              <td className="px-4 py-2">{e.email}</td>
              <td className="px-4 py-2">{e.phone}</td>
              <td className="px-4 py-2 text-left space-x-2">
                <Link to={`/employees/${e.id}`}>
                  <button className="btn btn-outline-primary">Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(e.id)}
                  className="btn btn-outline-secondary"
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
    </div>
  );
}
