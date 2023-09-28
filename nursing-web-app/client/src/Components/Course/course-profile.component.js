// CourseProfile for viewing a selected course

// Import modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import CourseForm from "./CourseForm";
import CourseDisplay from "./CourseDisplay";
import { useParams } from "react-router-dom";

// CourseProfile Component
const CourseProfile = () => {

    const [profile, setProfile] = useState([]); // Store current profile
    const { ID } = useParams(); // Store ID of current course
    const [isEditing, setIsEditing] = useState(false); // Store current editing mode

    // Load data from server and reinitialize profile
    useEffect(() => {
        axios.get("/course-profile/" + ID)
            .then(response => {
                setProfile(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, [ID]);

    // Set editing mode to true
    const handleEdit = () => { setIsEditing(true); }

    // Set editing mode to false, and get new updated course data after edit
    const handleCancelEdit = () => {
        setIsEditing(false);
        axios.get("/course-profile/" + ID)
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
                <CourseForm initialValues={profile} isEditing={isEditing} ID={ID} enableReinitialize>
                    {"Update Course"}
                </CourseForm>
            ) : (
                <CourseDisplay profile={profile}></CourseDisplay>
            )}
        </div>
    );
};

// Export CourseProfile Component
export default CourseProfile;