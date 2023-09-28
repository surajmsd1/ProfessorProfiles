// DegreeDisplay for displaying degree profile information

// Import modules
import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

// DegreeDisplay Component
const DegreeDisplay = ({ profile }) => {

    // Define profile variables
    var { ID, faculty_ID, type, name, description, date_obtained, institution, notes } = profile || {};

    // Remove timestamp from date field
    if (date_obtained)
        date_obtained = date_obtained.substring(0, 10);

    // Define and pull faculty list for faculty field
    const [facultyList, setFacultyList] = useState([]);

    useEffect(() => {
        axios
            .get("/faculty-list")
            .then(({ data }) => {
                setFacultyList(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Pull faculty name based on the selected degree facultyID
    const getFacultyName = (facultyID) => {
        const faculty = facultyList.find((f) => f.ID === facultyID);
        return faculty ? `${faculty.first_name} ${faculty.last_name}` : "";
    };

    // Return readOnly form fields
    return (
        <div>
            <h1>Degree Information</h1>
            <FormGroup className="form-group">
                <Label for="faculty_ID" className="edit-label">Faculty Name</Label>
                <Input type="text" name="faculty_ID" id="faculty_ID" className="edit-element"
                    value={getFacultyName(faculty_ID)} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="name" className="edit-label">Degree Type</Label>
                <Input type="text" name="name" id="name" className="edit-element" value={name} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="description" className="edit-label">Description</Label>
                <Input type="text" name="description" id="description" className="edit-element" value={description} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="date_obtained" className="edit-label">Date Obtained</Label>
                <Input type="text" className="edit-element" value={date_obtained} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="institution" className="edit-label">Institution</Label>
                <Input type="text" name="institution" id="institution" className="edit-element" value={institution} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="notes" className="edit-label">Notes</Label>
                <Input type="textarea" name="notes" id="notes" className="edit-element" value={notes} readOnly />
            </FormGroup>
        </div>
    );
};

// Export DegreeDisplay Component
export default DegreeDisplay;