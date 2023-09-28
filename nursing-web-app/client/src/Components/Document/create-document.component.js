// CreateDocument Component for adding new document

// Import Modules
import React, { useState } from "react";
import DocumentForm from "./DocumentForm";

// CreateDocument Component
const CreateDocument = () => {

	// Define initial blank form values
	const [formValues, setFormValues] =
		useState({ faculty_ID: '', type: '', link: '', notes: '' });

	// Return form
	return (
		<DocumentForm initialValues={formValues} isEditing={false} ID={null} enableReinitialize>
			{"Upload Document"}
		</DocumentForm>
	);
}

// Export CreateDocument Component
export default CreateDocument;