const express = require("express");
const router = express.Router();
const { Company, Employee } = require("../models");
const auth = require("../middleware/auth");

//Public routes
// GET /api/companies?page=1&limit=10
router.get("/", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 10, 100);
  const offset = (page - 1) * limit;

  const { count, rows } = await Company.findAndCountAll({
    limit,
    offset,
    order: [["id", "ASC"]],
  });
  res.json({ total: count, page, perPage: limit, data: rows });
});
// GET /api/companies/:id
router.get("/:id", async (req, res) => {
  const company = await Company.findByPk(req.params.id, { include: Employee });
  if (!company) return res.status(404).json({ message: "Company not found" });
  res.json(company);
});

//Protected routes
// POST /api/companies
router.post("/", auth, async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/companies/:id
router.put("/:id", auth, async (req, res) => {
  const company = await Company.findByPk(req.params.id);
  if (!company) return res.status(404).json({ message: "Company not found" });
  await company.update(req.body);
  res.json(company);
});

// DELETE /api/companies/:id
router.delete("/:id", auth, async (req, res) => {
  const company = await Company.findByPk(req.params.id);
  if (!company) return res.status(404).json({ message: "Company not found" });
  await company.destroy();
  res.json({ message: "Deleted" });
});

module.exports = router;
