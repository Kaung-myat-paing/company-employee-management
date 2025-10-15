const { sequelize, Company, Employee, User } = require("./models");
const bcrypt = require("bcrypt");

async function seed() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database cleared and recreated.");

    const companies = await Company.bulkCreate([
      {
        name: "Acme Corp",
        email: "info@acme.com",
        address: "123 Acme Way",
        website: "https://acme.example",
      },
      {
        name: "Beta Solutions",
        email: "contact@beta.com",
        address: "99 Beta Blvd",
        website: "https://beta.example",
      },
      {
        name: "Gamma Systems",
        email: "hello@gamma.com",
        address: "55 Gamma Lane",
        website: "https://gamma.example",
      },
    ]);
    console.log("Companies inserted:", companies.length);

    const employees = await Employee.bulkCreate([
      {
        firstName: "Alice",
        lastName: "Wong",
        email: "alice@acme.com",
        phone: "0123456789",
        companyId: companies[0].id,
      },
      {
        firstName: "Bob",
        lastName: "Tan",
        email: "bob@beta.com",
        phone: "0987654321",
        companyId: companies[1].id,
      },
      {
        firstName: "Charlie",
        lastName: "Lim",
        email: "charlie@gamma.com",
        phone: "0112233445",
        companyId: companies[2].id,
      },
    ]);
    console.log("Employees inserted:", employees.length);

    const passwordHash = await bcrypt.hash("password", 10);``
    const user = await User.create({ username: "admin", passwordHash });
    console.log(`User created: ${user.username} / password`);

    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seed();
