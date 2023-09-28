// SectionDisplay for displaying section profile information

// Import modules
import React, { useState, useEffect } from "react";
import { FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

// SectionDisplay Component
const SectionDisplay = ({ profile }) => {

    // Define profile variables
    var { ID, course_ID, faculty_ID, section_ID, semester, year, clinical_site_ID, notes} = profile || {};

    // Replace int values with semester
    if (semester === 1) semester = "Spring";
    else if (semester === 2) semester = "Summer";
    else if (semester === 3) semester = "Fall";
    else if (semester === 4) semester = "Winter";

    // Define and pull course list, faculty list, and clinical site list
    const [courseList, setCourseList] = useState([]);
    const [facultyList, setFacultyList] = useState([]);
    const [clinicalSiteList, setClinicalSiteList] = useState([]);

    useEffect(() => {
        axios
            .get("/course-list")
            .then(({ data }) => {
                setCourseList(data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get("/faculty-list")
            .then(({ data }) => {
                setFacultyList(data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get("/clinicalsite-list")
            .then(({ data }) => {
                setClinicalSiteList(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Return course ID based on the selected section course.ID
    const getCourseID = (courseID) => {
        const course = courseList.find((c) => c.ID === courseID);
        return course ? `${course.course_ID}` : "";
    };

    // Return faculty name based on the selected section faculty.ID
    const getFacultyName = (facultyID) => {
        const faculty = facultyList.find((f) => f.ID === facultyID);
        return faculty ? `${faculty.first_name} ${faculty.last_name}` : "";
    };

    // Return clinical site name based on the selected section clinicalSite.ID
    const getClinicalSiteName = (clinicalSiteName) => {
        const clinicalSite = clinicalSiteList.find((cs) => cs.ID === clinicalSiteName);
        return clinicalSite ? `${clinicalSite.name}` : "";
    };

    // Return readOnly form fields
    return (
        <div>
            <h1>Section Information</h1>
            <FormGroup className="form-group">
                <Label for="course_ID" className="edit-label">Course Code</Label>
                <Input type="text" name="course_ID" id="course_ID" className="edit-element"
                    value={getCourseID(course_ID)} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="faculty_ID" className="edit-label">Faculty Name</Label>
                <Input type="text" name="faculty_ID" id="faculty_ID" className="edit-element"
                    value={getFacultyName(faculty_ID)} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="section_ID" className="edit-label">Section ID</Label>
                <Input type="text" name="section_ID" id="section_ID" className="edit-element" value={section_ID} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="semester" className="edit-label">Semester</Label>
                <Input type="text" name="semester" id="semester" className="edit-element" value={semester} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="year" className="edit-label">Year</Label>
                <Input type="year" name="year" id="year" className="edit-element" value={year} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="clinical_site_ID" className="edit-label">Clinical Site</Label>
                <Input type="text" name="clinical_site_ID" id="clinical_site_ID" className="edit-element"
                    value={getClinicalSiteName(clinical_site_ID)} readOnly />
            </FormGroup>
            <FormGroup className="form-group">
                <Label for="notes" className="edit-label">Notes</Label>
                <Input type="textarea" name="notes" id="notes" className="edit-element" value={notes} readOnly />
            </FormGroup>
        </div>
    );
};

// Export SectionDisplay Component
export default SectionDisplay;