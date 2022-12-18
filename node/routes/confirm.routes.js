const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/:username", async (req, res) => {
  const username = req.params.username;

  let qString = "UPDATE REGISTERED SET created=current_date where username=$1";
  const query = await db.query(qString, [username]);

  if (query.rowCount == 0) {
    res.status(404).json({ error: "no user with such username" });
    return;
  }

  res.status(200).send("<p>Hvala na registraciji " + username + " </p>");
  return;
});

module.exports = router;
