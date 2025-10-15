const express = require('express');
const router = express.Router();
const { Employee, Company } = require('../models');

// GET /api/employees?page=1&limit=10
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = Math.min(parseInt(req.query.limit) || 10, 100);
  const offset = (page - 1) * limit;

  const { count, rows } = await Employee.findAndCountAll({
    limit,
    offset,
    order: [['id', 'ASC']],
    include: [{ model: Company, attributes: ['id', 'name'] }]
  });

  res.json({ total: count, page, perPage: limit, data: rows });
});

// GET /api/employees/:id
router.get('/:id', async (req, res) => {
  const emp = await Employee.findByPk(req.params.id, { include: Company });
  if (!emp) return res.status(404).json({ message: 'Employee not found' });
  res.json(emp);
});

// POST /api/employees
router.post('/', async (req, res) => {
  try {
    const { companyId } = req.body;
    const company = await Company.findByPk(companyId);
    if (!company) return res.status(400).json({ message: 'Invalid companyId' });

    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/employees/:id
router.put('/:id', async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) return res.status(404).json({ message: 'Employee not found' });
  await emp.update(req.body);
  res.json(emp);
});

// DELETE /api/employees/:id
router.delete('/:id', async (req, res) => {
  const emp = await Employee.findByPk(req.params.id);
  if (!emp) return res.status(404).json({ message: 'Employee not found' });
  await emp.destroy();
  res.json({ message: 'Deleted' });
});

module.exports = router;