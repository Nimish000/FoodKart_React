// models/User.js
const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    
    date: { type: String, required: true },
    description: { type: String, required: true }

});

module.exports = mongoose.model('Notes', notesSchema);
    