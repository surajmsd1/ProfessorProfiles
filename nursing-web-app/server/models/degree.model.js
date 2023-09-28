// Create SQL variable to communicate with database
const sql = require("../utils/database.js");

// Constructor for Degree object
const Degree = function (degree) {
    this.faculty_ID = degree.faculty_ID;
    this.type = degree.type;
    this.description = degree.description;
    this.date_obtained = degree.date_obtained;
    this.institution = degree.institution;
    this.notes = degree.notes;
};

// Create and save a new Degree
Degree.create = (newDegree, result) => {

    // Start building insert query
    var query = "INSERT INTO degree (faculty_ID, type, description, date_obtained, institution, notes) "
        + "VALUES (?, ?, ?, ?, ?, ?)";

    // Start building values array to insert
    var values = [newDegree.faculty_ID, newDegree.type, newDegree.description, newDegree.date_obtained,
        newDegree.institution, newDegree.notes];

    // Execute query with given values
    sql.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newDegree });
    });
};

// Retrieve all existing Degrees from database
Degree.getAll = result => {

    // Build select query
    let query = "SELECT degree.ID, faculty.last_name, faculty.first_name, degree_type.name, degree.description, degree.date_obtained, degree.institution, degree.notes "
        + "FROM degree "
        + "INNER JOIN faculty ON degree.faculty_ID = faculty.ID "
        + "INNER JOIN degree_type ON degree.type = degree_type.ID";

    // Execute query
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

// Retrieve a Degree with the specified ID
Degree.view = (ID, result) => {

    // Build select query
    let query = "SELECT degree.ID, degree.faculty_ID, degree.type, degree_type.name, degree.description, degree.date_obtained, degree.institution, degree.notes "
        + "FROM degree "
        + "INNER JOIN degree_type ON degree.type = degree_type.ID "
        + "WHERE degree.ID = ?;";

    // Execute query
    sql.query(query, ID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // Did not find a Degree with given ID
        result({ kind: "not_found" }, null);
    });
};

// Update a Degree with the specified ID
Degree.updateById = (ID, updatedDegree, result) => {

    // Bulid update query
    var query = "UPDATE degree SET faculty_ID = ?, type = ?, description = ?, date_obtained = ?, institution = ?, notes = ? WHERE ID = ?;"

    // Build array of values to update
    var values = [updatedDegree.faculty_ID, updatedDegree.type, updatedDegree.description, updatedDegree.date_obtained, updatedDegree.institution, updatedDegree.notes, ID];

    // Execute query
    sql.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // Did not find Degree with specified ID
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { id: ID, ...updatedDegree });
    });
};

// Delete a Degree with the specified ID
Degree.remove = (ID, result) => {

    // Build and execute query
    sql.query("DELETE FROM degree WHERE ID = ?", ID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // Did not find Degree with specified ID
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

// Export Degree
module.exports = Degree;