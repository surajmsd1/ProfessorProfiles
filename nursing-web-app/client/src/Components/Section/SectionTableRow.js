// SectionTableRow for each SectionList row

// Import modules
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

// SectionTableRow Component
const SectionTableRow = (props) => {

	// Define table row variables
	var { ID, course_ID, last_name, first_name, section_ID, semester, year, name, notes } = props.obj;

	var clinical_site = name;

	// Replace int values with semester
	if (semester === 1) { semester = "Spring"; }
	else if (semester === 2) { semester = "Summer"; }
	else if (semester === 3) { semester = "Fall"; }
	else { semester = "Winter"; }

	// Delete section function
	const deleteSection = () => {

		// Confirmation window
		const confirmed = window.confirm("Are you sure you want to delete this section?");

		// Send axios delete request for the specified ID
		if (confirmed) {
			axios.delete("/delete-section/" + ID)
				.then((res) => {
					if (res.status === 200) {
						alert("Section successfully deleted!");
						window.location.reload();
					}
					else Promise.reject();
				})
				.catch((err) => alert("Something went wrong")
			);
		}		
	};

	// Return table row fields
	return (
		<tr>
			<td>{course_ID}</td>
			<td>{last_name}</td>
			<td>{first_name}</td>
			<td>{section_ID}</td>
			<td>{semester}</td>
			<td>{year}</td>
			<td>{clinical_site}</td>
			<td id="action-row">
				<Link to={`/section-profile/${ID}`} id="table-button" class="btn btn-primary btn-sm" role="button">View & Edit</Link>
				<Button className="table-button" onClick={deleteSection} size="sm" variant="danger">Delete</Button>
			</td>
			<td className="hidden">{ID}</td>
		</tr>
	);
};

// Export SectionTableRow Component
export default SectionTableRow;