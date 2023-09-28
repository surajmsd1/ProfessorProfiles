// CreateCourse Component for adding new courses

// Import modules
import React, { useState } from "react";
import CourseForm from "./CourseForm";

// CreateCourse Component
const CreateCourse = () => {

    // Define initial blank form values
    const [formValues, setFormValues] =
        useState({ name: '', course_ID: '', notes: '' });

    // Return form
    return (
        <CourseForm initialValues={formValues} isEditing={false} ID={null} enableReinitialize>
            {"Create Course"}
        </CourseForm>
    );
}

// Export CreateCourse Component
export default CreateCourse;