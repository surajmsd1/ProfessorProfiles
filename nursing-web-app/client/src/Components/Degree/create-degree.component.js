// CreateDegree Component for adding new degrees

// Import modules
import React, { useState } from "react";
import DegreeForm from "./DegreeForm";

// CreateDegree Component
const CreateDegree = () => {

    // Define initial blank form values
    const [formValues, setFormValues] =
        useState({ faculty_ID: '', type: '', description: '', date_obtained: '', instutution: '', notes: '' })

    // Return form
    return (
        <DegreeForm initialValues={formValues} isEditing={false} ID={null} enableReinitialize>
            {"Add Degree"}
        </DegreeForm>
    );
}

// Export CreateDegree Component
export default CreateDegree;