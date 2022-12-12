const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db')
const jwt = require('jsonwebtoken');
const secretKey = "tajnikljuc"


const userQuery = 'select * from registered where username = $1 and password = $2 and created is not null';


router.get('/', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    if (username == undefined || password == undefined )
        {
            res.status(400);
            res.json({status: "fail"})
            return
        }

    const users = await db.query(userQuery,[username, password])

    if(users.rowCount == 0) {
        res.status(401)
        res.json({status: 'failed'})
        return
    }
    const user = users.rows[0]
    const token = jwt.sign({ id: user.userid, username: user.username, role: "user"}, secretKey, { expiresIn: '24h' })

    req.session.user = username
    res.json({token})
    return
})

module.exports = router
