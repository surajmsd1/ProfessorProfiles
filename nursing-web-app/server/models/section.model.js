// Create SQL variable to communicate with database
const sql = require("../utils/database.js");

// Constructor for Section object
const Section = function (section) {
    this.course_ID = section.course_ID;
    this.faculty_ID = section.faculty_ID;
    this.section_ID = section.section_ID;
    this.semester = section.semester;
    this.year = section.year;
    this.clinical_site_ID = section.clinical_site_ID;
    this.notes = section.notes;
};

// Create and save a new Section
Section.create = (newSection, result) => {

    // Build insert query
    var query = "INSERT INTO course_faculty (course_ID, faculty_ID, section_ID, semester, year, clinical_site_ID, notes) VALUES (?, ?, ?, ?, ?, ?, ?);"

    // Start building values array to insert
    var values = [newSection.course_ID, newSection.faculty_ID, newSection.section_ID, newSection.semester, newSection.year];

    // Check for valid clinical site, otherwise push value for "None" site
    values.push(newSection.clinical_site_ID === '' ? 0 : newSection.clinical_site_ID);
  
    values.push(newSection.notes);

    // Execute query with given values
    sql.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newSection });
    });
};

// Retrieve all existing Sections from database
Section.getAll = result => {

    // Build select query
    let query = "SELECT course_faculty.ID, course.course_ID, course_faculty.ID, faculty.last_name, faculty.first_name, course_faculty.section_ID, course_faculty.semester, course_faculty.year, clinical_site.name, course_faculty.notes "
        + "FROM course_faculty "
        + "JOIN course ON course_faculty.course_ID = course.ID "
        + "JOIN faculty ON course_faculty.faculty_ID = faculty.ID "
        + "LEFT JOIN clinical_site ON course_faculty.clinical_site_ID = clinical_site.ID;";

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

// Retrieve a Section with the specified ID
Section.view = (ID, result) => {

    // Build select query
    let query = "SELECT course_faculty.ID, course_faculty.course_ID, course_faculty.faculty_ID, course_faculty.section_ID, course_faculty.semester, course_faculty.year, course_faculty.clinical_site_ID, course_faculty.notes "
        + "FROM course_faculty "
        + "WHERE course_faculty.ID = ?;";

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

        // Did not find a Section with given ID
        result({ kind: "not_found" }, null);
    });
};

// Update a Section with the specified ID
Section.updateById = (ID, updatedSection, result) => {

    // Build update query
    var query = "UPDATE course_faculty SET course_ID = ?, faculty_ID = ?, section_ID = ?, semester = ?, year = ?, clinical_site_ID = ?, notes = ? WHERE ID = ?; "

    // Start buliding values array to update
    var values = [updatedSection.course_ID, updatedSection.faculty_ID, updatedSection.section_ID, updatedSection.semester, updatedSection.year];

    // Check for valid clinical site, otherwise push value for "None" site
    values.push(updatedSection.clinical_site_ID === '' ? 0 : updatedSection.clinical_site_ID);

    // Push remaining values
    values.push(updatedSection.notes);
    values.push(ID);

    // Execute query
    sql.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // Did not find Section with specified ID
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { id: ID, ...updatedSection });
    });
};

// Delete a Section with the specified ID
Section.remove = (ID, result) => {

    // Build and execute query
    sql.query("DELETE FROM course_faculty WHERE ID = ?", ID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // Did not find Section with specified ID
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

// Export Section
module.exports = Section;