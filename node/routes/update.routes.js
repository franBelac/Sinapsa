const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");
const jwt = require("jsonwebtoken");

const userQuery =
  "insert into Post (postTitle, postDescription, timeOfCreation, creatorUserID, categoryID) VALUES ( $1, $2, CURRENT_TIMESTAMP, $3, $4);";
const userQueryUpdate =
  "update Post set postDescription = $1, postTitle = $2 where postID = $3;";

router.post("/", async (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const desc = req.body.description;
  const category = req.body.category;

  const secretKey = "tajnikljuc";

  const token = req.headers["authorization"];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      res.status(401);
      res.json({});
      return;
    } else {
      const payload = decoded;
      console.log(payload);
      const user = payload.id;

      if (id && desc && title) {
        db.query(userQueryUpdate, [desc, title, id]);
      } else if (title && desc && category) {
        console.log(title, desc, user, category);
        db.query(userQuery, [title, desc, user, category]);
      } else {
        res.status(400);
        res.json({ status: "fail" });
        return;
      }
    }
  });
  res.json({ status: "success" });
  return;
});

module.exports = router;
