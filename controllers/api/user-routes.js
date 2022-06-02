const router = require("express").Router();
const { Post, User, Comment } = require("../../models");
// const withAuth = require("../../utils/auth");

// GET ALL USERS ROUTE. /api/users
router.get("/", async (req, res) => {
  console.log("Get all users.");
  res.json("All users");
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
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// TEST ALL USERS ROUTE
// router.get("/", async (req, res) => {
//   try {
//     const allUsersData = await User.findAll({
//       attributes: { exclude: ["password"] },
//     });
//     if (!allUsersData) {
//       res.status(404).json({ message: `No users found.` });
//     }
//     // const users = allUsersData.map((user) => {
//     //   user.get({ plain: true });
//     // });
//     res.status(200).json(allUsersData);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// });

// GET SINGLE USER BY ID ROUTE. /api/users/1
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
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// CREATE NEW USER ROUTE /api/users
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
    req.session.save(() => {
      req.session.loggedIn = true;
    });
    res.status(200).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// USER LOGIN ROUTE
router.post("/login", async (req, res) => {
  console.log("Login user route here!");
  try {
    const userData = await User.findOne({
      where: { username: req.body.username },
    });
    if (!userData) {
      res.status(404).json({ message: "Login failed. Please try again!" });
      return;
    }

    console.log("username on user routes.js", req.body.username);
    console.log("password on user routes.js", req.body.password);
    console.log(userData);

    // const validPassword = await userData.checkPassword(req.body.password);
    // console.log("is password valid?", validPassword);

    // if (!validPassword) {
    //   res.status(400).json({ message: "Login failed. Please try again!" });
    //   return;
    // }
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
    });
    res.json({ user: userData, message: "You are now logged in!" });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// USER UPDATE ROUTE

// USER LOGOUT ROUTE.
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// USER DELETE ROUTE
router.delete("/:id", async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res
        .status(404)
        .json({ message: `No user found with id: ${req.params.id}` });
    }
    res.status(200).json(userData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
