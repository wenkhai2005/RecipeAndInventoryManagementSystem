const express = require("express");

const router = express.Router();

router.use(express.json());

router.get("/health", (req, res) => {
  res.status(200).send("OK");
});

module.exports = router;