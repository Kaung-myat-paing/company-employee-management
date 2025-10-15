import { useEffect, useState } from "react";
import  API from "../api";
export default function CompaniesPage() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    API.get("/companies?page=1&limit=10").then((res) =>
      setCompanies(res.data.data)
    );
  }, []);

  return (
    <div>
      <h2>Companies</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          { companies.map((company) => (
            <tr key={company.id}>
              <td>{company.id}</td>
              <td>{company.name}</td>
              <td>{company.email}</td>
              <td>{company.address}</td>
              <td>{company.website}</td>
            </tr>
          )) }
         
        </tbody>
      </table>
    </div>
  );
}
