const sequelize = require("../config/connection");
// const { User, Comment, Post } = require("../models");

const postSeeds = require("./post-seeds");
const userSeeds = require("./user-seeds");
const commentSeeds = require("./comment-seeds");

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });
// };

const seedDatabase = async () => {
  await sequalize.seync({ force: true });
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
