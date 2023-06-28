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

const createUser = (req, res) => {
    userService.createUser(req.body)
        .then(req => {
            res.status(200).json(req)
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        })
}

const logIn = (req, res) => {
    userService.logIn(req.body)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        })
}


module.exports = { createUser, findAll, logIn };