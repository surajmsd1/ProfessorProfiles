// Create SQL variable to communicate with database and get crypto functions
const sql = require("../utils/database.js");
const crypto = require('crypto');

// Constructor for Login object
const Login = function(login) {
    this.username = login.username;
    this.password = login.password;
};

// Validate a Login credentials
Login.validate = (credentials, result) => {

    // Hash entered password
    var hashedPass = crypto.createHash("sha256").update(credentials.username + credentials.password).digest("hex"); //update database booi

    // Build select query and values to validate
    var query = "SELECT * FROM users WHERE userName = ? AND passwordHash = ?";
    var values = [credentials.username, hashedPass];

    // Execute query with given values
    sql.query(query, values, (err, res) => {
        if(err) {
            console.log("ERROR: ", err);
            result(err, null);
    
            return;
        }
        else {
            if (res == "") { // Login failed
                result(null, {valid: false});
            }
            else { // Login successful                
                result(null, {valid: true});
            }
        }
    });
};

// Export Login
module.exports = Login;