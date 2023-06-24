const { userService } = require("../service/user.service");

const findAll = async (req, res) => {
    try {
        const USERS = await userService.findAllUsers();
        console.log(USERS);
        res.status(200).json(USERS);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        // Obtengo los datos del cuerpo de la solicitud
        const USER = req.body;

        // Creo el usuario utilizando el servicio
        await userService.createUser(USER);
        console.log(USER);
        res.status(200).json(USER);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createUser, findAll };