import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="p-6">
      <section className="rounded-xl text-white p-6 mb-6 bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] text-[var(--color-on-primary)]">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="opacity-90 mt-1">
          Manage companies and employees. Choose an action to get started.
        </p>
        <div className="mt-4 flex gap-3">
          <Link to="/companies">
            <button className="btn btn-primary">View Companies</button>
          </Link>
          <Link to="/employees">
            <button className="btn btn-outline-primary">View Employees</button>
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Companies</h3>
          <p className="text-sm text-gray-600 mb-3">
            Create, edit, delete companies and see their employees.
          </p>
          <div className="flex gap-2">
            <Link to="/companies/new">
              <button className="btn btn-secondary">Create Company</button>
            </Link>
            <Link to="/companies">
              <button className="btn btn-outline-secondary">Browse</button>
            </Link>
          </div>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Employees</h3>
          <p className="text-sm text-gray-600 mb-3">
            Manage employees and assign them to companies.
          </p>
          <div className="flex gap-2">
            <Link to="/employees/new">
              <button className="btn btn-secondary">Create Employee</button>
            </Link>
           
            <Link to="/employees">
              <button className="btn btn-outline-secondary">Browse</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}