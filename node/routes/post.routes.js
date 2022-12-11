const { query } = require('express')
const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db')




const postWCatQuerry = 'select \
    posttitle, postdescription, username, timeofcreation, categoryname, abbreviationcourse, programename, typeofpost as postType \
    from post join registered on post.creatoruserid = registered.userid \
    natural join category natural join course\
    join study_programme on course.programmeid = study_programme.programmeid'

router.put('/', async (req,res) => {
    const title = req.body.title
    const description = req.body.description
    const type = req.body.type
    const creatorId = req.body.creatorId
    const categoryId = req.body.categoryId

    let qString = 'insert into post values (default, $1, $2, current_date, $3, $4, $5)'
    let query = await db.query(qString, [title, description, type, creatorId, categoryId])

    if (query.rowCount) {
        res.status(200).end()
        return
    }
    
    res.status(500).end()
})

router.get('/', async (req, res) => {
    
    const postId = req.body.postId 

    if (isNaN(postId)){
        res.status(404).end()
        return
    }

    let query = await db.query('Select * from post natural join registered where postid = $1', [postId])

    if (query.rowCount == 0) {
        res.status(404).json({
            error: 'invalid postId'
        })
        return
    }

    let body = Object()
    const post = query.rows[0]
    body.postTitle = post.posttitle
    body.postDescription = post.postdescription
    body.dateOfCreation = post.timeofcreation
    body.postType = post.typeofpost
    body.postCreator = post.username

    const categoryId = post.categoryid

    query = await db.query('select programename, abbreviationcourse, categoryname from category natural join course natural join study_programme where categoryid = $1', [categoryId])
    
    body.programme = query.rows[0].programename
    body.course = query.rows[0].kraticacourse
    body.category = query.rows[0].categoryname

    query = await db.query('select replytext, replycreated, username from replies join registered on replies.replycreatorid = registered.userid where postid = $1', [postId])

    body.replies = query.rows

    console.log(query)

    res.status(200).json(body)
    
})

router.get('/all', async (req,res) => {
    let qString = postWCatQuerry
    const query = await db.query(qString, [])

    let body = Object()
    body.posts = query.rows
    res.status(200).json(body)
}) 

router.get('/comments/:id', async (req,res) => {
    const postId = req.params.id
    if (isNaN(postId)){
        res.status(404).end()
        return
    }
    let query = await db.query('select replytext, replycreated, username from replies join registered on replies.replycreatorid = registered.userid where postid = $1', [postId])

    res.status(200).json(query.rows)

    
})

router.get('/user/:username', async (req,res) => {
    const username = req.params.username
    let qString = postWCatQuerry + ' where username = $1'
    let query = await db.query(qString, [username])

    let body = Object()
    body.posts = query.rows
    res.status(200).json(body)
}) 

module.exports = router
