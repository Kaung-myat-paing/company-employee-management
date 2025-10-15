const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Company', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    website: { type: DataTypes.STRING }
  }, { timestamps: true });
};