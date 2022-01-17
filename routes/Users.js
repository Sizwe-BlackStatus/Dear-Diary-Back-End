const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middleware/AuthMiddleware");

router.post("/", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!!user) {
    res.json(user);
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      Users.create({
        username: username,
        email: email,
        password: hash,
      });
      res.json("Success");
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  if (!user) res.json(null);
  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong combination" });

    const accessToken = sign(
      {
        id: user.id,
        username: user.username,
      },
      "secrets"
    );
    res.json({ token: accessToken, id: user.id, username: user.username });
  });
});

router.get("/user", validateToken, (req,res) => {
    res.json(req.user)
})

module.exports = router;
