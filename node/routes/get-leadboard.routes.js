const { Console } = require('console');
const express = require('express')
const router = express.Router()
const path = require('path')
const db = require('../db')

function calculateBayesianAverage(grades, userId) {
    let hypotesis = 0;
    let numberOfGrades = 0
    // Calculate the average of all grades given by users other than the user with the given userId
    for (const grade of grades) {
      //if (grade.learnerid !== userId) {
        hypotesis += grade.grade;
        numberOfGrades ++;
      //}
    }
    if (numberOfGrades != 0){
        hypotesis /= numberOfGrades;    
    }
  
    console.log(hypotesis)
    // Calculate the Bayesian average using the formula:
    // avg = (avg * total + hypotesis * numberOfGrades) / (total + numberOfGrades)
    // where hypotesis is the average of all grades given by the user with the given userId
    let sum = 0;
    let total = 0;
    for (const grade of grades) {
      if (grade.instructorid === userId) {
        sum += grade.grade;
        total++;
      }
    }
    const c = 5;
    console.log("suma je " + sum);
    console.log("hipoteza je " + hypotesis);
    console.log("total je " + total);
    console.log("c je " + c);
    return (sum + hypotesis * c) / (total + c);
  }
  
  // Function to create a leaderboard of users sorted by their average Bayesian grade
  function createLeaderboard(grades) {
    // Create an object to store the average Bayesian grade for each user
    const avgGrades = {};
  
    // Calculate the average Bayesian grade for each user
    for (const grade of grades) {
      if (!avgGrades[grade.instructorid]) {
        avgGrades[grade.instructorid] = calculateBayesianAverage(grades, grade.instructorid);
      }
    }
  
    // Sort the users by their average Bayesian grade in descending order
    const sortedUsers = Object.keys(avgGrades).sort((a, b) => avgGrades[b] - avgGrades[a]);
  
    // Return the sorted list of user IDs
    return {"leadboard": sortedUsers, "grades": avgGrades};
  }

querry = "select * from grade;"
UsersQuerry = "select * from registered where userid = $1;"

router.get('/', async (req, res) => {
    const grades = await db.query(querry,[])
    //const users = await db.query(UsersQuerry,[])
    const lead = createLeaderboard(grades.rows)
    
    const board = lead["leadboard"]
    const userGrades = lead["grades"]
    console.log(lead)

    const leadboard = []

    for (const currUser of board) {
        //const filteredUsers = users.rows.filter(user => user.userId == currUser);
        //user = filteredUsers[0]
        users = await db.query(UsersQuerry,[currUser])
        user = users.rows[0]
        console.log("USER:" + (user))
        leadboard.push({
            "user": user,
            "grade": userGrades[currUser]
        })
    }

    res.json({"leadboard": leadboard})
        return   
    
})

module.exports = router
