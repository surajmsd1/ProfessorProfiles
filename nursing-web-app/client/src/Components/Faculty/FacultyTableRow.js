// FacultyTableRow for each FacultyList row

// Import modules
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

// FacultyTableRow Component
const FacultyTableRow = (props) => {

	// Define table row variables
	var { ID, first_name, last_name, otterbein_ID, highest_degree, hire_date, status, last_year_taught } = props.obj;

	// Remove timestamp from hire_date
	hire_date = hire_date.substring(0, 10);

	// Determine if faculty is active or inactive
	var year = new Date().getFullYear();
	if (year - parseInt(last_year_taught) < 2)
		status = "Active";
	else
		status = "Inactive";

	// Delete faculty function
	const deleteFaculty = () => {

		// Confirmation window
		const confirmed = window.confirm("Are you sure you want to delete this faculty?");

		// Send axios delete request for the specified ID
		if (confirmed) {
			axios.delete("/delete-faculty/" + ID)
				.then((res) => {
					if (res.status === 200) {
						alert("Faculty successfully deleted!");
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
			<td>{last_name}</td>
			<td>{first_name}</td>
			<td>{otterbein_ID}</td>
			<td>{highest_degree}</td>
			<td>{hire_date}</td>
			<td>{status}</td>
			<td id="action-row">
				<Link to={`/faculty-profile/${ID}`} id="table-button" class="btn btn-primary btn-sm" role="button">View & Edit</Link>
				<Button className="table-button" onClick={deleteFaculty} size="sm" variant="danger">Delete</Button>
			</td>
			<td className="hidden">{ID}</td>
		</tr>
	);
};

// Export FacultyTableRow Component
export default FacultyTableRow;