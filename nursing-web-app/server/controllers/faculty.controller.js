// Create Faculty from model class
const Faculty = require("../models/faculty.model.js");

// Create and save a new Faculty
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
  
    // Create a Faculty
    const faculty = new Faculty({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        email_otterbein: req.body.email_otterbein,
        email_personal: req.body.email_personal,
        otterbein_ID: req.body.otterbein_ID,
        hire_date: req.body.hire_date,
        exemption_needed: req.body.exemption_needed,
        exemption_sent: req.body.exemption_sent,
        last_semester_taught: req.body.last_semester_taught,
        last_year_taught: req.body.last_year_taught,
        last_evaluation: req.body.last_evaluation,
        notes: req.body.notes
    });
  
    // Send new Faculty data to database
    Faculty.create(faculty, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                   err.message || "Some error occurred while creating the faculty entry."
            });
        else res.send(data);
        });
    };

// Retrieve all existing Faculty from database
exports.findAll = (req, res) => {

    Faculty.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving faculty."
            });
        else res.send(data);
    });
};

// Retrieve a Faculty with the specified ID
exports.view = (req, res) => {

    Faculty.view(req.params.ID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Could not find Faculty with ID " + req.params.ID
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Faculty with ID " + req.params.ID
                });
            }
        } else res.send(data);
    });
};

// Update a Faculty with the specified ID
exports.update = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Faculty.updateById(req.params.ID, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found Faculty with id " + req.params.ID
                });
            } else {
                res.status(500).send({
                    message: "Error updating Faculty with id " + req.params.ID
                });
            }
        } else res.send(data);
    });
};

// Delete a Faculty with the specified ID
exports.delete = (req, res) => {

    const ID = req.params.ID;

    Faculty.remove(ID, (err, result) => {
        if (err) {
            res.status(500).send({
                message: "Error deleting faculty"
            });
        } else {
           res.send({ message: "Faculty was deleted successfully!" });
        }
    });
};