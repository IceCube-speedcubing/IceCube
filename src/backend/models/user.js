const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    wcaEmail: {
        type: String,
        required: false
    },
    wcaPassword: {
        type: String,
        required: false
    },
    algs: {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = mongoose.model('user', userSchema);