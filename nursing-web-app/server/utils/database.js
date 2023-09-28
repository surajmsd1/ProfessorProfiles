const mysql = require("mysql2");

const mysqlConnection = mysql.createConnection({
   host: "localhost",
   user: "nursing",
   password: "oEfEjGEzaQOgODC",
   database: "nursing",
   multipleStatements: true,
});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("Connected");
    } else {
        console.log("Connection Failed");
    }
});

module.exports = mysqlConnection;