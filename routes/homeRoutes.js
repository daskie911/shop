const { Router } = require("express");
const User = require("../models/Users");
const router = new Router();

router.get("/", (req, res) => {
  // res.render("index");

  return res.render("index", { user: req.session.user, error: "" });
});

module.exports = router;
