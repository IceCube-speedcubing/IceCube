const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const router = express.Router();
const user = require('./models/user.js');

// Make user
router.post('/', async (req, res) => {
    try {
        const authKey = (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
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
                <a href="http://localhost:8080/api/user/verifiy/${authKey}">Verify email</a>
                `
            };

            transporter.sendMail(mailOptions, function(err, info) {
                if(err) {
                    console.log("error sending mail\n"+err);
                    return res.end("Error sending mail" + err);
                }
            });
        } catch(e) {
            res.status(400).send("Email not valid or theres been a error on the server.<br>"+e);
            return;
        }

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
        return;
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

router.get('/verifiy/:authKey', async (req, res) => {
    //user.findOne({authKey: req.params.authKey}, function(err, currentUser) {
    //    if(err) {
    //        return res.status(400).send("Error: "+err);
    //    }
    //    currentUser.authKey = undefined;
    //    currentUser.isEmailConnected = true;
    //    currentUser.save(function(err) {
    //        if(err) {
    //            return res.status(400).send("Error: "+err);
    //        }
    //        return res.send("Email verified");
    //    });
    //});

    const currentUser = await user.findOne({authKey: req.params.authKey});
    currentUser.authKey = "VERIFIED";
    currentUser.isEmailConnected = true;
    await currentUser.save();

    res.send("Email verified");
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