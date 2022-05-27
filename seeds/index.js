const sequelize = require("../config/connection");

const seedPosts = require("./post-seeds");
const seedUsers = require("./user-seeds");
const seedComments = require("./comment-seeds");

const seedDatabase = async () => {
  await sequelize.seync({ force: true });
  console.log("/n--- Database synced");

  await seedUsers();
  console.log("/n--- Users seeded");

  await seedPosts();
  console.log("/n--- Posts seeded");

  await seedComments();
  console.log("/n--- Comments seeded");

  process.exit(0);
};

seedDatabase();
