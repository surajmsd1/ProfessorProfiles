// DegreeForm for creating and editing degrees

// Import modules
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button, FormLabel } from "react-bootstrap";
import axios from "axios";

// DegreeForm Component
const DegreeForm = (props) => {

    // IDs for degree type values and corresponding types
    const degree_ID = [1, 2, 3, 4, 5];
    const degrees = ["Other", "BSN", "MSN", "DNP", "PhD"];

    // Form field validation
    const validationSchema = Yup.object().shape({
        faculty_ID: Yup.number().required("You must select a faculty member."),
        type: Yup.number().oneOf(degree_ID).required("You must select a degree type."),
        description: Yup.string().nullable(),
        date_obtained: Yup.date().required("You must select the obtained date."),
        institution: Yup.string().nullable(),
        notes: Yup.string().max(500, "Notes cannot be longer than 500 characters.").nullable(),
    });

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

    // Store if user is editing an existing degree or creating a new degree
    const [isEditing] = useState(props.isEditing);

    // Submit function for form
    const submitDegree = (degreeObject, { resetForm } = {}) => {

        // PUT if user is editing an existing degree, POST if user is creating a new degree
        const url = isEditing ? (`/update-degree/${props.ID}`) : '/create-degree';
        const method = isEditing ? 'PUT' : 'POST';

        // Send axios request depending on edit mode
        axios({ url, method, data: degreeObject }).then(res => {
            if (res.status === 200) {
                const successMessage = isEditing ? 'Degree successfully updated!' : 'Degree successfully added!';
                alert(successMessage);
                if (!isEditing)
                    resetForm(); // Reset form after creating a new faculty
            } else
                Promise.reject();
        }).catch(err => alert('Something went wrong'));
    }   

    // Parse initial date values to remove timestamps
    const initialValues = {
        ...props.initialValues,
        date_obtained: props.initialValues.date_obtained.substring(0, 10),
    };

    // Return form fields
    return (
        <div className="form-wrapper">
            <h1>Degree Information</h1>
            <Formik {...props} initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitDegree}>
                <Form>
                    <FormGroup className="form-group">
                        <FormLabel>Faculty Name</FormLabel>
                        <Field name="faculty_ID" as="select" className="form-control" defaultValue={props.initialValues.faculty_ID}>
                            <option value="">-- Select Faculty (Required) --</option>
                            {facultyList.sort((a, b) => (a.last_name > b.last_name) ? 1 : -1).map((faculty) => (
                                <option value={faculty.ID} key={faculty.ID}>
                                    {faculty.first_name} {faculty.last_name} - {faculty.otterbein_ID}
                                </option>
                            ))}
                        </Field>
                        <ErrorMessage name="faculty_ID" className="invalid-feedback" component="span" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>Degree Type&nbsp;</FormLabel>
                        <Field name="type" as="select" className="form_control" defaultValue={props.initialValues.type}>
                            <option value="">-- Select Degree (Required) --</option>
                            <option value={degree_ID[0]}>{degrees[0]}</option>
                            <option value={degree_ID[1]}>{degrees[1]}</option>
                            <option value={degree_ID[2]}>{degrees[2]}</option>
                            <option value={degree_ID[3]}>{degrees[3]}</option>
                            <option value={degree_ID[4]}>{degrees[4]}</option>
                        </Field>
                        <ErrorMessage name="type" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>Description</FormLabel>
                        <Field name="description" type="text" className="form-control" placeholder="Description" />
                        <ErrorMessage name="description" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>Date Obtained</FormLabel>
                        <Field name="date_obtained" type="date" className="form-control" defaultValue={initialValues.date_obtained} />
                        <ErrorMessage name="date_obtained" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>Institution Obtained From</FormLabel>
                        <Field name="institution" type="text" className="form-control" placeholder="Example University" />
                        <ErrorMessage name="institution" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>Notes</FormLabel>
                        <Field name="notes" type="textarea" className="form-control" placeholder="Note" />
                        <ErrorMessage name="notes" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <Button className="submit-button" variant="danger" size="lg" block="block" type="submit">
                        {props.isEditing ? "Update Degree" : "Add Degree"}</Button>
                </Form>
            </Formik>
        </div>
    );
};

// Export DegreeForm Component
export default DegreeForm;