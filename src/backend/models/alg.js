const mongoose = require('mongoose');

const algSchema = new mongoose.Schema({
    cube: {
        type: String,
        required: true
    },
    method: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('alg', algSchema);