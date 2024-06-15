const { Router } = require("express");
const router = new Router();
require("dotenv").config();

router.get("/", (req, res) => {
  try {
    const url = process.env.URL_ADMIN;
    res.render("loginAdmin", { error: "", url });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { password } = req.body;
    const url = process.env.URL_ADMIN;

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.render("loginAdmin", { error: "Invalid password", url });
    }

    
    req.session.admin = true; // This is the key to the admin panel
    req.session.isAuthenticated = true; // This is the key to the user panel
    await req.session.save(); // Save the session

    return res.render("admin", { url });
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
});

router.post("/logout", (req, res) => {
  try {
    req.session.destroy();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.redirect("/");
  }
});

router.use("/add", require("./addProductRoutes"));

module.exports = router;
