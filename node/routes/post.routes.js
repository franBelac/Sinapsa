const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db')




const insertQuery = 'insert into registrirani(firstname,lastname,username,useravatar,password,email,created) values ($1, $2, $3, $4, $5, $6, current_date)'

router.get('/', async (req, res) => {
    
    const postId = req.body.postId 

    let query = await db.query('Select * from oglas natural join registrirani where oglasid = $1', [postId])

    if (query.rowCount == 0) {
        res.status(404).json({
            error: 'invalid postId'
        })
        return
    }

    let body = Object()
    const post = query.rows[0]
    body.postTitle = post.oglastitle
    body.postDescription = post.oglasdescription
    body.dateOfCreation = post.dateofcreation
    body.postType = post.vrstaoglasa
    body.postCreator = post.username

    const categoryId = post.idkategorije

    query = await db.query('select programename, kraticacourse, categoryname from category natural join course natural join study_programme where idkategorije = $1', [categoryId])
    
    body.programme = query.rows[0].programename
    body.course = query.rows[0].kraticacourse
    body.category = query.rows[0].categoryname

    query = await db.query('select replytext, replycreated, username from replies join registrirani on replies.replycreatorid = registrirani.userid where oglasid = $1', [postId])

    body.replies = query.rows

    console.log(query)

    res.status(200).json(body)
    
})

router.get('/all', async (req,res) => {
    let qString = 'select \
    oglastitle, oglasdescription, username, dateofcreation, categoryname, kraticacourse, programename, vrstaoglasa as postType \
    from oglas join registrirani on oglas.creatoruserid = registrirani.userid \
    natural join category natural join course\
    join study_programme on course.programmeid = study_programme.programmeid;'
    const query = await db.query(qString, [])

    let body = Object()
    body.posts = query.rows
    res.status(200).json(body)
}) 

module.exports = router
