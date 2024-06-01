const { Router } = require("express");
const User = require("../models/Users");
const router = new Router();
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.render("login", { error: "", username: "", password: "" });
});

// login a user
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if (!userExists) {
      return res.render("login", {
        error: "Invalid username or password",
        username,
        password,
      });
    }
    
    const comparePassword = await bcrypt.compare(password, userExists.password);
    if (!comparePassword) {
      return res.render("login", {
        error: "Invalid username or password",
        username,
        password,x
      });
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
