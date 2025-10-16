import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import Table from "../components/Table/Table";
import TableRow from "../components/Table/TableRow";
import TablePagination from "../components/Table/TablePagination";
import TableHeader from "../components/Table/TableHeader";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const loadEmployees = useCallback(async () => {
    API.get(`/employees?page=${page}&limit=${limit}`).then((res) => {
      setEmployees(res.data.data);
      setTotal(res.data.total);
    });
  }, [page, limit]);

  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  const handleDelete = async (id) => {
    if (!isAuthenticated) {
      alert("You must be logged in to delete an employee.");
      navigate("/login", { state: { from: { pathname: "/employees" } } });
      return;
    }

    if (window.confirm("Are you sure you want to delete this employee?")) {
      await API.delete(`/employees/${id}`);
      loadEmployees();
    }
  };

  return (
    <div className="m-4 p-4">
      <div className="flex pb-3">
        <h2 className="title">Employees</h2>
        <Link to="/employees/new">
          <button className="btn-secondary ml-3">Create New Employee</button>
        </Link>
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
                  <button className="btn-secondary text-green-700 border-green-700 hover:bg-green-800 hover:text-white">
                    Edit
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(e.id)}
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

      {/* <table border="1" cellPadding="8" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Company</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.Company.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>
                <Link to={`/employees/${employee.id}`}>
                  <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(employee.id)}>
                  Delete
                </button>
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
      </div> */}
    </div>
  );
}
