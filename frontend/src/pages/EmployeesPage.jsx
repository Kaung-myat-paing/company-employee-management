import { useEffect, useState } from "react";
import API from "../api";
export default function EmployeesPage() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    API.get("/employees?page=1&limit=10").then((res) =>
      setEmployees(res.data.data)
    );
  }, []);

  return (
    <div>
      <h2>Employees</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>CompanyID</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.companyId}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
