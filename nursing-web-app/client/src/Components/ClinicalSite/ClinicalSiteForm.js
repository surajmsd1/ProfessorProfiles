// ClinicalSiteForm for creating and editing clinical sites

// Import modules
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button, FormLabel } from "react-bootstrap";
import axios from "axios";

// ClinicalSiteForm Component
const ClinicalSiteForm = (props) => {

    // Define state values for state field
    const states = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA",
        "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY",
        "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];

    // Define country values for country field
    const countries = ["United States", "Other"];

    // IDs for semester values and corresponding semester
    const semesters_ID = [1, 2, 3, 4];
    const semesters = ["Spring", "Summer", "Fall", "Winter"];

    // Form field validation
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("You must enter a clinical site name."),
        address: Yup.string().required("You must enter the clinical site address."),
        city: Yup.string().required("You must enter the city of the clinical site."),
        state: Yup.string().oneOf(states).required("You must enter the state of the clinical site."),
        country: Yup.string().nullable(),
        postal_code: Yup.string().required("You must enter the ZIP code of the clinical site."),
        address_notes: Yup.string().nullable(),
        last_visited: Yup.date().required("You must enter the most recent visit date."),
        last_semester: Yup.number().oneOf(semesters_ID).nullable(),
        last_year: Yup.number().min(1000, "Year must be 4 digits long.").max(9999, "Year must be 4 digits long.").nullable(),
        notes: Yup.string().max(500, "Notes cannot be longer than 500 characters.").nullable(),
    });

    // Store if user is editing an existing clinical site or creating a new clinical site
    const [isEditing] = useState(props.isEditing);

    // Submit function for form
    const submitClinicalSite = (clinicalSiteObject, { resetForm } = {}) => {

        // PUT if user is editing existing clinical site, POST if user is creating a new clinical site
        const url = isEditing ? (`/update-clinicalsite/${props.ID}`) : '/create-clinicalsite';
        const method = isEditing ? 'PUT' : 'POST';

        // Send axios request depending on edit mode
        axios({ url, method, data: clinicalSiteObject }).then(res => {
            if (res.status === 200) {
                const successMessage = isEditing ? 'Clinical Site successfully updated!' : 'Clinical Site successfully added!';
                alert(successMessage);
                if (!isEditing)
                    resetForm(); // Reset form after creating a new clinical site
            } else
                Promise.reject();
        }).catch(err => alert('Something went wrong'));
    }

    // Parse initial date values to remove timestamp
    const initialValues = {
        ...props.initialValues,
        last_visited: props.initialValues.last_visited ? props.initialValues.last_visited.substring(0, 10) : '',
    };

    // Return form fields
    return (
        <div className="form-wrapper">
            <h1>Clinical Site Information</h1>
            <Formik {...props} initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitClinicalSite}>
                <Form>
                    <FormGroup className="form-group">
                        <FormLabel>Clinical Site Name</FormLabel>
                        <Field name="name" type="text" className="form-control" placeholder="Otterbein: Lab" />
                        <ErrorMessage name="name" className="d-block invalid-feedback" component="span"/>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>Address</FormLabel>
                        <Field name="address" type="text" className="form-control" placeholder="1 S Grove St" />
                        <ErrorMessage name="address" className="d-block invalid-feedback" component="span"/>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>City</FormLabel>
                        <Field name="city" type="text" className="form-control" placeholder="Westerville" />
                        <ErrorMessage name="city" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>State&nbsp;</FormLabel>
                        <Field name="state" as="select" className="form_control" defaultValue={props.initialValues.state}>
                            <option value="">-- Select State --</option>
                            {states.map((state) => (
                                <option value={state} key={state}>
                                    {state}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="state" className="d-block invalid-feedback" component="span"/>
                    </FormGroup>                    
                    <FormGroup className="form-group">
                        <FormLabel>Country&nbsp;</FormLabel>
                        <Field name="country" as="select" className="form_control">
                            <option value="">-- Select Country --</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </Field>
                        <ErrorMessage name="country" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>Postal Code</FormLabel>
                        <Field name="postal_code" type="text" className="form-control" placeholder="43081" />
                        <ErrorMessage name="postal_code" className="d-block invalid-feedback" component="span"/>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>Address Notes</FormLabel>
                        <Field name="address_notes" type="textarea" className="form-control" placeholder="Address Note" />
                        <ErrorMessage name="address_notes" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>Last Visited On</FormLabel>
                        <Field name="last_visited" type="date" className="form-control" defaultValue={initialValues.last_visited} />
                        <ErrorMessage name="last_visited" className="d-block invalid-feedback" component="span"/>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>Last Semester Used</FormLabel>
                        <Field name="last_semester" as="select" className="form-control" defaultValue={props.initialValues.last_semester}>
                            <option value={""}>-- Select Semester --</option>;
                            {semesters_ID.map((semester_ID, index) => (
                                <option value={semester_ID} key={semester_ID}>
                                    {semesters[index]}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="last_semester" className="invalid-feedback" component="span"/>
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>Last Year Used</FormLabel>
                        <Field name="last_year" type="number" className="form-control" placeholder="Year" />
                        <ErrorMessage name="last_year" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>Notes</FormLabel>
                        <Field name="notes" type="textarea" className="form-control" placeholder="Note" />
                        <ErrorMessage name="notes" className="d-block invalid-feedback" component="span"/>
                    </FormGroup>
                    <Button className="submit-button" variant="danger" size="lg" block="block" type="submit">
                        {props.isEditing ? "Update Clinical Site" : "Add Clinical Site"}</Button>
                </Form>
            </Formik>
        </div>
    );
};

// Export ClinicalSiteForm Component
export default ClinicalSiteForm;