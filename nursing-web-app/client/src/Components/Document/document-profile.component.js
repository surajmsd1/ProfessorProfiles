// DocumentProfile for viewing a selected document

// Import modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import DocumentForm from "./DocumentForm";
import DocumentDisplay from "./DocumentDisplay";
import { useParams } from "react-router-dom";

// DocumentProfile Component
const DocumentProfile = () => {

    const [profile, setProfile] = useState([]); // Store current profile
    const { ID } = useParams(); // Store ID of current faculty
    const [isEditing, setIsEditing] = useState(false); // Store current editing mode

    // Load data from server and reinitialize profile
    useEffect(() => {
        axios.get("/document-profile/" + ID)
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
        axios.get("/document-profile/" + ID)
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
                <DocumentForm initialValues={profile} isEditing={isEditing} ID={ID} enableReinitialize>
                    {"Update Document"}
                </DocumentForm>
            ) : (
                <DocumentDisplay profile={profile}></DocumentDisplay>
            )}
        </div>            
    );
};

// Export DocumentProfile Component
export default DocumentProfile;