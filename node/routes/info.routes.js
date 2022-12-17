const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");

router.get("/", async (req, res) => {
  let bigQuerry =
    "select * from course natural join category where courseid = 1";
  let qString1 = "select * from course";
  let qString2 = "select * from category where courseid = $1";

  //try {
  const query1 = await db.query(qString1, []);
  const bq = await db.query(bigQuerry, []);
  let body = {};
  body.courses = query1.rows.map((x) => x.abbreviationcourse);
  body.categories = bq.rows.map((x) => x.categoryname);
  /*
  query1.rows.forEach(async (row) => {
    let rv = {};
    let cid = row.courseid;
    let klj = row.abbreviationcourse;
    rv.course = row.abbreviationcourse;
    rv.categories = bq.rows
      .filter((cat) => cat.courseid == cid)
      .map((x) => x.categoryname);
    body.lista.push(rv);
    console.log("rv je ", rv);
  });
  */
  console.log("body jw ovo :", body);
  res.json(body);
  res.status(200);
  /*
        } catch (DatabaseError) {
            res.status(400).json({error: "Database error"})
        }*/
});

module.exports = router;
