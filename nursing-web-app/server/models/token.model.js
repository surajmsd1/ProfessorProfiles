// Create SQL variable to communicate with database
const sql = require("../utils/database.js");

// Constructor for Token object
const Token = function(login) {
    this.username = login.username;
    this.token = login.token;
};

// Delete and store a new Token
Token.store = (token, result) => {

    // Delete old stored Token 
    var delete_query = "DELETE FROM tokens WHERE username = ?"
    var delete_values = [token.username];

    // Execute query
    sql.query(delete_query, delete_values, (err, res) => {
        if(err) {
            console.log("ERROR: ", err);
            result(err, null);
    
            return;
        }
    });

    // Create a new Token
    var insert_query = "INSERT INTO tokens(username, token) VALUES (?, ?)";
    var insert_values = [token.username, token.token];

    // Execute query
    sql.query(insert_query, insert_values, (err, res) => {
        if (err) {
            console.log("ERROR: ", err);
            result(err, null);

            return;
        }
        else {
            result(null, res);
        }
    });
};

Token.verify = (token, result) => {

    // Query database for token
    var search_query = "SELECT * FROM tokens WHERE token = ?";
    var search_values = [token.token];

    // Execute query
    sql.query(search_query, search_values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (Object.keys(res).length === 0) {
            // Did not find login session with matching token
            result(null, { found: false });
            return;
        }

        result(null, { found: true });
    });
};

// Delete a Token
Token.logout = (token, result) => {

    // Delete old stored Token 
    var delete_query = "DELETE FROM tokens WHERE token = ?"
    var delete_values = [token.token];

    // Execute query
    sql.query(delete_query, delete_values, (err, res) => {
        if(err) {
            console.log("ERROR: ", err);
            result(err, null);
    
            return;
        }
        else {
            result (null, res);
            return;
        }
    });


};

// Export Token
module.exports = Token;