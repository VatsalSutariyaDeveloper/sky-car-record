const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        versionKey: false
    });

module.exports = mongoose.model('users', UserSchema);
