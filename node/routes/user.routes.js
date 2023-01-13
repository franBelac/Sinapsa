const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");
const jwt = require("jsonwebtoken");

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

router.get("/", async (req, res) => {
  const token = req.headers["authorization"];
  const secretKey = "tajnikljuc";
  
  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      res.status(401);
      res.json({});
      return;
    }
    const payload = decoded;
    const id = payload.id;
    let qString1 = 
     "select userid, username, firstname, lastname, email, created, useravatar from registered where userid = $1;";
    const qString2 = "select userid from Moderator where userid = $1;";


    const query1 = await db.query(qString1, [id]);
    const query2 = await db.query(qString2, [id]);
    if (query1.rowCount == 0) {
      res.status(404).end();
      return;
    }
    let body = Object()
    body.user = query1.rows[0];
    body.isAdmin = query2.rowCount == 1;
    res.status(200).json(body);
    return 
  });
});

router.get("/replies", async (req, res) => {
  const token = req.headers["authorization"];
  const secretKey = "tajnikljuc";
  
  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      res.status(401);
      res.json({});
      return;
    }
    const payload = decoded;
    const id = payload.id;
    let qString = "select replyid, replytext, postid from replies where \
      replycreatorid = $1 and statusvalue = 'aktivan';";
    let query = await db.query(qString, [id]);

    res.status(200).json(query.rows);
  });
});

router.get("/replies/recieved", async (req, res) => {
  const token = req.headers["authorization"];
  const secretKey = "tajnikljuc";
  
  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      res.status(401);
      res.json({});
      return;
    }
    const payload = decoded;
    const id = payload.id;
    let qString =
    "select replyid, replytext, postid from replies natural join post where creatoruserid = $1";
    let query = await db.query(qString, [id]);

    res.status(200).json(query.rows);
  });
});


router.post("/change", async (req, res) => {
  console.log("daco was here")
  console.log(req.body)
  const token = req.headers["authorization"];
  const secretKey = "tajnikljuc";
  let id = -1;
  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) {
      res.status(401);
      res.json({});
      return;
    }
    const payload = decoded;
    id = payload.id;
  });
  const userId = id;
  const newUsername = req.body.newUsername;
  const newPassword = req.body.newPassword;
  const currentPassword = req.body.currentPassword;

  let qStringPassword =
    "select password from registered where userid=$1";
  let databasePassword = await db.query(qStringPassword, [userId]);
  
  if (databasePassword){
    let row = databasePassword.rows[0];
    databasePassword= row.password;
    console.log(databasePassword)
    console.log(currentPassword)
    console.log(currentPassword != databasePassword)
    if (databasePassword!=currentPassword){
      console.log('we here')
      res.status(401).json({ error: "currentPassword and databasePassword do not match" }).end();
      return
    }
  }
  else{
    res.status(401).json({ error: "no password in database" }).end();
    return
  }
  console.log('password is okay')
  if (newPassword!=""){
    if (newPassword.length<8){
      res.status(401).json({ error: "password needs to be at least 8 characters long" }).end();
      return
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
  console.log('200')
});

router.post("/change", async (req, res) => {
  const userId = req.body.userId;
  const newUsername = req.body.newUsername;
  const newPassword = req.body.newPassword;
  const currentPassword = req.body.currentPassword;

  let qStringPassword =
    "from registered select password where userid=$1";
  let databasePassword = await db.query(qStringPassword, [userId]);
  
  if (databasePassword){
    let row = databasePassword.rows[0];
    databasePassword= row.password;
    if (databasePassword!=currentPassword){
      res.status(401).json({ error: "currentPassword and databasePassword do not match" }).end();
    }
  }
  else{
    res.status(401).json({ error: "no password in database" }).end();
  }

  if (newPassword!=""){
    if (newPassword.length<8){
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
