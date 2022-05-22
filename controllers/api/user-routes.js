const router = require("express").Router();
const { Post, User, Comment } = require("../../models");

// GET ALL USERS ROUTE
router.get("/", async (req, res) => {
  try {
    const allUsersData = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    if (!allUsersData) {
      res.status(404).json({ message: `No users found.` });
    }
    const users = allUsersData.map((user) => {
      user.get({ plain: true });
    });
    res.render("nameoftemplate_here", {
      users,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});
