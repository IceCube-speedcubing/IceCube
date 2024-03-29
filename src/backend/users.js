const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();
const user = require('./models/user.js');

// Make user
router.post('/', async (req, res) => {
    try {
        const name = req.body.name;
        const password = req.body.password;
        const email = req.body.email;

        const securePassword = await bcrypt.hash(password, 10);
        const secureEmail = await bcrypt.hash(email, 10);

        if(await user.findOne({email: email}) !== null) {
            res.status(400).json({
                message: "Email Taken"
            });
            return;
        }

        const newUser = new user({
            name: name,
            password: securePassword,
            email: secureEmail
        });

        const newUserDatabase = await newUser.save();

        res.status(201).json({
            message: "Succses",
            user: newUserDatabase
        });
    } catch(e) {
        console.error(e);
        res.status(500).json({
            message: `Error: ${e}`
        });
    }
});

// Login
router.get('/', async (req, res) => {
    try {
        const name = req.body.name;
        const password = req.body.password;
        const email = req.body.email;

        const loginUser = await user.findOne({name: name, email: email});

        if(loginUser === null || password == undefined) {
            res.status(400).json({
                message: "User Doesn't Exist"
            });
            return;
        }

        if(await bcrypt.compare(password, loginUser.password)) {
            res.status(200).json({
                message: "Logged in!"
            });
        } else {
            res.status(400).json({
                message: "Wrong password!"
            });
        }
    } catch(e) {
        console.error(e);
        res.status(500).json({
            message: "ERROR",
            error: e
        });
    }
});

module.exports = router;