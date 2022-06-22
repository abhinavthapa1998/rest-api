const express = require("express");
const router = express.Router();
const Document = require("../models/document");

router.get("/", async (req, res) => {
  try {
    const doc = await Document.find();
    res.json(doc);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
