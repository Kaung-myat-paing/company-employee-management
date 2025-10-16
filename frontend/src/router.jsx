import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompaniesPage from "./pages/CompaniesPage";
import CompanyForm from "./pages/CompanyForm";
import EmployeesPage from "./pages/EmployeesPage";
import EmployeeForm from "./pages/EmployeeForm";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import App from "./App.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Public Routes
      { index: true, element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      {path: "/signup", element: <SignUpPage />},
      {
        path: "/companies",
        element: <CompaniesPage />,
      },
      {
        path: "/employees",
        element: <EmployeesPage />,
      },

      //Protected Routes
      {
        path: "/companies/new",
        element: (
          <ProtectedRoute>
            <CompanyForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/companies/:id",
        element: (
          <ProtectedRoute>
            <CompanyForm />
          </ProtectedRoute>
        ),
      },

      {
        path: "/employees/new",
        element: (
          <ProtectedRoute>
            <EmployeeForm />
          </ProtectedRoute>
        ),
      },
      {
        path: "/employees/:id",
        element: (
          <ProtectedRoute>
            <EmployeeForm />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
