const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    userName: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
    }
},
    {
        timestamps: true,
        versionKey: false
    });

module.exports = mongoose.model('users', UserSchema);
