// SectionProfile for viewing a selected section

// Import modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import SectionForm from "./SectionForm";
import SectionDisplay from "./SectionDisplay";
import { useParams } from "react-router-dom";

// SectionProfile Component
const SectionProfile = () => {

    const [profile, setProfile] = useState([]); // Store current profile
    const { ID } = useParams(); // Store ID of current section
    const [isEditing, setIsEditing] = useState(false); // Store current editing mode

    // Load data from server and reinitialize profile
    useEffect(() => {
        axios.get("/section-profile/" + ID)
            .then(response => {
                setProfile(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [ID]);

    // Set editing mode to true
    const handleEdit = () => { setIsEditing(true); }

    // Set editing mode to false, and get new updated section after edit
    const handleCancelEdit = () => {
        setIsEditing(false);
        axios.get("/section-profile/" + ID)
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
                <SectionForm initialValues={profile} isEditing={isEditing} ID={ID} enableReinitialize>
                    {"Update Section"}
                </SectionForm>
            ) : (
                <SectionDisplay profile={profile}></SectionDisplay>
            )}
        </div>
    );
};

// Export SectionProfile Component
export default SectionProfile;