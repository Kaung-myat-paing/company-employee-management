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
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="w-96">
        <h2 className="heading-primary">{id ? "Edit Employee" : "Create Employee"}</h2>
        <div className="grid gap-4">
           <div>
          <label className="form-label">First Name:</label>
          <input
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Last Name:</label>
          <input
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Email:</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Phone:</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="form-input"
          />
        </div>
        <div>
          <label
            class="form-label"
          >
            Company
          </label>
          <select
            required
            value={form.companyId}
            onChange={(e) => setForm({ ...form, companyId: e.target.value })}
            class="form-input"
          >
            <option value="">Select a company</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-3">
          <button type="button" className="btn btn-secondary" onClick={()=> navigate(-1)}>Back</button>
          <button type="submit" className="btn btn-secondary">{id ? "Update" : "Create"}</button>
        </div>
        </div>
      </form>
    </div>
  );
}
