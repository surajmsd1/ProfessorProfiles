// Create ClinicalSite from model class
const ClinicalSite = require("../models/clinicalsite.model.js");

// Create and save a new Clinical Site
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    // Create a Clinical Site
    const clinicalSite = new ClinicalSite({
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
        postal_code: req.body.postal_code,
        address_notes: req.body.address_notes,
        last_visited: req.body.last_visited,
        last_semester: req.body.last_semester,
        last_year: req.body.last_year,
        notes: req.body.notes
    });

    // Send new Clinical Site data to database
    ClinicalSite.create(clinicalSite, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the clinical site entry."
            });
        else res.send(data);
    });
};

// Retrieve all existing Clinical Sites from database
exports.findAll = (req, res) => {

    ClinicalSite.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving clinical sites."
            });
        else res.send(data);
    });
};

// Retrieve a Clinical Site with the specified ID
exports.view = (req, res) => {

    ClinicalSite.view(req.params.ID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Could not find Clinical Site with ID " + req.params.ID
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Clinical Site with ID " + req.params.ID
                });
            }
        } else res.send(data);
    });
};

// Update a Clinical Site with the specified ID
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    ClinicalSite.updateById(req.params.ID, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found Clinical Site with id " + req.params.ID
                });
            } else {
                res.status(500).send({
                    message: "Error updating Clinical Site with id " + req.params.ID
                });
            }
        } else res.send(data);
    });
};

// Delete a Clinical Site with the specified ID
exports.delete = (req, res) => {

    const ID = req.params.ID;

    ClinicalSite.remove(ID, (err, result) => {
        if (err) {
            res.status(500).send({
                message: "Error deleting clinical site"
            });
        } else {
            res.send({ message: "Clinical Site was deleted successfully!" });
        }
    });
};