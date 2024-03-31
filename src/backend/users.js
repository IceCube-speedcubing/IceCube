const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const router = express.Router();
const user = require('./models/user.js');

// Make user
router.post('/', async (req, res) => {
    try {
        const name = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
	
	if(name === undefined || password === undefined || email === undefined) {
		console.log(name);
		console.log(password);
		console.log(email);
		return res.status(400).send("Name/Password/Email not defined in body!");
	}

	const passwordSalt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, passwordSalt);

        if(await user.findOne({email: email}) !== null) {
            res.status(400).json({
                message: "Email Taken"
            });
            return;
        }

        const newUser = new user({
            name: name,
            password: securePassword,
            email: email
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

        if(loginUser === null || password === undefined) {
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

// 404
router.use(function (req, res, next) {
    fs.readFile('./out/404.html', function(err, data) {
        if(err) { return res.status(404).send("404 not found"); }    
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

module.exports = router;
