# Company & Employee Management Admin Panel

A lightweight Node.js + React admin application providing CRUD management for companies and employees with a relational link (Company 1—* Employees).


---

## Setup Steps

### Prerequisites
- Node.js (LTS recommended)
- npm

### Backend (backend/)
The backend is a Node.js + Express API using Sequelize with SQLite. The database file is created automatically at `backend/database.sqlite`.

1. cd backend
2. npm install
3. Create a `.env` file and set:
   - `JWT_SECRET=<your-strong-secret>`
   - `PORT=4000` (optional; defaults to 4000)
4. Start the server:
   - node server.js
5. The API will run at: http://localhost:${PORT:-4000}

Notes:
- CORS is configured for the frontend dev origin `http://localhost:5173`.
- Auth uses an HttpOnly cookie named `token` for JWT-based sessions.

### Frontend (frontend/)
The frontend is a React app (Vite). It is preconfigured to call the backend at `http://localhost:4000/api` and send cookies.

1. cd frontend
2. npm install
3. npm run dev
4. Open the app at: http://localhost:5173

If you change the backend port or host, update `frontend/src/api.js` accordingly.

---

## API Endpoints

Base URL: `http://localhost:4000/api`  
Auth: Endpoints marked “Protected” require a valid JWT cookie (`token`). Obtain it by registering or logging in.

### Auth
- POST `/auth/register`
  - Body: `{ "username": string, "password": string }`
  - Sets `token` cookie and returns `{ message, username }`
- POST `/auth/login`
  - Body: `{ "username": string, "password": string }`
  - Sets `token` cookie and returns `{ message }`
- POST `/auth/logout`
  - Clears `token` cookie and returns `{ message }`
- GET `/auth/me`
  - Returns decoded user info `{ id, username }` if authenticated
  - 401 if missing cookie; 403 if invalid/expired

### Companies
- GET `/companies`
  - Query: `page` (number, default 1), `limit` (number, default 10, max 100)
  - Public. Returns paginated companies: `{ total, page, perPage, data }`
- GET `/companies/:id`
  - Public. Returns a company with its employees
- POST `/companies`
  - Protected. Body: company fields (e.g., `name`, etc.)
  - Creates a company; returns the created record
- PUT `/companies/:id`
  - Protected. Body: partial or full company fields
  - Updates and returns the company
- DELETE `/companies/:id`
  - Protected. Deletes the company; returns `{ message: "Deleted" }`

### Employees
- GET `/employees`
  - Query: `page` (number, default 1), `limit` (number, default 10, max 100), `companyId` (number, optional)
  - Public. Returns paginated employees with their company: `{ total, page, perPage, data }`
- GET `/employees/:id`
  - Public. Returns an employee with its company
- POST `/employees`
  - Protected. Body: employee fields including `companyId`
  - Validates `companyId`; creates employee; returns the created record
- PUT `/employees/:id`
  - Protected. Body: partial or full employee fields
  - Updates and returns the employee
- DELETE `/employees/:id`
  - Protected. Deletes the employee; returns `{ message: "Deleted" }`

Notes:
- Pagination defaults: `page=1`, `limit=10` (capped at 100).
- Sorting defaults to ascending by `id` for list endpoints.
- Cookies:
  - HttpOnly and `SameSite=Lax` by default.
  - Frontend axios is configured with `withCredentials: true`.


