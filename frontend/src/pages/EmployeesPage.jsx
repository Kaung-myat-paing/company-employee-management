import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";

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
    <div>
      <h2>Employees</h2>
      <Link to="/employees/new">
        <button>Create New Employee</button>
      </Link>
      <table border="1" cellPadding="8" style={{ marginTop: "10px" }}>
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
      </div>
    </div>
  );
}
