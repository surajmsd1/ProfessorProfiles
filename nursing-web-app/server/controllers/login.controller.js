// Create Login and Token from model classes
const Login = require("../models/login.model.js");
const Token = require("../models/token.model.js");

// Validate a Login request
exports.validate = (req, res) => {

    // Validate request
    if(!req.body) {
        res.status(400).send({
            message: "Username and password are required!"
        });
    }

    // Create a Login
    const login = new Login({ 
        username: req.body.username,
        password: req.body.password
    });

    // Send new Login data to database
    Login.validate(login, (err, data) => {
        if(err)
            res.status(500).send({
                message: "Login not valid!"
            });
        else 
            res.send(data);
    });
};

// Store token on login
exports.store = (req, res) => {

    // Validate request
    if(!req.body) {
        res.status(400).send({
            message: "Faulty login request received."
        });
    }

    // Create a Token
    const token = new Token({
        username: req.body.username,
        token: req.body.token
    });

    // Send new Token data to database
    Token.store(token, (err, data) => {
        if(err)
            res.status(500).send({
                message: "Login error occurred!"
            });
        else 
            res.send(data);
    });
};

// Search database for given token
exports.verify = (req, res) => {

    // Validate request
    if(!req.body) {
        res.status(400).send({
            message: "Faulty login request received."
        });
    }

    // Create a Token
    const token = new Token({
        token: req.body.token
    })

    Token.verify(token, (err, data) => {
        if(err)
            res.status(500).send({
                message: "Login verification error occurred!"
            });
        else 
            res.send(data);
    })
}

// Log out current user
exports.logout = (req, res) => {
    // Validate request
    if(!req.body) {
        res.status(400).send({
            message: "Faulty login request received."
        });
    }

    // Create a Token
    const token = new Token({
        token: req.body.token
    })

    Token.logout(token, (err, data) => {
        if(err)
            res.status(500).send({
                message: "Logout error occurred!"
            });
        else 
            res.send(data);
    })
}