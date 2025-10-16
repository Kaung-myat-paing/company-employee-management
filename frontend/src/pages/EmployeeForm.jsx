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
        <h2 className="title">{id ? "Edit Employee" : "Create Employee"}</h2>
        <div className="grid gap-4">
           <div>
          <label className="label">First Name:</label>
          <input
            required
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            className="text-field"
          />
        </div>
        <div>
          <label className="label">Last Name:</label>
          <input
            required
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            className="text-field"
          />
        </div>
        <div>
          <label className="label">Email:</label>
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="text-field"
          />
        </div>
        <div>
          <label className="label">Phone:</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="text-field"
          />
        </div>
        <div>
          <label
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Company
          </label>
          <select
            required
            value={form.companyId}
            onChange={(e) => setForm({ ...form, companyId: e.target.value })}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select a company</option>
            {companies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-primary">{id ? "Update" : "Create"}</button>
        </div>
      </form>
    </div>
  );
}
