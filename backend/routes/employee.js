const express = require("express");
const router = express.Router();
const { Employee, Company } = require("../models");
const auth = require("../middleware/auth");

//Public routes
// GET /api/employees?page=1&limit=10
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 10, 100);
  const offset = (page - 1) * limit;
  const { companyId } = req.query;

  // Build WHERE clause
  const where = {};

  if (companyId) {
    // if companyId sent as string, convert to int
    where.companyId = parseInt(companyId, 10);
  }

  const { count, rows } = await Employee.findAndCountAll({
    where,
    include: [{ model: Company, attributes: ["id", "name"] }],
    limit,
    offset,
    order: [["id", "ASC"]],
  });

  res.json({ total: count, page, perPage: limit, data: rows });
});

// GET /api/employees/:id
router.get("/:id", async (req, res) => {
  const emp = await Employee.findByPk(req.params.id, { include: Company });
  if (!emp) return res.status(404).json({ message: "Employee not found" });
  res.json(emp);
});

//Protected routes
// POST /api/employees
router.post("/", auth, async (req, res) => {
  try {
    const { companyId } = req.body;
    const company = await Company.findByPk(companyId);
    if (!company) return res.status(400).json({ message: "Invalid companyId" });

    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/employees/:id
router.put("/:id", auth, async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) return res.status(404).json({ message: "Employee not found" });
  await emp.update(req.body);
  res.json(emp);
});

// DELETE /api/employees/:id
router.delete("/:id", auth, async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) return res.status(404).json({ message: "Employee not found" });
  await emp.destroy();
  res.json({ message: "Deleted" });
});

module.exports = router;
