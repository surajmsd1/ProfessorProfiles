// CourseForm for creating and editing courses

// Import modules
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button, FormLabel } from "react-bootstrap";
import axios from "axios";

// CourseForm Component
const CourseForm = (props) => {

    // Form field validation
    const validationSchema = Yup.object().shape({
        name: Yup.string().nullable(),
        course_ID: Yup.string().max(9, "Course code must be in the format: NURS 1000").required("You must enter the course code/ID."),
        notes: Yup.string().max(500, "Notes cannot be longer than 500 characters.").nullable(),
    }); 

    // Store if user is editing an exisitng course or creating a new course
    const [isEditing] = useState(props.isEditing);

    // Submit function for form
    const submitCourse = (courseObject, { resetForm } = {}) => {

        // PUT is user is editing existing course, POST if user is creating a new course
        const url = isEditing ? (`/update-course/${props.ID}`) : '/create-course';
        const method = isEditing ? 'PUT' : 'POST';

        // Send axios request depending on edit mode
        axios({ url, method, data: courseObject }).then(res => {
            if (res.status === 200) {
                const successMessage = isEditing ? 'Course successfully updated!' : 'Course successfully added!';
                alert(successMessage);
                if (!isEditing)
                    resetForm(); // Reset form after creating a new course
            } else
                Promise.reject();
        }).catch(err => alert('Something went wrong'));
    }

    // Return form fields
    return (
        <div className="form-wrapper">
            <h1>Course Information</h1>
            <Formik {...props} initialValues={props.initialValues} validationSchema={validationSchema} onSubmit={submitCourse}>
                <Form>                                                           
                    <FormGroup className="form-group">
                        <FormLabel>Course Name</FormLabel>
                        <Field name="name" type="text" className="form-control" placeholder="Course Name" />
                        <ErrorMessage name="name" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>Course Code</FormLabel>
                        <Field name="course_ID" type="text" className="form-control" placeholder="EXPL 1500" />
                        <ErrorMessage name="course_ID" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>Notes</FormLabel>
                        <Field name="notes" type="textarea" className="form-control" placeholder="Note" />
                        <ErrorMessage name="notes" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <Button className="submit-button" variant="danger" size="lg" block="block" type="submit">
                        {props.isEditing ? "Update Course" : "Create Course"}</Button>
                </Form>
            </Formik>
        </div>
    );
};

// Export CourseForm Component
export default CourseForm;