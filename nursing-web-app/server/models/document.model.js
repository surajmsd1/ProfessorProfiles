// Create SQL varialbe to communicate with database
const sql = require("../utils/database.js");

// Constructor for Document object
const Document = function (document) {
    this.faculty_ID = document.faculty_ID;
    this.type = document.type;
    this.link = document.link;
    this.upload_date = document.upload_date;
    this.notes = document.notes;
};

// Create and save a new Document
Document.create = (newDocument, result) => {

    // Start building insert query
    var query = "INSERT INTO documents (faculty_ID, type, link, upload_date, notes) VALUES (?, ?, ?, ?, ?);"

    // Start building values array to insert
    var values = [newDocument.faculty_ID, newDocument.type, newDocument.link, newDocument.upload_date, newDocument.notes];

    // Execute query with given values
    sql.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newDocument });
    });
};

// Retrieve all existing Documents from database
Document.getAll = result => {

    // Build select query
    let query = "SELECT documents.ID, faculty.last_name, faculty.first_name, document_type.name, documents.upload_date, documents.link, documents.notes "
        + "FROM documents "
        + "INNER JOIN faculty ON documents.faculty_ID = faculty.ID "
        + "INNER JOIN document_type ON documents.type = document_type.ID";

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

// Retrieve a Document with the specified ID
Document.view = (ID, result) => {

    // Build select query
    let query = "SELECT documents.ID, documents.faculty_ID, documents.type, document_type.name, documents.link, documents.upload_date, documents.notes "
        + "FROM documents "
        + "INNER JOIN document_type ON documents.type = document_type.ID "
        + "WHERE documents.ID = ?;";

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

        // Did not find a Document with given ID
        result({ kind: "not_found" }, null);
    });
};

// Update a Document with the specified ID
Document.updateById = (ID, updatedDocument, result) => {

    // Build update query
    var query = "UPDATE documents SET faculty_ID = ?, type = ?, link = ?, notes = ? WHERE ID = ?;"

    // Build array of values to update
    var values = [updatedDocument.faculty_ID, updatedDocument.type, updatedDocument.link, updatedDocument.notes, ID];

    // Execute query
    sql.query(query, values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // Did not find Document with specified ID
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, { id: ID, ...updatedDocument });
    });
};

// Delete a Document with the specified ID
Document.remove = (ID, result) => {

    // Build and execute query
    sql.query("DELETE FROM documents WHERE ID = ?", ID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // Did not find Document with specified ID
            result({ kind: "not_found" }, null);
            return;
        }
        result(null, res);
    });
};

// Export Document
module.exports = Document;