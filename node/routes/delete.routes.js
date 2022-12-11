const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db')



const userQuery1 = 'delete from Post where postID = $1;';
const userQuery2 = 'select * from Post where postID = $1;';
const userQuery3 = 'insert into deletedpost(explanation, deletoruserid, postid) values ($1, $2, $3);';
router.delete('/', async (req, res) => {
    const id = req.body.id
    const explanation = req.body.explanation
    const post = await db.query(userQuery2,[id])
    
    if(post.rowCount > 0){
///        db.query(userQuery1,[id])
        console.log(post)
        help = post.rows[0].creatoruserid
        db.query(userQuery3,[explanation,help,id])
        
        res.json({status: "success"})
        return    
    }
    res.status(404);
    res.json({status: "fail"})
        return   
    
})

module.exports = router
