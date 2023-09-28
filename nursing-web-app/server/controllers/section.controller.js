// Create Section from model class
const Section = require("../models/section.model.js");

// Create and save a new Section
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // Create a Section
    const section = new Section({
        course_ID: req.body.course_ID,
        faculty_ID: req.body.faculty_ID,
        section_ID: req.body.section_ID,
        semester: req.body.semester,
        year: req.body.year,
        clinical_site_ID: req.body.clinical_site_ID,       
        notes: req.body.notes,
    });

    // Send new Section data to database
    Section.create(section, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the section entry."
            });
        else res.send(data);
    });
};

// Retrieve all existing Sections from database
exports.findAll = (req, res) => {

    Section.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving sections."
            });
        else res.send(data);
    });
};

// Retrieve a Section with the specified ID
exports.view = (req, res) => {

    Section.view(req.params.ID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Could not find Section with ID " + req.params.ID
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Section with ID " + req.params.ID
                });
            }
        } else res.send(data);
    });
};

// Update a Section with the specified ID
exports.update = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Section.updateById(req.params.ID, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found Section with id " + req.params.ID
                });
            } else {
                res.status(500).send({
                    message: "Error updating Section with id " + req.params.ID
                });
            }
        } else res.send(data);
    });
};

// Delete a Section with the specified ID
exports.delete = (req, res) => {

    const ID = req.params.ID;

    Section.remove(ID, (err, result) => {
        if (err) {
            res.status(500).send({
                message: "Error deleting section"
            });
        } else {
            res.send({ message: "Section was deleted successfully!" });
        }
    });
};