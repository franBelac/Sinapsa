const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");
const jwt = require("jsonwebtoken");

const userQuery1 = "delete from Post where postID = $1;";
const userQuery2 = "select * from Post where postID = $1;";
const userQuery3 =
  "insert into deletedpost(explanation, deletoruserid, postid) values ($1, $2, $3);";
const userQuery4 = "select userid from Moderator;";

router.delete("/", async (req, res) => {
  const id = req.body.id;
  const explanation = req.body.explanation;
  const token = req.headers.authorization;
  const secretKey = "tajnikljuc";

  let idModeratora = await db.query(userQuery4);
  ids = [];
  for (let i = 0; i < idModeratora.rowCount; i++) {
    ids.push(idModeratora.rows[i].userid);
  }

  if (id == undefined ) {
    res.status(400);
    res.json({ status: "fail" });
    return;
  }
  console.log("id je ", id);
  const post = await db.query(userQuery2, [id]);
  console.log("post.rowCount je ", post.rowCount);
  if (post.rowCount > 0) {
    console.log("prije userid je ");
    const userid = post.rows[0].creatoruserid;
    console.log("userid je ", userid);
    jwt.verify(token, secretKey, async (err, decoded) => {
      if (err) {
        res.status(401);
        res.json({});
        return;
      }
      //console.log("nema greske")
      const payload = decoded;
      const cuid = payload.id;
      if (ids.includes(cuid) || userid == cuid) {
        await db.query(userQuery1, [id]);
        console.log("brisem");
        res.status(201).end;
        return;
      }
    });
  }
  else{
    res.status(400);
    res.json({ status: "fail" });
    return;
  }
});

module.exports = router;
