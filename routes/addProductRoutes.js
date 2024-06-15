const { Router } = require("express");
const router = new Router();

router.get("/", (req, res) => {
  try {
    if (!req.session.admin) {
      return res.redirect("/");
    }
    
    const url = process.env.URL_ADMIN;
    res.render("addProduct", { error: "", url });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
