const { Router } = require("express");
const router = new Router();
require("dotenv").config();

router.get("/", (req, res) => {
  try {
    const url = process.env.URL_ADMIN;
    res.render("admin", { error: "", url });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { password, url } = req.body;
    if (password !== process.env.ADMIN_PASSWORD) {
      const url = process.env.URL_ADMIN;
      return res.render("admin", { error: "Invalid password", url });
    }
    req.session.admin = true;
    req.session.isAuthenticated = true;
    await req.session.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
