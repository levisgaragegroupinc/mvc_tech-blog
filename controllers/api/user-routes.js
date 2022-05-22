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

// GET SINGLE USER BY ID
router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findByPk({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "post_txt", "created_at"],
        },
        {
          model: Comment,
          attributes: ["id", "comment_txt", "created_at"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    });
    if (!userData) {
      res
        .status(404)
        .json({ message: `No user with ID ${req.params.id} found.` });
    }
    res.render("nameoftemplate_here", {
      postData,
    });
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;

// CREATE NEW USER
router.post("/", (req, res) => {
  try {
const newUserRequest = req.body;
newUserRequest.password = await bcrypt.has(req.body.password, 10);
    const newUser = await User.create(newUser);
    res.render('nameoftemplate_here');
  } catch (error) {
    console.log(err);
    res.status(500).json(err);
  }
});
