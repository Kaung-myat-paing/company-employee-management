const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize with SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '..', 'database.sqlite'),
  logging: false, 
});

const Company = require('./company')(sequelize);
const Employee = require('./employee')(sequelize);


Company.hasMany(Employee, { foreignKey: 'companyId', onDelete: 'CASCADE' });
Employee.belongsTo(Company, { foreignKey: 'companyId' });

module.exports = { sequelize, Company, Employee };