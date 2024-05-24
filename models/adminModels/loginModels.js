// Import necessary modules
const mongoose = require('mongoose');

// Define the schema for admin registration
const adminRegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create and export the model
const admin_register = mongoose.model('Admin', adminRegisterSchema);

module.exports = admin_register;