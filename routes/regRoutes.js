const { Router } = require("express");
const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const router = Router();

router.get("/", (req, res) => {
  res.render("reg", { error: "" });
});

// create a new user
router.post("/", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // checking if the user already exists

    const userExists = await User.findOne({ username, email });
    if (userExists) {
      return res.render("reg", { error: "User already exists" });
    }
    if (password.length < 12) {
      return res.render("reg", { error: "Password should be at least 12 characters" });
    }

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.get("/", (req, res) => {
  res.render("reg");
});

module.exports = router;
