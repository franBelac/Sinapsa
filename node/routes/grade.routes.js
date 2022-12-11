const express = require('express')
const router = express.Router()
const db = require('../db')

router.post('/', async (req, res) => {
    
    let qString = 'INSERT INTO GRADE VALUES ($1, $2, $3, $4)'

    const grade = req.body.grade 
    const instructorid = req.body.instructorid
    const learnerid = req.body.learnerid
    const postid = req.body.postid

    if(instructorid===learnerid){
        res.status(400).json({error: "instructorid must not be equal to learnerid"})
        return
    }

    try {
        const query = await db.query(qString, [grade,instructorid,learnerid,postid])
      } catch (DatabaseError) {
        console.error(DatabaseError);
        res.status(400).json({error: "Could not insert this grade"})
        return
      }

    res.status(200).json({status: "success"})
    return
})

module.exports = router