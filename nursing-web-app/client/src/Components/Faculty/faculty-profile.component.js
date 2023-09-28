// FacultyProfile for viewing a selected faculty

// Import modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import FacultyForm from "./FacultyForm";
import FacultyDisplay from "./FacultyDisplay";
import { useParams } from "react-router-dom";

// FacultyProfile Component
const FacultyProfile = () => {

    const [profile, setProfile] = useState([]); // Store current profile
    const { ID } = useParams(); // Store ID of current faculty
    const [isEditing, setIsEditing] = useState(false); // Store current editing mode

    // Load data from server and reinitialize profile
    useEffect(() => {
        axios.get("/faculty-profile/" + ID)
            .then(response => {
                setProfile(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [ID]);

    // Set editing mode to true
    const handleEdit = () => { setIsEditing(true); }

    // Set editing mode to false, and get new updated faculty data after edit
    const handleCancelEdit = () => {
        setIsEditing(false);
        axios.get("/faculty-profile/" + ID)
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
                <FacultyForm initialValues={profile} isEditing={isEditing} ID={ID} enableReinitialize>
                    {"Update Faculty"}
                </FacultyForm>
            ) : (
                <FacultyDisplay profile={profile}></FacultyDisplay>
            )}
        </div>
    );
};

// Export FacultyProfile Component
export default FacultyProfile;