const { sequelize, Company, Employee } = require('./models');

(async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced');

  const company = await Company.create({ name: 'Test Co', email: 'test@example.com' });
  const employee = await Employee.create({ firstName: 'Alice', lastName: 'Jones', companyId: company.id });
  
  console.log('Inserted:', { company: company.toJSON(), employee: employee.toJSON()});
  await sequelize.close();
})();