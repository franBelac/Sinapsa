const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db')



const userQuery = 'insert into Post (postTitle, postDescription, timeOfCreation, typeOfPost, creatorUserID, categoryID) VALUES ( $1, $2, CURRENT_TIMESTAMP, $3, $4, $5);';
const userQueryUpdate = 'update Post set postDescription = $1, postTitle = $2 where postID = $3;';

router.post('/', async (req, res) => {
    const id = req.body.id
    const title = req.body.title
    const desc = req.body.description

    const type = req.body.type
    const user = req.session.user
    const category = req.body.category
    
    
    if(id){
        db.query(userQueryUpdate,[desc, title, id])
    }
    else{
        console.log(title, desc, type, user, category)
        const user1 = 1
        db.query(userQuery,[title, desc, type, user1, category])
    }

    res.json({status: "success"})
    return
})

module.exports = router
