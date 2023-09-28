// SectionForm for creating and editing sections

// Import modules
import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button, FormLabel } from "react-bootstrap";
import axios from "axios";

// SectionForm Component
const SectionForm = (props) => {

	// IDs for semester values and corresponding semester
	const semesters_ID = [1, 2, 3, 4];
	const semesters = ["Spring", "Summer", "Fall", "Winter"];

	// Form field validation
	const validationSchema = Yup.object().shape({
		course_ID: Yup.number().required("You must select a course."),
		faculty_ID: Yup.number().required("You must select a faculty."),
		section_ID: Yup.string().required("You must enter a section ID."),
		semester: Yup.number().oneOf(semesters_ID).required("You must select a semester."),
		year: Yup.number().min(1000, "Year must be 4 digits long.").max(9999, "Year must be 4 digits long.").required("You must enter a year."),
		clinical_site_ID: Yup.number().nullable(),
		notes: Yup.string().max(500, "Notes cannot be longer than 500 characters.").nullable(),
	});

	// Define and pull course list, faculty list, and clinical site list for fields
	const [courseList, setCourseList] = useState([]);
	const [facultyList, setFacultyList] = useState([]);
	const [clinicalSiteList, setClinicalSiteList] = useState([]);

	useEffect(() => {
		axios
			.get("/course-list")
			.then(({ data }) => {
				setCourseList(data);
			})
			.catch((error) => {
				console.log(error);
			});

		axios
			.get("/faculty-list")
			.then(({ data }) => {
				setFacultyList(data);
			})
			.catch((error) => {
				console.log(error);
			});

		axios
			.get("/clinicalsite-list")
			.then(({ data }) => {
				setClinicalSiteList(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// Store if user is editing an existing section or creating a new section
	const [isEditing] = useState(props.isEditing);

	// Submit function for form
	const submitSection = (sectionObject, { resetForm } = {}) => {

		// PUT if user is editing existing section, POST if user is creating a new section
		const url = isEditing ? (`/update-section/${props.ID}`) : '/create-section';
		const method = isEditing ? 'PUT' : 'POST';

		// Send axios request depending on edit mode
		axios({ url, method, data: sectionObject }).then(res => {
			if (res.status === 200) {
				const successMessage = isEditing ? 'Section successfully updated!' : 'Section successfully added!';
				alert(successMessage);
				if (!isEditing)
					resetForm(); // Reset form after creating a new section
			} else
				Promise.reject();
		}).catch(err => alert('Something went wrong'));
	}

	// Return form fields
	return (
		<div className="form-wrapper">
			<h1>Section Information</h1>
			<Formik {...props} initialValues={props.initialValues} validationSchema={validationSchema} onSubmit={submitSection}>
				<Form>
					<FormGroup className="form-group">
						<FormLabel>Course Code</FormLabel>
						<Field name="course_ID" as="select" className="form-control" defaultValue={props.initialValues.course_ID}>
							<option value="">-- Select Course (Required) --</option>
							{courseList.sort((a, b) => (a.course_ID > b.course_ID) ? 1 : -1).map((course) => (							
								<option value={course.ID} key={course.ID}>
									{course.course_ID}
								</option>
							))}
						</Field>
						<ErrorMessage name="course_ID" className="invalid-feedback" component="span" />
					</FormGroup>
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
						<FormLabel>Section ID</FormLabel>
						<Field name="section_ID" type="text" className="form-control" placeholder="Section ID" />
						<ErrorMessage name="section_ID" className="d-block invalid-feedback" component="span" />
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Semester</FormLabel>
						<Field name="semester" as="select" className="form-control" defaultValue={props.initialValues.semester}>
							<option value={""}>-- Select Semester (Required) --</option>;
							{semesters_ID.map((semester_ID, index) => (
								<option value={semester_ID} key={semester_ID}>
									{semesters[index]}
								</option>
							))}
						</Field>
						<ErrorMessage name="semester" className="invalid-feedback" component="span" />
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Year</FormLabel>
						<Field name="year" type="number" className="form-control" placeholder="Year" />
						<ErrorMessage name="year" className="d-block invalid-feedback" component="span" />
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Clinical Site</FormLabel>
						<Field name="clinical_site_ID" as="select" className="form-control" defaultValue={props.initialValues.clinical_site_ID}>
							<option value="0">-- Select Clinical Site --</option>
							{clinicalSiteList.sort((a, b) => (a.name > b.name) ? 1 : -1).map((clinicalSite) => (
								<option value={clinicalSite.ID} key={clinicalSite.ID}>
									{clinicalSite.name}
								</option>
							))}
						</Field>
						<ErrorMessage name="clinical_site_ID" className="invalid-feedback" component="span" />
					</FormGroup>
					<FormGroup className="form-group">
						<FormLabel>Notes</FormLabel>
						<Field name="notes" type="textarea" className="form-control" placeholder="Note" />
						<ErrorMessage name="notes" className="d-block invalid-feedback" component="span" />
					</FormGroup>
					<Button className="submit-button" variant="danger" size="lg" block="block" type="submit">
						{props.isEditing ? "Update Section" : "Add Section"}</Button>
				</Form>
			</Formik>
		</div>
	);
};

// Export SectionForm Component
export default SectionForm;