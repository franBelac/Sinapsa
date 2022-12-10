const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db')
const nodemailer = require("nodemailer");

async function sendConfirmationEmail(email,username){

    let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    //port: 587,
    //secure: false, // true for 465, false for other ports
    auth: {
      user: 'turbulentech@gmail.com', 
      pass: 'zzaviuknkyuzwtla'
    },
  });

  let link='ax1.axiros.hr:8081/confirm/' + username



  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: 'turbulentech@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Email confirmation", // Subject line
    text: "Hi!\n\nPlease go to " + link + " to confirm your email\nThank you\nTurbulentech" // plain text body
    //html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>


}

const insertQuery = 'insert into REGISTERED(firstname,lastname,username,useravatar,password,email,created) values ($1, $2, $3, $4, $5, $6, null)'

router.post('/', async (req, res) => {
    
    const firstname = req.body.name
    const surname = req.body.surname
    const username = req.body.username
    const avatar = req.body.avatar
    const email = req.body.email
    const password = req.body.password
    const query = await db.query(insertQuery,[firstname, surname, username, avatar, password, email])
    
    sendConfirmationEmail(email,username)

    res.json({status: "success1"})
    return


})

module.exports = router
