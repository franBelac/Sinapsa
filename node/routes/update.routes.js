const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db')



const userQuery = 'insert into Oglas (oglasTitle, oglasDescription, dateOfCreation, vrstaOglasa, creatorUserID, idKategorije) VALUES ( $1, $2, CURRENT_TIMESTAMP, $3, $4, $5);';
const userQueryUpdate = 'update Oglas set oglasDescription = $1, oglasTitle = $2 where oglasID = $3;';

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
