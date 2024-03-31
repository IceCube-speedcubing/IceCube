const express = require('express');
const mongoose = require('mongoose');
const app = express();
const fs = require('fs'); 
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);
const db = mongoose.connection;
db.on('error', (e) => console.error(e));
db.on('open', () => console.log('Connected to Database'));

const apiRouter = require('./api.js');

app.use(express.static("out"));
app.use(express.json());
app.use('/api', apiRouter);

// 404
app.use(function (req, res, next) {
    fs.readFile('./out/404.html', function(err, data) {
        if(err) { return res.status(404).send("404 not found"); }    
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write(data);
        return res.end();
    });
});

app.listen(8080, () => {
    console.log('listening on *:8080');
});
