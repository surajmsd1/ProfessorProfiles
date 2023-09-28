// Create Document from model class
const Document = require("../models/document.model.js");

// Create and save a new Document
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Document
    const document = new Document({
        faculty_ID: req.body.faculty_ID,
        type: req.body.type,
        link: req.body.link,
        upload_date: new Date(),
        notes: req.body.notes,
    });

    // Send new Document data to database
    Document.create(document, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the document entry."
            });
        else res.send(data);
    });
};

// Retrieve all existing Documents from database
exports.findAll = (req, res) => {

    Document.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving documents."
            });
        else res.send(data);
    });
};

// Retrieve a Document with the specified ID
exports.view = (req, res) => {

    Document.view(req.params.ID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Could not find Document with ID " + req.params.ID
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Document with ID " + req.params.ID
                });
            }
        } else res.send(data);
    });
};

// Update a Document with the specified ID
exports.update = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Document.updateById(req.params.ID, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found Document with id " + req.params.ID
                });
            } else {
                res.status(500).send({
                    message: "Error updating Document with id " + req.params.ID
                });
            }
        } else res.send(data);
    });
};

// Delete a Document with the specified ID
exports.delete = (req, res) => {

    const ID = req.params.ID;

    Document.remove(ID, (err, result) => {
        if (err) {
            res.status(500).send({
                message: "Error deleting document"
            });
        } else {
            res.send({ message: "Document was deleted successfully!" });
        }
    });
};
