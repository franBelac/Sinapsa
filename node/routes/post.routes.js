const { query } = require("express");
const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");

const postWCatQuerry =
  "select \
    postid, posttitle, postdescription, username, timeofcreation, categoryname, abbreviationcourse, programename \
    from post join registered on post.creatoruserid = registered.userid \
    natural join category natural join course\
    join study_programme on course.programmeid = study_programme.programmeid";

router.put("/", async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const type = req.body.type;
  const creatorId = req.body.creatorid;
  const categoryId = req.body.categoryid;

  let qString =
    "insert into post values (default, $1, $2, current_date, $3, $4)";
  let query = await db.query(qString, [
    title,
    description,
    creatorId,
    categoryId,
  ]);

  if (query.rowCount) {
    res.status(200).end();
    return;
  }

  res.status(500).end();
});

router.get("/all", async (req, res) => {
  let qString = postWCatQuerry;
  const query = await db.query(qString, []);

  let body = Object();
  body.posts = query.rows;
  res.status(200).json(body);
});

router.get("/distinct/:postId", async (req, res) => {
  const postId = req.params.postId;

  if (isNaN(postId)) {
    res.status(404).end();
    return;
  }

  let query = await db.query(
    "select * from post natural join category natural join course natural join study_programme where postid=$1",
    [postId]
  );

  if (query.rowCount == 0) {
    res.status(404).json({
      error: "invalid postId",
    });
    return;
  }

  let body = Object();
  const post = query.rows[0];
  body.postid = post.postid;
  body.categoryid = post.categoryid;
  body.programmeid = post.programmeid;
  body.courseid = post.courseid;
  body.posttitle = post.posttitle;
  body.postdescription = post.postdescription;
  body.dateofcreation = post.timeofcreation;
  body.postcreatorid = post.creatoruserid;
  body.categoryname = post.categoryname;
  body.coursename = post.coursename;
  body.abbreviatoncourse = post.abbreviatoncourse;
  body.programename = post.programename;

  const userId = post.creatoruserid;

  query = await db.query("select * from registered where userid = $1", [
    userId,
  ]);

  body.firstname = query.rows[0].firstname;
  body.lastname = query.rows[0].lastname;
  body.username = query.rows[0].username;
  body.useravatar = query.rows[0].useravatar;
  body.email = query.rows[0].email;
  body.created = query.rows[0].created;

  query = await db.query(
    "select * from replies join registered on replies.replycreatorid = registered.userid where postid = $1",
    [postId]
  );

  body.replies = query.rows;

  console.log(query);

  res.status(200).json(body);
});

router.get("/comments/:id", async (req, res) => {
  const postId = req.params.id;
  if (isNaN(postId)) {
    res.status(404).end();
    return;
  }
  let query = await db.query(
    "select replytext, replycreated, username from replies join registered on replies.replycreatorid = registered.userid where postid = $1",
    [postId]
  );

  res.status(200).json(query.rows);
});

router.get("/user/:username", async (req, res) => {
  const username = req.params.username;
  let qString = postWCatQuerry + " where username = $1";
  let query = await db.query(qString, [username]);

  let body = Object();
  body.posts = query.rows;
  res.status(200).json(body);
});

module.exports = router;
