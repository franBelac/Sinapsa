const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db')



const userQuery = 'select * from registered where username = $1 and password = $2 and created is not null';


router.get('/', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const users = await db.query(userQuery,[username, password])

    if(users.rowCount == 0) {
        res.json({status: 'failed'})
        return
    }
    req.session.user = username
    res.json({status: "success"})
    return
})

module.exports = router
