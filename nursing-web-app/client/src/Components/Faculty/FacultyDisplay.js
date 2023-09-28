// FacultyDisplay for displaying faculty profile information

// Import modules
import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

// FacultyDisplay Component
const FacultyDisplay = ({ profile }) => {

    // Define profile variables
    var { ID, last_name, first_name, date_of_birth, email_otterbein, email_personal, otterbein_ID, hire_date, status,
        exemption_needed, exemption_sent, last_semester_taught, last_year_taught, last_evaluation, notes } = profile || {};

    // Remove timestamp from all date fields
    if (date_of_birth)
        date_of_birth = date_of_birth.substring(0, 10);

    if (hire_date)
        hire_date = hire_date.substring(0, 10);

    if (exemption_sent)
        exemption_sent = exemption_sent.substring(0, 10);

    if (last_evaluation)
        last_evaluation = last_evaluation.substring(0, 10);

    // Replace int values with Yes/No
    if (exemption_needed === 1)
        exemption_needed = "Yes";
    else
        exemption_needed = "No";

    // Replace int values with semester
    if (last_semester_taught === 1) last_semester_taught = "Spring";
    else if (last_semester_taught === 2) last_semester_taught = "Summer";
    else if (last_semester_taught === 3) last_semester_taught = "Fall";
    else if (last_semester_taught === 4) last_semester_taught = "Winter";

    // Determine active/inactive status
    var year = new Date().getFullYear();
    if (year - parseInt(last_year_taught) < 2)
        status = "Active";
    else
        status = "Inactive";

    // Return readOnly form fields
    return (
        <div>
            <h1> Faculty Information </h1>            
            <FormGroup className="form-group">
                <Label for="first_name" className="edit-label">First Name</Label>
                <Input type="text" name="first_name" id="first_name" className="edit-element" value={first_name} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="last_name" className="edit-label">Last Name</Label>
                <Input type="text" name="last_name" id="last_name" className="edit-element" value={last_name} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="date_of_birth" className="edit-label">Date of Birth</Label>
                <Input type="text" name="date_of_birth" id="date_of_birth" className="edit-element" value={date_of_birth} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="email_otterbein" className="edit-label">Otterbein Email</Label>
                <Input type="text" name="email_otterbein" id="email_otterbein" className="edit-element" value={email_otterbein} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="email_personal" className="edit-label">Personal Email</Label>
                <Input type="text" name="email_personal" id="email_personal" className="edit-element" value={email_personal} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="otterbein_ID" className="edit-label">Otterbein ID</Label>
                <Input type="text" name="otterbein_ID" id="otterbein_ID" className="edit-element" value={otterbein_ID} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="hire_date" className="edit-label">Hire Date</Label>
                <Input type="text" name="hire_date" id="hire_date" className="edit-element" value={hire_date} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="status" className="edit-label">Status</Label>
                <Input type="text" name="status" id="status" className="edit-element" value={status} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="exemption_needed" className="edit-label">Exemption Letter Needed?</Label>
                <Input type="text" name="exemption_needed" id="exemption_needed" className="edit-element" value={exemption_needed} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="exemption_sent" className="edit-label">Exemption Letter Sent</Label>
                <Input type="text" name="exemption_sent" id="exemption_sent" className="edit-element" value={exemption_sent} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="last_semester_taught" className="edit-label">Last Semester Taught</Label>
                <Input type="text" name="last_semester_taught" id="last_semester_taught" className="edit-element" value={last_semester_taught} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="last_year_taught" className="edit-label">Last Year Taught</Label>
                <Input type="text" name="last_year_taught" id="last_year_taught" className="edit-element" value={last_year_taught} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="last_evaluation" className="edit-label">Last Evaluation</Label>
                <Input type="text" name="last_evaluation" id="last_evaluation" className="edit-element" value={last_evaluation} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="notes" className="edit-label">Notes</Label>
                <Input type="textarea" name="notes" id="notes" className="edit-element" value={notes} readOnly />
            </FormGroup>
        </div>
    );
};

// Export FacultyDisplay Component
export default FacultyDisplay;