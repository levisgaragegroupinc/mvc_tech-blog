const { Post } = require("../models");

const postSeeds = [
  {
    title: "accumsan lacus vel 1",
    post_txt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et sollicitudin ac orci phasellus egestas tellus. Turpis in eu mi bibendum.",
    user_id: 1,
  },
  {
    title: "accumsan lacus vel 2",
    post_txt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et sollicitudin ac orci phasellus egestas tellus. Turpis in eu mi bibendum.",
    user_id: 2,
  },
  {
    title: "accumsan lacus vel 3",
    post_txt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Et sollicitudin ac orci phasellus egestas tellus. Turpis in eu mi bibendum.",
    user_id: 3,
  },
];

const seedPosts = () => Post.bulkCreate(postSeeds);

module.exports = seedPosts;
