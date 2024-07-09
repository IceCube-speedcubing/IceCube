const express = require('express');
const mongoose = require('mongoose');
const app = express();
const fs = require('fs'); 
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on('error', (e) => console.error(e));
db.on('open', () => console.log('Connected to Database'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

const apiRouter = require('./api.js');

app.use(express.static("out"));
app.use(express.json());
app.use('/api', apiRouter);

// 404
// TODO: send 404 file instead of this
app.use(function (req, res, next) {
    res.json({
        message: "404 not found."
    });
});

app.listen(8080, () => {
    console.log('listening on *:8080');
});
