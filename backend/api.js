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
    res.json({
        message: "404 not found"
    });
});

module.exports = router;