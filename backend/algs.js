const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const user = require('./models/user.js');
const alg = require('./models/alg.js');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const cube = req.body.cube;
    const method = req.body.method;
    const set = req.body.set;
    const algorithm = req.body.alg;

    let data = await alg.find({cube: cube, method: method, set: set, alg: algorithm});

    if(cube === undefined)
        data = await alg.find({});
    else if(method === undefined)
        data = await alg.find({cube: cube});
    else if(set === undefined)
        data = await alg.find({cube: cube, method: method});
    else if(algorithm === undefined)
        data = await alg.find({cube: cube, method: method, set: set});

    return res.status(200).json({
        message: "Success",
        data: data
    });
});

router.post('/id', async (req, res) => {
    const id = req.body.id;
    if(id === undefined)
        return res.status(400).json({
            message: "Id is not defined"
        });

    const data = await alg.findOne({"_id": id});
    
    res.status(200).json({
        message: "Success",
        data: data
    });
});

router.post('/create/', async (req, res) => {
    const cube = req.body.cube;
    const method = req.body.method;
    const set = req.body.set;
    const algorithm = req.body.alg;
    const data = req.body.data;
    const img = req.body.img;
    const name = req.body.name;
    const password = req.body.password;
    const email = req.body.email;

    if(cube === undefined || method === undefined || set === undefined || algorithm === undefined || data === undefined || img === undefined || name === undefined || password === undefined || email === undefined)
        return res.status(400).json({message: "Cube/Method/Set/Alg/Data/Image/Name/Password/Email is undefined in body!"});

    if(await alg.findOne({cube: cube, method: method, set: set, alg: algorithm}) !== null)
        return res.status(400).json({message: "Algorithm already exists."});

    const loginUser = await user.findOne({name: name, email: email});

    if(loginUser === null || password === undefined)
        return res.status(400).json({message: "User doesn't exist."});

    if(!loginUser.isAdmin) {
        return res.status(400).json({message: "User is not a admin!"});
    }

    if(!await bcrypt.compare(password, loginUser.password))
        return res.status(400).json({message: "Password incorrect."});

    const newAlg = new alg({
        cube: cube,
        method: method,
        set: set,
        alg: algorithm,
        data: data,
        img: img
    });

    const newAlgDB = await newAlg.save();
    res.status(201).json({
        message: "Created!",
        alg: newAlgDB
    });
});

router.patch('/update/', async (req, res) => {
    const username = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const oldData = req.body.old_data;
    const newData = req.body.new_data;

    if(username === undefined || password === undefined || email === undefined || oldData === undefined || newData === undefined)
        return res.status(400).json({message: "Username/Password/Email/old_data/new_data are not defined in the body."});

    const currentUser = await user.findOne({name: username, email: email});
    if(currentUser === undefined || password === undefined || currentUser === null || password === null)
        return res.status(400).json({message: "User doesn't exist."});
    else if(!await bcrypt.compare(password, currentUser.password))
        return res.status(400).json({message: "Password incorrect."});
    else if(!currentUser.isAdmin)
        return res.status(400).json({message: "User is not an admin!"});

    let algorithm = await alg.findOne(oldData);
    algorithm.cube = newData.cube;
    algorithm.method = newData.method;
    algorithm.set = newData.set;
    algorithm.alg = newData.alg;
    algorithm.data = newData.data;
    await algorithm.save();

    res.status(202).json({message: "Patched!"});
});

router.post('/delete/', async (req, res) => {
    const username = req.body.name;
    const password = req.body.password;
    const email = req.body.email;
    const cube = req.body.cube;
    if(username === undefined || password === undefined || email === undefined || cube === undefined)
        return res.status(400).json({message: "Username/Password/Email/Cube not defined!"});
    
    const currentUser = await user.findOne({name: username, email: email});
    if(currentUser === undefined || password === undefined || currentUser === null || password === null)
        return res.status(400).json({message: "User doesn't exist."});
    else if(!await bcrypt.compare(password, currentUser.password))
        return res.status(400).json({message: "Password incorrect."});
    else if(!currentUser.isAdmin)
        return res.status(400).json({message: "User is not an admin!"});

    await alg.findOneAndDelete(cube);
    res.status(200).json({message: "Deleted!"});
});

module.exports = router;