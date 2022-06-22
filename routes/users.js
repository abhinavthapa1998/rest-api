const express = require("express");
const router = express.Router();
const Users = require("../models/users");

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
