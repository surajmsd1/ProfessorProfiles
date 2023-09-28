// CreateSection Component for adding new course

// Import modules
import React, { useState } from "react";
import SectionForm from "./SectionForm";

// CreateSection Component
const CreateSection = () => {

    // Define initial blank form values
    const [formValues, setFormValues] =
        useState({ course_ID: '', faculty_ID: '', section_ID: '', semester: '', year: '', clinical_site_ID: '', notes: '' })

    // Return form
    return (
        <SectionForm initialValues={formValues} isEditing={false} ID={null} enableReinitialize>
            {"Add Section"}
        </SectionForm>
    );
}

// Export CreateSection Component
export default CreateSection;