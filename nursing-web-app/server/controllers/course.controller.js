// Create Course from model class
const Course = require("../models/course.model.js");

// Create and save a new Course
exports.create = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }

    // Create a Course
    const course = new Course({
        name: req.body.name,
        course_ID: req.body.course_ID,
        notes: req.body.notes
    });

    // Send new Course data to the database
    Course.create(course, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the course entry."
            });
        else res.send(data);
    });
};

// Retrieve all existing Courses from database
exports.findAll = (req, res) => {

    Course.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving courses."
            });
        else res.send(data);
    });    
};

// Find a Course with the specified ID
exports.view = (req, res) => {

    Course.view(req.params.ID, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Could not find Course with ID " + req.params.ID
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Course with ID " + req.params.ID
                });
            }
        } else res.send(data);
    });
};

// Update a Course with the specified ID
exports.update = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Course.updateById(req.params.ID, req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "Not found Course with id " + req.params.ID
                });
            } else {
                res.status(500).send({
                    message: "Error updating Course with id " + req.params.ID
                });
            }
        } else res.send(data);
    });
};

// Delete a Course with the specified ID
exports.delete = (req, res) => {

    const ID = req.params.ID;

    Course.remove(ID, (err, result) => {
        if (err) {
            res.status(500).send({
                message: "Error deleting course"
            });
        } else {
            res.send({ message: "Course was deleted successfully!" });
        }
    });
};