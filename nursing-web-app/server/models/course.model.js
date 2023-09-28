// Create SQL variable to communicate with database
const sql = require("../utils/database.js");

// Constructor for Course object
const Course = function (course) {
    this.name = course.name;
    this.course_ID = course.course_ID;
    this.notes = course.notes;
};

// Create and save a new Course
Course.create = (newCourse, result) => {

    // Build insert query
    var query = "INSERT INTO course (name, course_ID, notes) "
        + "VALUES (?, ?, ?)";

    // Build values array to insert
    var values = [newCourse.name, newCourse.course_ID, newCourse.notes];

    // Execute query with given values
    sql.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newCourse });
    });
};

// Retrieve all existing Courses from database
Course.getAll = result => {

    // Build select query
    let query = "SELECT ID, name, course_ID, notes "
        + "FROM course "
        + "WHERE ID > 0";

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

// Retrieve a Course with the specified ID
Course.view = (ID, result) => {

    // Build select query
    let query = "SELECT ID, name, course_ID, notes "
        + "FROM course";

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

        // Did not find a Course with given ID
        result({ kind: "not_found" }, null);
    });
};

// Update a Course with the specified ID
Course.updateById = (ID, updatedCourse, result) => {

    // Build update query
    var query = "UPDATE course SET name = ?, course_ID = ?, notes = ? WHERE ID = ?;"

    // Build array of values to update
    var values = [updatedCourse.name, updatedCourse.course_ID, updatedCourse.notes, ID];

    // Execute query
    sql.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // Did not find Course with specified ID
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { id: ID, ...updatedCourse });
    });
};

// Delete a Course with the specified ID
Course.remove = (ID, result) => {

    // Build and execute query to update the sections that reference the course being deleted
    sql.query("UPDATE course_faculty SET course_ID = 0 WHERE course_ID = ?", ID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // Build and execute query
        sql.query("DELETE FROM course WHERE ID = ?", ID, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows = 0) {
                // Did not find Course with specified ID
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, res);
        });
    });
};

// Export Course
module.exports = Course;