import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);

  const loadCompanies = () => {
    API.get("/companies?page=1&limit=10").then((res) =>
      setCompanies(res.data.data)
    );
  };

  useEffect(() => {
    loadCompanies();
  }, []);

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
    </div>
  );
}
