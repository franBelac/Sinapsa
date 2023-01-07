const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");

router.get("/id/:id", async (req, res) => {
  const id = req.params.id;
  let qString =
    "select username, firstname, lastname, email, created, useravatar from registered where userid = $1";
  const query = await db.query(qString, [id]);

  if (query.rowCount == 0) {
    res.status(404).json({ error: "no user with such id" });
  }
  res.status(200).json(query.rows[0]);
});

router.get("/:username", async (req, res) => {
  const username = req.params.username;

  let qString =
    "select userid, username, firstname, lastname, email, created, useravatar from registered where username = $1";
  const query = await db.query(qString, [username]);

  if (query.rowCount == 0) {
    res.status(404).json({ error: "no user with such username" });
  }

  res.status(200).json(query.rows[0]);
  return;
});

router.get("/replies/:id", async (req, res) => {
  const id = req.params.id;

  let qString =
    "select replyid, replytext, postid from replies where \
    replycreatorid = $1 and statusvalue = 'aktivan';";
  let query = await db.query(qString, [id]);

  res.status(200).json(query.rows);
  return;
});

router.get("/replies/recieved/:id", async (req, res) => {
  const id = req.params.id;
  let qString =
    "select replyid, replytext, postid from replies natural join post where creatoruserid = $1";
  let query = await db.query(qString, [id]);

  res.status(200).json(query.rows);
});

router.post("/change", async (req, res) => {
  const userId = req.body.userId;
  const newUsername = req.body.newUsername;
  const newPassword = req.body.newPassword;
  const currentPassword = req.body.currentPassword;

  if (newPassword!=""){
    if (newPassword.length<8 ){
      res.status(401).json({ error: "password needs to be at least 8 characters long" }).end();
    }
    else{
      let qString2 =
      "update registered set password=$1 where userid=$2";
      let query2 = await db.query(qString2, [newPassword,userId]);
    }
  }

  if (newUsername!="" ){
    let qString =
    "update registered set username=$1 where userid=$2";
    let query = await db.query(qString, [newUsername,userId]);
  }

  res.status(200).end();
});

module.exports = router;
