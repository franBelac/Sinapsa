const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");

router.post("/", async (req, res) => {
  let body = Object();

  let programename = req.body.programename;
  let abbreviationcourse = req.body.abbreviationcourse;
  let categoryname = req.body.categoryname;

  console.log(programename);
  console.log(abbreviationcourse);
  console.log(categoryname);

  if (programename == null) programename = "%";
  if (abbreviationcourse == null) abbreviationcourse = "%";
  if (categoryname == null) categoryname = "%";

  let qString =
    "select * from post natural join category natural join course natural join study_programme where programename like '" +
    programename +
    "' and abbreviationcourse like '" +
    abbreviationcourse +
    "' and categoryname like '" +
    categoryname +
    "'";

  console.log(qString);

  try {
    const query = await db.query(qString, []);
    console.log(qString);
    body.posts = query.rows;
    res.status(200).json(body);
  } catch (DatabaseError) {
    res.status(400).json({ error: "Database error" });
  }
});

module.exports = router;
