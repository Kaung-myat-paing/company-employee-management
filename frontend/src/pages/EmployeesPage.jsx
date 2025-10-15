import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

  const loadEmployees = () => {
    API.get("/employees?page=1&limit=10").then((res) =>
      setEmployees(res.data.data)
    );
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async (id) => {
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
    </div>
  );
}
