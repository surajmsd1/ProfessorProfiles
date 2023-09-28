// DocumentForm for creating and editing documents

// Import modules
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button, FormLabel } from "react-bootstrap";
import axios from "axios";

// DocumentForm component
const DocumentForm = (props) => {

	// IDs for document type values and corresponding type
	const types_ID = [1, 2, 3];
	const doc_types = ["Transcript", "Resume", "Exemption Letter"];	

	// Form field validation
	const validationSchema = Yup.object().shape({
		faculty_ID: Yup.number().required("You must select a faculty member."),
		type: Yup.number().oneOf(types_ID).required("You must select a document type."),
		link: Yup.string().required("You must put the link to the document."),
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

	// Store if user is editing an existing document or creating a new document
	const [isEditing] = useState(props.isEditing);

	// Submit function for form
	const submitDocument = (documentObject, { resetForm } = {}) => {

		// PUT if user is editing existing document, POST if user is creating a new document
		const url = isEditing ? (`/update-document/${props.ID}`) : '/create-document';
		const method = isEditing ? 'PUT' : 'POST';

		// Send axios request depending on edit mode
		axios({ url, method, data: documentObject }).then(res => {
			if (res.status === 200) {
				const successMessage = isEditing ? 'Document successfully updated!' : 'Document successfully uploaded!';
				alert(successMessage);
				if (!isEditing)
					resetForm(); // Reset form after creating a new document
			} else
				Promise.reject();
		}).catch(err => alert('Something went wrong'));
	}

	// Return form fields
	return (
		<div className="form-wrapper">
			<h1>Document Information</h1>
			<Formik {...props} initialValues={props.initialValues} validationSchema={validationSchema} onSubmit={submitDocument}>
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
						<ErrorMessage name="faculty_ID" className="invalid-feedback" component="span"/>
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Type</FormLabel>
						<Field name="type" as="select" className="form-control" defaultValue={props.initialValues.type}>
							<option value="">-- Select Type (Required) --</option>
							{types_ID.map((type_ID, index) => (
								<option value={type_ID} key={type_ID}>
									{doc_types[index]}
								</option>
							))}
						</Field>
						<ErrorMessage name="docType" className="d-block invalid-feedback" component="span"/>
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Link</FormLabel>
						<Field name="link" type="text" className="form-control" placeholder="Document Link" />
						<ErrorMessage name="link" className="d-block invalid-feedback" component="span"/>
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Notes</FormLabel>
						<Field name="notes" type="textarea" className="form-control" placeholder="Note" />
						<ErrorMessage name="notes" className="d-block invalid-feedback" component="span"/>
					</FormGroup>
					<Button className="submit-button" variant="danger" size="lg" block="block" type="submit">
						{props.isEditing ? "Update Document" : "Upload Document"}</Button>
				</Form>
			</Formik>
		</div>
	);
};

// Export DocumentForm Component
export default DocumentForm;