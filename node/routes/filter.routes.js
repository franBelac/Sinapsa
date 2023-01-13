const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");

function timestampToDate(rows) {
  for (const row of rows) {
    d = new Date(row.timeofcreation)
    d = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
    row.timeofcreation = d
  }
}

function replyTimestampToDate(rows) {
  for (const row of rows) {
    d = new Date(row.replycreated)
    d = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
    row.replycreated = d
  }
}

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

  const qString =
  "select \
    postid, posttitle, postdescription, username, date(timeofcreation) as timeofcreation, categoryname, abbreviationcourse, programename, useravatar \
    from post join registered on post.creatoruserid = registered.userid \
    natural join category natural join course\
    join study_programme on course.programmeid = study_programme.programmeid where programename like '" +
    programename +
    "' and abbreviationcourse like '" +
    abbreviationcourse +
    "' and categoryname like '" +
    categoryname +
    "'" 
    

  console.log(qString);

  try {
    const query = await db.query(qString, []);
    timestampToDate(query.rows)
    console.log(qString);
    body.posts = query.rows;
    res.status(200).json(body);
  } catch (DatabaseError) {
    res.status(400).json({ error: "Database error" });
  }
});

module.exports = router;
