import { Routes, Route } from "react-router-dom";
import  Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CompaniesPage from "./pages/CompaniesPage";
import EmployeesPage from "./pages/EmployeesPage";
export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
      </Routes>
    </div>
  )
}
