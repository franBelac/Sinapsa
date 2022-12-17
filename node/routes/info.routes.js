const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db')

const getCategories = row => {
    return new Promise((resolve, reject) => {
        (async () => {    
            await query1.rows.forEach( async (row) => {
                let rv = {};
                let cid = row.courseid
                const query2 = await db.query(qString2, [cid])
                rv.course = row
                rv.caterogies = query2.rows
                body.cid = rv
                console.log("rv je " , rv)   
            }) 
               
        })();
    });
};


router.get('/', async (req, res) => {
    let bigQuerry = 'select * from course natural join category'
    let qString1 = 'select * from course'
    let qString2 = 'select * from category where courseid = $1'

        //try {
            const query1 = await db.query(qString1, [])
            const bq = await db.query(bigQuerry, [])
            let body = {};
            query1.rows.forEach( async (row) => {
                let rv = {};
                let cid = row.courseid
                let klj = row.abbreviationcourse
                //rv.course = row
                rv.caterogies = bq.rows.filter(cat => cat.categoryid == cid).map(x => x.categoryname)
                body[klj] = rv
                console.log("rv je " , rv)
            }) 
            
            console.log("body jw ovo :" , body)
            res.json(body);
            res.status(200);
          /*
        } catch (DatabaseError) {
            res.status(400).json({error: "Database error"})
        }*/
})

module.exports = router