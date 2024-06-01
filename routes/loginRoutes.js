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
    
    const comparePassword = await bcrypt.compare(password, userExists.password); // compare the password
    if (!comparePassword) {
      return res.render("login", { // if password is incorrect
        error: "Invalid username or password",
        username,
        password,
      }); // render the login page with an error message
    }
    req.session.user = userExists; 
    req.session.isAuthenticated = true;
    await req.session.save();
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
