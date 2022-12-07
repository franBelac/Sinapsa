const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db')



const insertQuery = 'insert into registrirani(firstname,lastname,username,useravatar,password,email,created) values ($1, $2, $3, $4, $5, $6, current_date)'

router.post('/', async (req, res) => {
    
    const firstname = req.body.name
    const surname = req.body.surname
    const username = req.body.username
    const avatar = req.body.avatar
    const email = req.body.email
    const password = req.body.password
    const query = await db.query(insertQuery,[firstname, surname, username, avatar, password, email])
    

    res.json({status: "success1"})
    return


})

module.exports = router
