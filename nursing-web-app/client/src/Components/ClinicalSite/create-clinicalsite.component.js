// CreateClinicalSite Component for add new clinical site

// Import Modules
import React, { useState } from "react";
import ClinicalSiteForm from "./ClinicalSiteForm";

// CreateClinicalSite Component
const CreateClinicalSite = () => {

    // Define initial blank form values
    const [formValues, setFormValues] =
        useState({ name: '', address: '', city: '', state: '', country: '', postal_code: '', address_notes: '',
            last_visited: '', last_semester: '', last_year: '', notes: '' })

    // Return form
    return (
        <ClinicalSiteForm initialValues={formValues} isEditing={false} ID={null} enableReinitialize>
            {"Add Clinical Site"}
        </ClinicalSiteForm>
    );
}

// Export CreateClinicalSite Component
export default CreateClinicalSite;