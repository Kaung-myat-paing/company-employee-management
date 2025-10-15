import { Routes, Route } from "react-router-dom";
import  Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CompaniesPage from "./pages/CompaniesPage";
import CompanyForm from "./pages/CompanyForm"
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeForm from "./pages/EmployeeForm";
export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/companies/new" element={<CompanyForm />} />
        <Route path="/companies/:id" element={<CompanyForm />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/employees/new" element={<EmployeeForm />} />
        <Route path="/employees/:id" element={<EmployeeForm />} />
      </Routes>
    </div>
  )
}
