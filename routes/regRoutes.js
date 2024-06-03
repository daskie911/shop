const { Router } = require("express");
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const router = Router();

router.get("/", (req, res) => {
  res.render("reg", { error: "", username: "", email: "", password: "" });
});

// create a new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // checking if the username already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.render("reg", {
        error: "This username already exist",
        username,
        email,
        password,
      });
    }
    // checking if the email already exists
    const emialExists = await User.findOne({ email });
    if (emialExists) {
      return res.render("reg", {
        error: "This email already exist",
        username,
        email,
        password,
      });
    }

    if (password.length < 6) {
      return res.render("reg", {
        error: "Password should be at least 6 characters",
        username,
        email,
        password,
      });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    req.session.user = user;
    req.session.isAuthenticated = true;
    await req.session.save();
  
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
