const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../db");
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
    const token = req.headers["authorization"];
    const secretKey = "tajnikljuc";
    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            res.status(401);
            res.json({});
            return;
        }
        const payload = decoded;
        const id = payload.id;
        console.log("DOBAAAAR")
        res.status(200).json({ id: id });
        return
    });
});

module.exports = router;