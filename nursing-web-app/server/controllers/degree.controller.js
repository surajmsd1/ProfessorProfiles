// Create Degree from model class
const Degree = require("../models/degree.model.js");

// Create and save a new Degree
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    // Create a Degree
    const degree = new Degree({
        faculty_ID: req.body.faculty_ID,
        type: req.body.type,
        description: req.body.description,
        date_obtained: req.body.date_obtained,
        institution: req.body.institution,
        notes: req.body.notes
    })

    // Save new Degree data to database
    Degree.create(degree, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the degree entry."
            });
        else res.send(data);
    });
};

// Retrieve all existing Degree from database
exports.findAll = (req, res) => {

    Degree.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving degrees."
            });
        else res.send(data);
    });
};

// Retrieve a Degree with the specified ID
exports.view = (req, res) => {

    Degree.view(req.params.ID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Could not find Degree with ID " + req.params.ID
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Degree with ID " + req.params.ID
                });
            }
        } else res.send(data);
    });
};

// Update a Degree with the specified ID
exports.update = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Degree.updateById(req.params.ID, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found Degree with id " + req.params.ID
                });
            } else {
                res.status(500).send({
                    message: "Error updating Degree with id " + req.params.ID
                });
            }
        } else res.send(data);
    });
};

// Delete a Degree with the specified ID
exports.delete = (req, res) => {

    const ID = req.params.ID;

    Degree.remove(ID, (err, result) => {
        if (err) {
            res.status(500).send({
                message: "Error deleting degree"
            });
        } else {
            res.send({ message: "Degree was deleted successfully!" });
        }
    });
};