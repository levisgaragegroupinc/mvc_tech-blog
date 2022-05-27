const { User } = require("../models");

const userSeeds = [
  {
    name: "Sal",
    password: "password12345",
  },
  {
    name: "Lernantino",
    password: "password12345",
  },
  {
    name: "Amiko",
    password: "password12345",
  },
];

const seedUsers = () => User.bulkCreate(userSeeds);

module.exports = seedUsers;
