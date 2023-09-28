// FacultyForm for creating and editing faculty

// Import modules
import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button, FormLabel } from "react-bootstrap";
import axios from "axios";

// FacultyForm Component
const FacultyForm = (props) => {

	// IDs for semester values and corresponding semester
	const semesters_ID = [1, 2, 3, 4];
	const semesters = ["Spring", "Summer", "Fall", "Winter"];

	// Form field validation
	const validationSchema = Yup.object().shape({
		first_name: Yup.string().required("You must enter the faculty first name."),
		last_name: Yup.string().required("You must enter the faculty last name."),
		date_of_birth: Yup.date().required("You must select a date of birth."),
		otterbein_ID: Yup.string().required("You must enter an Otterbein ID."),
		email_otterbein: Yup.string().email("You have entered an invalid email address."),
		email_personal: Yup.string().email("You have entered an invalid email address."),
		hire_date: Yup.date().required("You must select a hire date."), 
		exemption_needed: Yup.boolean().default(false),
		exemption_sent: Yup.date("Please enter a valid date.").nullable(),
		last_semester_taught: Yup.number().oneOf(semesters_ID).nullable(),
		last_year_taught: Yup.number().min(1000, "Year must be 4 digits long.").max(9999, "Year must be 4 digits long.").nullable(),
		last_evaluation: Yup.date("Please enter a valid date.").nullable(),
		notes: Yup.string().max(500, "Notes cannot be longer than 500 characters.").nullable(),
	});

	// Store if user is editing an existing faculty or creating a new faculty
	const [isEditing] = useState(props.isEditing);

	// Submit function for form
	const submitFaculty = (facultyObject, { resetForm } = {}) => {

		// PUT if user is editing existing faculty, POST if user is creating a new faculty
		const url = isEditing ? (`/update-faculty/${props.ID}`) : '/create-faculty';
		const method = isEditing ? 'PUT' : 'POST';

		// Send axios request depending on edit mode
		axios({ url, method, data: facultyObject }).then(res => {
			if (res.status === 200) {
				const successMessage = isEditing ? 'Faculty successfully updated!' : 'Faculty successfully added!';
				alert(successMessage);
				if (!isEditing)
					resetForm(); // Reset form after creating a new faculty
			} else
				Promise.reject();
		}).catch(err => alert('Something went wrong'));
	}

	// Parse initial date values to remove timestamp
	const initialValues = {
		...props.initialValues,
		date_of_birth: props.initialValues.date_of_birth.substring(0, 10),
		hire_date: props.initialValues.hire_date.substring(0, 10),
		exemption_sent: props.initialValues.exemption_sent ? props.initialValues.exemption_sent.substring(0, 10) : '',
		last_evaluation: props.initialValues.last_evaluation ? props.initialValues.last_evaluation.substring(0, 10) : '',
	};

	// Return form fields
	return (
		<div className="form-wrapper">
			<h1>Faculty Information</h1>
			<Formik {...props} initialValues={initialValues} validationSchema={validationSchema} onSubmit={submitFaculty}>
				<Form>
					<FormGroup className="form-group">
						<FormLabel>First Name</FormLabel>
						<Field name="first_name" type="text" className="form-control" placeholder="John" />
						<ErrorMessage name="first_name" className="d-block invalid-feedback" component="span" />
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Last Name</FormLabel>
						<Field name="last_name" type="text" className="form-control" placeholder="Smith" />
						<ErrorMessage name="last_name" className="d-block invalid-feedback" component="span" />
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Date of Birth</FormLabel>
						<Field name="date_of_birth" type="date" className="form-control" />
						<ErrorMessage name="date_of_birth" className="d-block invalid-feedback" component="span" />
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Otterbein ID</FormLabel>
						<Field name="otterbein_ID" type="text" className="form-control" placeholder="A12345678" />
						<ErrorMessage name="otterbein_ID" className="d-block invalid-feedback" component="span" />
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Otterbein Email Address</FormLabel>
						<Field name="email_otterbein" type="text" className="form-control" placeholder="example@otterbein.edu" />
						<ErrorMessage name="email_otterbein" className="d-block invalid-feedback" component="span" />
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Personal/Other Email Address</FormLabel>
						<Field name="email_personal" type="text" className="form-control" placeholder="example@gmail.com" />
						<ErrorMessage name="email_personal" className="d-block invalid-feedback" component="span" />
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Hire Date</FormLabel>
						<Field name="hire_date" type="date" className="form-control" />
						<ErrorMessage name="hire_date" className="d-block invalid-feedback" component="span" />
					</FormGroup>						
					<FormGroup className="form-group">
						<FormLabel>Exemption Letter Needed?&nbsp;</FormLabel>
						<Field name="exemption_needed" type="checkbox" className="mr-2 leading-tight" />
						<ErrorMessage name="exemption_needed" className="d-block invalid-feedback" component="span" />
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Exemption Letter Sent On</FormLabel>
						<Field name="exemption_sent" type="date" className="form-control" />
						<ErrorMessage name="exemption_sent" className="d-block invalid-feedback" component="span" />
					</FormGroup>						
					<FormGroup className="form-group">
						<FormLabel>Last Semester Taught</FormLabel>
						<Field name="last_semester_taught" as="select" className="form-control">
							<option value={""}>-- Select Semester --</option>;
							{semesters_ID.map((semester_ID, index) => (
								<option value={semester_ID} key={semester_ID}>
									{semesters[index]}
								</option>
							))}
						</Field>
						<ErrorMessage name="last_semester_taught" className="d-block invalid-feedback" component="span" />
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Last Year Taught</FormLabel>
						<Field name="last_year_taught" type="number" className="form-control" placeholder="Year" />
						<ErrorMessage name="last_year_taught" className="d-block invalid-feedback" component="span" />
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Last Evaluation</FormLabel>
						<Field name="last_evaluation" type="date" className="form-control" />
						<ErrorMessage name="last_evaluation" className="d-block invalid-feedback" component="span" />
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Notes</FormLabel>
						<Field name="notes" type="textarea" className="form-control" placeholder="Note" />
						<ErrorMessage name="notes" className="d-block invalid-feedback" component="span" />
					</FormGroup>
					<Button className="submit-button" variant="danger" size="lg" block="block" type="submit">
						{props.isEditing ? "Update Faculty" : "Add Faculty"}</Button>
				</Form>
			</Formik>
		</div>
	);
};

// Export FacultyForm Component
export default FacultyForm;