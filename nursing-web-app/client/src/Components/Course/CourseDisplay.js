// CourseDisplay for displaying course profile information

// Import modules
import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

// CourseDisplay Component
const CourseDisplay = ({ profile }) => {

    // Define profile variables
    var { ID, name, course_ID, notes } = profile || {};

    // Return readOnly form fields
    return (
        <div>
            <h1>Course Information</h1>
            <FormGroup className="form-group">
                <Label for="name" className="edit-label">Course Name</Label>
                <Input type="text" name="name" id="name" className="edit-element" value={name} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="course_ID" className="edit-label">Course ID</Label>
                <Input type="text" name="course_ID" id="course_ID" className="edit-element" value={course_ID} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="notes" className="edit-label">Notes</Label>
                <Input type="textarea" name="notes" id="notes" className="edit-element" value={notes} readOnly />
            </FormGroup>
        </div>
    );
};

// Export CourseDisplay Component
export default CourseDisplay;