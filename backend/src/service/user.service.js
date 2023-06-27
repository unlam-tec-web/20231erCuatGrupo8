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

const createUser = (userData) => {
    var attributeList = [];
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "email", Value: userData.email }));
    attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "password", Value: userData.password }));
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "firstName", Value: userData.firstName }));
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "lastName", Value: userData.lastName }));
    // attributeList.push(new AmazonCognitoIdentity.CognitoUserAttribute({ Name: "address", Value: userData.address }));

    userPool.signUp(userData.email, userData.password, attributeList, null,
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            cognitoUser = result.user;
            console.log('User name is' + cognitoUser.getUsername());
            return 'Se guardo!'
        });
}

function logIn(user) {
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: user.email,
        Password: user.password,
    });

    var userData = {
        Username: user.email,
        Pool: userPool
    };

    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log('Access token + ' + result.getAccessToken().getJwtToken());
            console.log('Id token + ' + result.getIdToken().getJwtToken());
            console.log('Refresh token + ' + result.getRefreshToken().getToken());
        },
        onFailure: function (err) {
            console.log(err);
        },

    });
}

const userService = { createUser, findAllUsers, logIn };

module.exports = { userService };
