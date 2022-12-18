const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");
const nodemailer = require("nodemailer");

async function sendConfirmationEmail(email, username) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    service: "gmail",
    //port: 587,
    //secure: false, // true for 465, false for other ports
    auth: {
      user: "turbulentech@gmail.com", //pass gmaila je sinapsa123, ali to se ne koristi u app nego ovo dolje
      pass: "zzaviuknkyuzwtla",
    },
  });

  let link = "ax1.axiros.hr:8081/confirm/" + username;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "turbulentech@gmail.com", // sender address
    to: email, // list of receivers
    subject: "Email confirmation", // Subject line
    text:
      "Hi!\n\nPlease go to " +
      link +
      " to confirm your email.\nThank you!\nTurbulentech", // plain text body
    //html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

const insertQuery =
  "insert into REGISTERED(firstname,lastname,username,useravatar,password,email,created) values ($1, $2, $3, $4, $5, $6, null)";

router.post("/", async (req, res) => {
  const firstname = req.body.name;
  const surname = req.body.surname;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const myFile = req.files.file;
  const fname = myFile.name.split(".")
  const newName = username.concat(".").concat( fname[fname.length - 1])
  const path = `${__dirname}/../public/${newName}`;

  await myFile.mv(path, function (err) {
    if (err) {
      return res.status(500).send({ msg: "Error occured" });
    }
  });

  if (
    firstname == undefined ||
    surname == undefined ||
    username == undefined ||
    password == undefined ||
    email == undefined ||
    email.split('@')[1] != 'fer.hr'
  ) {
    res.status(400);
    res.json({ status: "fail" });
    return;
  }

  const query = await db.query(insertQuery, [
    firstname,
    surname,
    username,
    path,
    password,
    email,
  ]);

  sendConfirmationEmail(email, username);

  res.status(201).end();
  return;
});

module.exports = router;
