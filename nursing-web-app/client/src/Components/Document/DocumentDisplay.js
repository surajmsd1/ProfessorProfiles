// DocumentDisplay for displaying document profile information

// Import modules
import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

// DocumentDisplay Component
const DocumentDisplay = ({ profile }) => {

    // Define profile variables
    var { ID, faculty_ID, type, name, link, upload_date, notes } = profile || {};

    // Remove timestamp from date field
    if (upload_date)
        upload_date = upload_date.substring(0, 10);

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

    // Pull faculty name based on the selected document faculty.ID
    const getFacultyName = (facultyID) => {
        const faculty = facultyList.find((f) => f.ID === facultyID);
        return faculty ? `${faculty.first_name} ${faculty.last_name}` : "";
    };

    // Return readOnly form fields
    return (
        <div>
            <h1>Document Information</h1>
            <FormGroup className="form-group">
                <Label for="faculty_ID" className="edit-label">Faculty Name</Label>
                <Input type="text" name="faculty_ID" id="faculty_ID" className="edit-element"
                    value={getFacultyName(faculty_ID)} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="name" className="edit-label">Type</Label>
                <Input type="text" name="name" id="name" className="edit-element" value={name} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="link" className="edit-label">Link</Label>
                <Input type="text" name="link" id="link" className="edit-element" value={link} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="upload_date" className="edit-label">Upload Date</Label>
                <Input type="text" className="edit-element" value={upload_date} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="notes" className="edit-label">Notes</Label>
                <Input type="textarea" name="notes" id="notes" className="edit-element" value={notes} readOnly />
            </FormGroup>
        </div>
    );
};

// Export DocumentDisplay Component
export default DocumentDisplay;