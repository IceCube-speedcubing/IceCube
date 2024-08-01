const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on('error', (e) => console.error(e));
db.on('open', () => console.log('Connected to Database'));

// dont use in production
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});

const apiRouter = require('./api.js');

app.use(express.json());
app.use('/', apiRouter);

app.listen(8080, () => {
    console.log('listening on *:8080');
});