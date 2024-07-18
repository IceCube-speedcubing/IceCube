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
    set: {
        type: String,
        required: true
    },
    alg: {
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('alg', algSchema);