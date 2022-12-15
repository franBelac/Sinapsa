const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db')

router.get('/', async (req, res) => {
    
    let body = Object();

    let qString1 = 'select * from course'
    let qString2 = 'select * from category'

        try {
            const query1 = await db.query(qString1, [])
            const query2 = await db.query(qString2, [])
            body.courses = query1.rows;
            body.categories = query2.rows;
            res.status(200).json(body);

        } catch (DatabaseError) {
            res.status(400).json({error: "Database error"})
        }
})

module.exports = router