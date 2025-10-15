const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const cors = require('cors');

const companyRoutes = require('./routes/company');
const employeeRoutes = require('./routes/employee');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/companies', companyRoutes);
app.use('/api/employees', employeeRoutes);

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    await sequelize.sync();
    app.listen(PORT, () =>
      console.log(`Server running at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();