const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");
const jwt = require("jsonwebtoken");
const secretKey = "tajnikljuc";

function timestampToDate(rows) {
    for (const row of rows) {
      d = new Date(row.replycreated)
      d = d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
      row.timeofcreation = d
    }
  }

async function updateReplyStatus(value, replyid) {
  let qString = "update replies set statusvalue = $1 where replyid = $2";
  let query = await db.query(qString, [value, replyid]);

  if (query.rowCount) {
    return true;
  } else {
    return false;
  }
}

router.put("/", async (req, res) => {
  console.log(req.body);
  const replyText = req.body.replytext;
  const postId = req.body.postid;
  const token = req.headers["authorization"];

  let qString =
    "insert into replies values(default, $1, current_date, 'aktivan', $2, $3)";

  await jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      res.status(401);
      res.json({});
      return;
    } else {
      const payload = decoded;
      console.log(payload);
      const user = payload.id;

      if (user && replyText && postId) {
        let query = await db.query(qString, [replyText, user, postId]);
        res.status(201).end();
        return;
      } else {
        res.status(400).end();
        return;
      }
    }
  });

  res.status(500).end();
});

router.post("/accept/:replyid", async (req, res) => {
  const replyid = req.params.replyid;

  const status = await updateReplyStatus("accepted", replyid);
  if (status) {
    res.status(200).end();
    return;
  }
  res.status(404).end();
});

router.post("/decline/:replyid", async (req, res) => {
  const replyid = req.params.replyid;

  const status = await updateReplyStatus("declined", replyid);
  if (status) {
    res.status(200).end();
    return;
  }
  res.status(404).end();
});

router.get("/get/:replyid", async (req, res) => {
  const replyid = req.params.replyid;
  const getQuerry = "select * from replies where replyid = $1";
  let reply = await db.query(getQuerry, [replyid]);
  if (reply) {
    rv = reply.rows[0];
    res.json({ reply: rv });
    res.status(200);
    return;
  }
  res.status(404);
  return;
});

router.get("/getall/:postid", async (req, res) => {
  const postid = req.params.postid;
  const getQuerry = "select * from replies where postid = $1";
  let reply = await db.query(getQuerry, [postid]);
  if (reply) {
    rv = reply.rows;
    res.json({ replies: rv });
    res.status(200);
    return;
  }
  res.status(404);
  return;
});

module.exports = router;
