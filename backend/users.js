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
                <h3><a href="${process.env.LINK}/api/user/verifiy/${authKey}">Verify email</a></h3>
                `
            };

            transporter.sendMail(mailOptions, function(err, info) {
                if(err) {
                    console.log("Error sending mail\n"+err);
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
        const password = req.body.password;
        const email = req.body.email;

        const loginUser = await user.findOne({email: email});

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
        res.send("Invaild auth key.");
    } else {
        currentUser.authKey = "VERIFIED";
        currentUser.isEmailConnected = true;
        await currentUser.save();

        res.send("Email verified");
    }
});

// Make admin
router.post('/admin/', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const newEmail = req.body.newEmail;

    const currentUser = await user.findOne({email: email});
    const newUser = await user.findOne({email: newEmail});

    if(currentUser === null) {
        return res.status(400).json({
            message: "Your User Doesn't Exist"
        });
    }

    if (newUser === null) {
        return res.status(400).json({
            message: "New Admin User Doesn't Exist"
        });
    }

    if(await bcrypt.compare(password, currentUser.password)) {
        if(currentUser.isAdmin) {
            newUser.isAdmin = true;
            await newUser.save();
            return res.status(200).json({
                message: "New user changed to admin."
            });
        } else {
            return res.status(400).json({
                message: "Your not a admin."
            });
        }
    } else {
        return res.status(400).json({
            message: "Wrong password!"
        });
    }
});

router.post('/alg/add/', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const id = req.body.id;
    if(email === undefined || password === undefined || id === undefined)
        return res.status(400).json({message: "Email/Password/Id not defined!"});

    const currentUser = await user.findOne({email: email});
    if(currentUser === null) {
        return res.status(400).json({
            message: "User Doesn't Exist"
        });
    }

    if(await bcrypt.compare(password, currentUser.password)) {
        if(!currentUser.algs.includes(id)) {
            currentUser.algs.push(id);
            await currentUser.save();
        } else {
            return res.status(400).json({
                message: "Alg already exists!"
            });
        }
    } else {
        return res.status(400).json({
            message: "Wrong password!"
        });
    }

    return res.status(200).json({
        message: "Alg added!"
    });
});

router.post('/alg/delete/', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const id = req.body.id;
    if(email === undefined || password === undefined || id === undefined)
        return res.status(400).json({message: "Email/Password/Id not defined!"});

    const currentUser = await user.findOne({email: email});
    if(currentUser === null) {
        return res.status(400).json({
            message: "User Doesn't Exist"
        });
    }

    if(await bcrypt.compare(password, currentUser.password)) {
        if(currentUser.algs.includes(id)) {
            const index = currentUser.algs.findIndex((id) => id === id);
            currentUser.algs.splice(index, 1);
            await currentUser.save();
        } else {
            return res.status(400).json({
                message: "Alg doesn't exist!"
            });
        }
    } else {
        return res.status(400).json({
            message: "Wrong password!"
        });
    }

    return res.status(200).json({
        message: "Alg removed!"
    });
});

router.post('/getusers/', async (req, res) => {
    const filter = req.body.filter;
    if(filter === undefined)
        return res.status(400).json({message: "Filter not defined!"});
    
    // TODO: UPDATE OVER TIME
    let data = await user.find(filter, {password:0,email:0,isEmailConnected:0,authKey:0});
    return res.status(200).json({
        message: "Success",
        data: data
    });
});

// 404
router.use(function (req, res, next) {
    res.json({
        message: "404 not found"
    });
});

module.exports = router;