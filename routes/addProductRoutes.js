const { Router } = require("express");
const Product = require("../models/Product");
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

router.post("/add", async (req, res) => {
  try {
    if (!req.session.admin) {
      return res.redirect("/");
    }

    const { name, price, description, image } = req.body;

    const product = new Product({
      name,
      price,
      description,
      image,
    });

    await product.save();
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
