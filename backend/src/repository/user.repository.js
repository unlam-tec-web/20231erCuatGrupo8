const User = require('../model/user.model');

const getAllUsers = async () => {
    return await User.find({});
}

const createUser = async (user) => {
    return await User.create(user);
}

const userRepository = { createUser, getAllUsers };

module.exports = { userRepository };