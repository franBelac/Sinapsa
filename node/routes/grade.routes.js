const express = require("express");
const router = express.Router();
const db = require("../db");
const jwt = require("jsonwebtoken");

router.put("/", async (req, res) => {
  let qString = "INSERT INTO GRADE VALUES ($1, $2, $3, $4)";
  let replyQuery = "UPDATE REPLIES SET STATUSVALUE = $1 WHERE POSTID = $2 AND REPLYCREATORID = $3";
  const secretKey = "tajnikljuc";
  const token = req.headers["authorization"];

  const grade = req.body.grade;
  const instructorid = req.body.instructorid;
  const postid = req.body.postid;

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      res.status(401);
      res.json({});
      return;
    }
    const payload = decoded;
    const learnerid = payload.id;
    if (instructorid === learnerid) {
      res
        .status(400)
        .json({ error: "instructorid must not be equal to learnerid" });
      return;
    }

    try {
        const query1 = await db.query(qString, [grade,instructorid, learnerid, postid]);
        const query2 = await db.query(replyQuery, ['graded', postid, instructorid]);

    } catch (DatabaseError) {
      console.error(DatabaseError);
      res.status(400).json({ error: "Could not insert this grade" });
      return;
    }
    res.status(201).json({ status: "success" });
    return;
  });
});

module.exports = router;
