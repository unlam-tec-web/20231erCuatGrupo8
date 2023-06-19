const { userRepository } = require('../repository/user.repository');
/*
async function createUser(userData) {
    try {
        // aca hacer validaciones


        const USER = await userRepository.createUser(userData);
        return USER;
    } catch (error) {
        throw new Error('No se pudo crear el usuario');
    }
}
*/

const findAllUsers = async () => {
    return await userRepository.getAllUsers();
}

const createUser = async (userData) => {
    //validaciones
    return await userRepository.createUser(userData);
}

const userService = { createUser, findAllUsers };

module.exports = { userService };
