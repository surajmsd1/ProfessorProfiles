// ClinicalSiteDisplay for displaying clinical site profile information

// Import modules
import React from "react";
import { FormGroup, Label, Input } from "reactstrap";

// ClinicalSiteDisplay Component
const ClinicalSiteDisplay = ({ profile }) => {

    // Define profile variables
    var { ID, name, address_ID, address, city, state, country, postal_code, address_notes,
        last_visited, last_semester, last_year, notes } = profile || {};

    // Remove timestamp from date field
    if (last_visited)
        last_visited = last_visited.substring(0, 10);

    // Replace int values with semester
    if (last_semester === 1) last_semester = "Spring";
    else if (last_semester === 2) last_semester = "Summer";
    else if (last_semester === 3) last_semester = "Fall";
    else if (last_semester === 4) last_semester = "Winter";

    // Return readOnly form fields
    return (
        <div>
            <h1>Clinical Site Information</h1>         
            <FormGroup className="form-group">
                <Label for="name" className="edit-label">Name</Label>
                <Input type="text" name="name" id="name" className="edit-element" value={name} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="address" className="edit-label">Address</Label>
                <Input type="text" name="address" id="address" className="edit-element" value={address} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="city" className="edit-label">City</Label>
                <Input type="text" name="city" id="city" className="edit-element" value={city} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="state" className="edit-label">State</Label>
                <Input type="text" name="state" id="state" className="edit-element" value={state} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="country" className="edit-label">Country</Label>
                <Input type="text" name="country" id="country" className="edit-element" value={country} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="postal_code" className="edit-label">Postal Code</Label>
                <Input type="text" name="postal_code" id="postal_code" className="edit-element" value={postal_code} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="address_notes" className="edit-label">Address Notes</Label>
                <Input type="textarea" name="address_notes" id="address_notes" className="edit-element" value={address_notes} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="last_visited" className="edit-label">Last Visited</Label>
                <Input type="text" name="last_visited" id="last_visited" className="edit-element" value={last_visited} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="last_year" className="edit-label">Last Year</Label>
                <Input type="text" name="last_year" id="last_year" className="edit-element" value={last_year} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="last_semester" className="edit-label">Last Semester</Label>
                <Input type="text" name="last_semester" id="last_semester" className="edit-element" value={last_semester} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="notes" className="edit-label">Notes</Label>
                <Input type="textarea" name="notes" id="notes" className="edit-element" value={notes} readOnly />
            </FormGroup>
        </div>
    );
};

// Export ClinicalSiteDisplay Component
export default ClinicalSiteDisplay;