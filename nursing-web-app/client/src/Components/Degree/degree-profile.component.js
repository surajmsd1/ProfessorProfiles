// DegreeProfile for viewing a selected degree

// Import modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import DegreeForm from "./DegreeForm";
import DegreeDisplay from "./DegreeDisplay";
import { useParams } from "react-router-dom";

// DegreeProfile Component
const DegreeProfile = () => {

    const [profile, setProfile] = useState([]); // Store current profile
    const { ID } = useParams(); // Store ID of current degree
    const [isEditing, setIsEditing] = useState(false); // Store current editing mode

    // Load data from server and reinitialize profile
    useEffect(() => {
        axios.get("/degree-profile/" + ID)
            .then(response => {
                setProfile(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [ID]);

    // Set editing mode to true
    const handleEdit = () => { setIsEditing(true); }

    // Set editing mode to false, and get new updated degree data after edit
    const handleCancelEdit = () => {
        setIsEditing(false);
        axios.get("/degree-profile/" + ID)
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
                <DegreeForm initialValues={profile} isEditing={isEditing} ID={ID} enableReinitialize>
                    {"Update Degree"}
                </DegreeForm>
            ) : (
                <DegreeDisplay profile={profile}></DegreeDisplay>
            )}
        </div>
    );
};

// Export DegreeProfile Component
export default DegreeProfile;