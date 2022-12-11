const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db')

router.get('/id/:id', async (req,res) => {
    const id = req.params.id
    let qString = 'select username, firstname, lastname, email, created from registrirani where userid = $1'
    const query = await db.query(qString, [id])
    
    if (query.rowCount == 0) {
        res.status(404).json({error: "no user with such id"})
    }
    res.status(200).json(query.rows[0])


})

router.get('/:username', async (req, res) => {
    const username = req.params.username
    
    let qString = 'select username, firstname, lastname, email, created from registrirani where username = $1'
    const query = await db.query(qString, [username])
    
    if (query.rowCount == 0) {
        res.status(404).json({error: "no user with such username"})
    }

    res.status(200).json(query.rows[0])
    return
})

router.get('/replies/:id', async (req,res) => {
    const id = req.params.id

    let qString = 'select replyid, replytext, oglasid from replies where \
    replycreatorid = $1 and statusvalue = \'aktivan\';'
    let query = await db.query(qString,[id])

    res.status(200).json(query.rows)
}) 

module.exports = router
