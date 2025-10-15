import { useState, useEffect } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function EmployeeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyId: "",
  });
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    API.get("/companies?page=1&limit=100").then((res) =>
      setCompanies(res.data.data)
    );
    if (id) {
      API.get(`/employees/${id}`).then((res) => {
        setForm({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email || "",
          phone: res.data.phone || "",
          companyId: res.data.companyId,
        });
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await API.put(`/employees/${id}`, form);
      else await API.post("/employees", form);
      navigate("/employees");
    } catch (err) {
      alert("Error saving employee: " + err.message);
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Employee" : "Create Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        <div>
          <label>Company:</label>
          <select
            required
            value={form.companyId}
            onChange={(e) => setForm({ ...form, companyId: e.target.value })}
          >
            <option value="">Select a company</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
