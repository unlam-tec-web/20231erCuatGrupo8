const { userService } = require("../service/user.service");

const createUser = (req, res) => {
    userService.createUser(req.body)
        .then(req => {
            res.status(200).json(req)
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        })
}

const validateEmail = (req, res) => {
    const username = req.body.email;
    const code = req.body.code; 

    userService.verifyEmail(username, code)
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


module.exports = { createUser, logIn, validateEmail };