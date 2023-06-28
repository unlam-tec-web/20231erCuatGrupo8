const { userRepository } = require('../repository/user.repository');
const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const CognitoUserPool = AmazonCognitoIdentity.CognitoUserPool;
global.fetch = require('node-fetch');
require('dotenv').config();

const poolData = {
    UserPoolId: process.env.UserPoolId,
    ClientId: process.env.ClientId
};

const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const findAllUsers = async () => {
    return await userRepository.getAllUsers();
}

function createUser(userData) {
    return new Promise((resolve, reject) => {
        console.log(userData)
        var attributeList = [];
        fullName = `${userData.lastName} ${userData.firstName}`
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "name", Value: fullName }));
        attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "address", Value: userData.address }));

        userPool.signUp(userData.email, userData.password, attributeList, null,
            function (err, result) {
                console.log(result)
                if (err) {
                    reject("Error al registrar usuario", err);
                }
                cognitoUser = result.user;
                resolve(cognitoUser)
            });
    })
}

function logIn(userData) {
    return new Promise((resolve, reject) => {
        var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
            Username: userData.email,
            Password: userData.password,
        });

        var user = {
            Username: userData.email,
            Pool: userPool
        };

        var cognitoUser = new AmazonCognitoIdentity.CognitoUser(user);
        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: resolve(result),
            onFailure: reject(err)
        });
    })
}

const userService = { createUser, findAllUsers, logIn };

module.exports = { userService };
