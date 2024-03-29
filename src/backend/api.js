const express = require('express');
const router = express.Router();

const userRouter = require('./users.js');
const algsRouter = require('./algs.js'); // TODO

router.use('/user', userRouter);

module.exports = router;