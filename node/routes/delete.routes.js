const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db')



const userQuery = 'delete from Oglas where oglasID = $1;';


router.delete('/', async (req, res) => {
    const id = req.body.id
    const users =  db.query(userQuery,[id])

    res.json({status: "success"})
    return
})

module.exports = router
