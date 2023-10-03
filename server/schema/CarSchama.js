const mongoose = require('mongoose');

const carSchama= new mongoose.Schema({
    v_name: String,
    v_author_name: String,
    t_description: String,
});

module.exports = mongoose.model('cars', carSchama);