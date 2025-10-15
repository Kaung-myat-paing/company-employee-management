import { useState, useEffect } from "react";
import API from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function CompanyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    website: "",
  });

  useEffect(() => {
    if (id) {
      API.get(`/companies/${id}`).then((res) => setForm(res.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) await API.put(`/companies/${id}`, form);
      else await API.post("/companies", form);
      navigate("/companies");
    } catch (err) {
      alert("Error saving company: " + err.message);
    }
  };

  return (
    <div>
      <h2>{id ? "Edit Company" : "Create Company"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
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
          <label>Address:</label>
          <input
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
          />
        </div>
        <div>
          <label>Website:</label>
          <input
            value={form.website}
            onChange={(e) => setForm({ ...form, website: e.target.value })}
          />
        </div>
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
