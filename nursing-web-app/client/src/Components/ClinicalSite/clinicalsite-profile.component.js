// ClinicalSiteProfile for viewing a selected clinical site

// Import modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import ClinicalSiteForm from "./ClinicalSiteForm";
import ClinicalSiteDisplay from "./ClinicalSiteDisplay";
import { useParams } from "react-router-dom";

// ClinicalSiteProfile Component
const ClinicalSiteProfile = () => {

    const [profile, setProfile] = useState([]); // Store current profile
    const { ID } = useParams(); // Store ID of current clinical site
    const [isEditing, setIsEditing] = useState(false); // Store current editing mode

    // Load data from server and reinitialize profile
    useEffect(() => {
        axios.get("/clinicalsite-profile/" + ID)
            .then(response => {
                setProfile(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [ID]);

    // Set editing mode to true
    const handleEdit = () => { setIsEditing(true); }

    // Set editing mode to false, and get new updated clinical site data after edit
    const handleCancelEdit = () => {
        setIsEditing(false);
        axios.get("/clinicalsite-profile/" + ID)
            .then(response => { setProfile(response.data); })
            .catch(err => {
                console.log(err);
            });
    };

    // Return Form or Display depending on edit mode
    return (
        <div>
            <Button className="edit-button" variant="primary" size="lg" block="block" type="primary"
                onClick={isEditing ? handleCancelEdit : handleEdit}>{isEditing ? "Cancel Edit" : "Edit Information"}</Button>
            <br /><br />
            {isEditing ? (
                <ClinicalSiteForm initialValues={profile} isEditing={isEditing} ID={ID} enableReinitialize>
                    {"Update Clinical Site"}
                </ClinicalSiteForm>
            ) : (
                <ClinicalSiteDisplay profile={profile}></ClinicalSiteDisplay>
            )}
        </div>
    );
};

// Export ClinicalSiteProfile Component
export default ClinicalSiteProfile;