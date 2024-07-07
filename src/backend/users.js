const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const emailValidator = require('email-validator');

const router = express.Router();
const user = require('./models/user.js');

// string.shuffle()
String.prototype.shuffle = function() {
    var a = this.split("");
    var n = a.length;

    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");
}

// Make user
router.post('/', async (req, res) => {
    try {
        const authKey = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2) + req.body.email.shuffle();
        const name = req.body.username;
        const password = req.body.password;
        const email = req.body.email;
	
	    if(name === undefined || password === undefined || email === undefined)
		    return res.status(400).json({
                message: "Name/Password/Email not defined in body!"
            });

	    const passwordSalt = await bcrypt.genSalt(10);
        const securePassword = await bcrypt.hash(password, passwordSalt);

        if(await user.findOne({email: email}) !== null) {
            return res.status(400).json({
                message: "Email Taken"
            });
        }

        if(!emailValidator.validate(email)) {
            return res.status(400).json({
                message: "Email doesn't exist"
            });
        }

        const newUser = new user({
            name: name,
            password: securePassword,
            email: email,
            authKey: authKey
        });

        // send verfication email
        try {
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD,
                    clientId: process.env.OAUTH_CLIENT_ID,
                    clientSecret: process.env.OAUTH_CLIENT_SECRET,
                    refreshToken: process.env.OAUTH_REFRESH_TOKEN
                }
            });

            let mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Verify IceCube Email.',
                html: `
                <h1>IceCube email verification</h1>
                <h3><p>Someone has tryed to use your email ${email} to get a IceCube account.
                <br>If it was you hit the verify link below if its not ignore this email.</p></h3>
                <hr>
                <h3><a href="http://localhost:8080/api/user/verifiy/${authKey}">Verify email</a></h3>
                `
            };

            transporter.sendMail(mailOptions, function(err, info) {
                if(err) {
                    console.log("Error sending mail\n"+err);
                    return res.json({
                        message: "Error sending mail"
                    });
                }
            });
        } catch(e) {
            return res.status(400).json({
                message: "Server error"
            });
        }

        const newUserDatabase = await newUser.save();

        return res.status(201).json({
            message: "Succses"
        });
    } catch(e) {
        console.error(e);
        return res.status(500).json({
            message: `Error: ${e}`
        });
    }
});

// Login
router.post('/login/', async (req, res) => {
    try {
        const name = req.body.name;
        const password = req.body.password;
        const email = req.body.email;

        const loginUser = await user.findOne({name: name, email: email});

        if(loginUser === null || password === undefined) {
            return res.status(400).json({
                message: "User Doesn't Exist"
            });
        }

        if(!loginUser.isEmailConnected) {
            return res.status(400).json({
                message: "Email not verified!"
            });
        }

        if(await bcrypt.compare(password, loginUser.password)) {
            return res.status(200).json({
                message: "Logged in!",
                user: loginUser
            });
        } else {
            return res.status(400).json({
                message: "Wrong password!"
            });
        }
    } catch(e) {
        console.error(e);
        return res.status(500).json({
            message: "ERROR",
            error: e
        });
    }
});

router.get('/verifiy/:authKey', async (req, res) => {
    const currentUser = await user.findOne({authKey: req.params.authKey});
    if(currentUser == undefined) {
        res.send("Invaild email/auth key.");
    } else {
        currentUser.authKey = "VERIFIED";
        currentUser.isEmailConnected = true;
        await currentUser.save();

        res.send("Email verified");
    }
});

// 404
router.use(function (req, res, next) {
    res.json({
        message: "404 not found"
    });
});

module.exports = router;