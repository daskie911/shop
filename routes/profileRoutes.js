const { Router } = require("express");
const User = require("../models/Users");

const router = new Router();

router.get("/", (req, res) => {
  // if the user is not authenticated, redirect to the login page
  if (!req.session.isAuthenticated) {
    return res.redirect("/login");
  }
  return res.render("profile", { user: req.session.user });
});

module.exports = router;
