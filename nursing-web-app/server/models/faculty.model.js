// Create SQL variable to communicate with database
const sql = require("../utils/database.js");

// Constructor for Faculty object
const Faculty = function (faculty) {
    this.first_name = faculty.first_name;
    this.last_name = faculty.last_name;
    this.date_of_birth = faculty.date_of_birth;
    this.email_otterbein = faculty.email_otterbein;
    this.email_personal = faculty.email_personal;
    this.otterbein_ID = faculty.otterbein_ID;
    this.hire_date = faculty.hire_date;
    this.status = faculty.status;
    this.exemption_needed = faculty.exemption_needed;
    this.exemption_sent = faculty.exemption_sent;
    this.last_semester_taught = faculty.last_semester_taught;
    this.last_year_taught = faculty.last_year_taught;
    this.last_evaluation = faculty.last_evaluation;
    this.notes = faculty.notes;
};

// Create and save a new Faculty
Faculty.create = (newFaculty, result) => {

    // Start building insert query
    var query = "INSERT INTO faculty (last_name, first_name, date_of_birth, email_otterbein, email_personal, otterbein_ID, "
        + "hire_date, status, exemption_needed, exemption_sent, last_semester_taught, last_year_taught, "
        + "last_evaluation, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ";

    // Check for active status
    var year = new Date().getFullYear();
    if (year - parseInt(newFaculty.last_year_taught) < 2)
        query += "1, ";
    else
        query += "0, ";
    query += "?, ?, ?, ?, ?, ?)"

    // Start building values array to insert
    var values = [newFaculty.last_name, newFaculty.first_name, newFaculty.date_of_birth,
        newFaculty.email_otterbein, newFaculty.email_personal, newFaculty.otterbein_ID, newFaculty.hire_date];

    // Check for exemption needed
    values.push(newFaculty.exemption_needed == '' ? 0 : 1);
    values.push(newFaculty.exemption_sent != '' ? newFaculty.exemption_sent : null);

    // Check for semester value and parse to Int
    var last_semester_taught = newFaculty.last_semester_taught ? parseInt(newFaculty.last_semester_taught) : null;
    values.push(last_semester_taught);

    // Check for year value and parse to Int
    var last_year_taught = newFaculty.last_year_taught ? parseInt(newFaculty.last_year_taught) : null;
    values.push(last_year_taught);

    // Check for last_evaluation and push null if empty
    values.push(newFaculty.last_evaluation !== '' ? newFaculty.last_evaluation : null);
    values.push(newFaculty.notes);

    // Execute query with given values
    sql.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newFaculty });
    });
};

// Retrieve all existing Faculty from database
Faculty.getAll = result => {

    // Build select query
    let query = "SELECT f.ID, f.last_name, f.first_name, f.otterbein_ID, COALESCE(dt.name, 'N/A') AS highest_degree, f.hire_date AS hire_date, f.status, f.last_year_taught "
        + "FROM faculty f "
        + "LEFT JOIN(SELECT faculty_ID, MAX(type) AS highest_dt FROM degree GROUP BY faculty_ID) d ON f.ID = d.faculty_ID "
        + "LEFT JOIN degree_type dt ON d.highest_dt = dt.ID "
        + "WHERE f.ID > 0 "
        + "ORDER BY f.last_name ";

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

// Retrieve a Faculty with the specified ID
Faculty.view = (ID, result) => {

    // Build select query
    let query = "SELECT last_name, first_name, date_of_birth, email_otterbein, email_personal, otterbein_ID, hire_date, "
        + "status, exemption_needed, exemption_sent, last_semester_taught, last_year_taught, last_evaluation, notes "
        + "FROM faculty "
        + "WHERE faculty.ID = ?;";

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

        // Did not find a Faculty with given ID
        result({ kind: "not_found" }, null);
    });
};

// Update a Faculty with the specified ID
Faculty.updateById = (ID, updatedFaculty, result) => {

    // Build update query
    var query = "UPDATE faculty SET last_name = ?, first_name = ?, date_of_birth = ?, email_otterbein = ?, email_personal = ?, otterbein_ID = ?, hire_date = ?, "
        + "status = ?, exemption_needed = ?, exemption_sent = ?, last_semester_taught = ?, last_year_taught = ?, last_evaluation = ?, notes = ? WHERE ID = ?; "

    // Start building values array to update
    var values = [updatedFaculty.last_name, updatedFaculty.first_name, updatedFaculty.date_of_birth, updatedFaculty.email_otterbein,
        updatedFaculty.email_personal, updatedFaculty.otterbein_ID, updatedFaculty.hire_date];

    // Check for active status
    var year = new Date().getFullYear();
    if (year - parseInt(updatedFaculty.last_year_taught) < 2)
        values.push(1);
    else
        values.push(2);

    // Check for exemption needed
    values.push(updatedFaculty.exemption_needed == '' ? 0 : 1);
    values.push(updatedFaculty.exemption_sent != '' ? updatedFaculty.exemption_sent : null);

    // Check for semester value and parse to Int
    var last_semester_taught = updatedFaculty.last_semester_taught ? parseInt(updatedFaculty.last_semester_taught) : null;
    values.push(last_semester_taught);

    // Check for year value and parse to Int
    var last_year_taught = updatedFaculty.last_year_taught ? parseInt(updatedFaculty.last_year_taught) : null;
    values.push(last_year_taught);

    // Check for last_evaluation and push null if empty
    values.push(updatedFaculty.last_evaluation !== '' ? updatedFaculty.last_evaluation : null);

    // Push remaining values
    values.push(updatedFaculty.notes);
    values.push(ID);

    // Execute query
    sql.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // Did not find Faculty with specified ID
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { id: ID, ...updatedFaculty });
    });
};

// Delete a Faculty with the specified ID
Faculty.remove = (ID, result) => {

    // Build and execute query to delete the degrees that reference the faculty being deleted
    sql.query("DELETE FROM degree WHERE faculty_ID = ?", ID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // Build and execute query to update the sections that reference the faculty being deleted
        sql.query("UPDATE course_faculty SET faculty_ID = 0 WHERE faculty_ID = ?", ID, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            // Build and execute query to delete the documents that reference the faculty being deleted
            sql.query("DELETE FROM documents WHERE faculty_ID = ?", ID, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                // Build and execute query to delete the faculty
                sql.query("DELETE FROM faculty WHERE ID = ?", ID, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }

                    if (res.affectedRows == 0) {
                        // Did not find Faculty with specified ID
                        result({ kind: "not_found" }, null);
                        return;
                    }
                    result(null, res);
                });
            });
        });
    });
};


// Export Faculty
module.exports = Faculty;