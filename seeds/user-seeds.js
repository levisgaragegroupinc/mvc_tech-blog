const bcrypt = require("bcrypt");
const { User } = require("../models");

const userSeeds = [
  {
    username: "Sal",
    password: bcrypt.hashSync("password12345", 10),
  },
  {
    username: "Lernantino",
    password: bcrypt.hashSync("password12345", 10),
  },
  {
    username: "Amiko",
    password: bcrypt.hashSync("password12345", 10),
  },
];

const seedUsers = () => User.bulkCreate(userSeeds);

module.exports = seedUsers;
