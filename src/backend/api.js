const express = require('express');
const fs = require('fs');
const router = express.Router();

const userRouter = require('./users.js');
const algsRouter = require('./algs.js');

router.use(express.json());
router.use('/user', userRouter);
router.use('/algs', algsRouter);

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