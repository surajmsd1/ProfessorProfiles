// CreateFaculty Component for adding new faculty

// Import modules
import React, { useState } from "react";
import FacultyForm from "./FacultyForm";

// CreateFaculty Component
const CreateFaculty = () => {

	// Define initial blank form values
	const [formValues, setFormValues] =
		useState({ first_name: '', last_name: '', date_of_birth: '', otterbein_ID: '', email_otterbein: '',
				email_personal: '', hire_date: '', highest_degree: '', exemption_needed: '', exemption_sent: '',
				last_semester_taught: '', last_year_taught: '', last_evaluation: '', notes: '' })
	
	// Return form
	return (
		<FacultyForm initialValues={formValues} isEditing={false} ID={null} enableReinitialize>
			{"Add Degree"}
		</FacultyForm>
	);
}

// Export CreateFaculty Component
export default CreateFaculty;