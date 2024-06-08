const { Router } = require("express");
const User = require("../models/Users");
const bcrypt = require("bcryptjs");

const router = new Router();

router.get("/", (req, res) => {
  // if the user is not authenticated, redirect to the login page
  if (!req.session.isAuthenticated) {
    return res.redirect("/login");
  }
  return res.render("profile", { user: req.session.user, error: "" });
});

// change password
router.post("/changePassword", async (req, res) => {
  if (!req.session.isAuthenticated) {
    return res.redirect("/login");
  }
  const { oldPassword, newPassword } = req.body;
  const user = await User.findOne({ email: req.session.user.email });
  if (!user) {
    return res.redirect("/login");
  }

  // compare the old password with the password in the database
  const comparePassword = await bcrypt.compare(oldPassword, user.password);

  // if the password is incorrect, render the profile page with an error message
  if (!comparePassword) {
    return res.render("profile", {
      user: req.session.user,
      error: "Invalid password!❌",
    });
  }

  // hash the new password
  const hash = await bcrypt.hash(newPassword, 12);
  user.password = hash; 
  await user.save();
  res.render("profile", { user: req.session.user, error: "Your password are changed!✅" })
});

module.exports = router;
