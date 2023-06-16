const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: { type: String, required: false, unique: false },
    password: { type: String, required: false },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    address: { type: String, required: false },
});

const User = new mongoose.model("User", userSchema);

module.exports = User;