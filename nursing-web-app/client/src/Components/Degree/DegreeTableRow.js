// DegreeTableRow for each DegreeList row

// Import modules
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

// DegreeTableRow Component
const DegreeTableRow = (props) => {

	// Define table row variables
	var { ID, last_name, first_name, name, description, date_obtained, institution, notes } = props.obj;

	// Remove timestamp from date_obtained
	date_obtained = date_obtained.substring(0, 10);

	// Delete degree function
	const deleteDegree = () => {

		// Confirmation window
		const confirmed = window.confirm("Are you sure you want to delete this degree?");

		// Send axios delete request for the specified ID
		if (confirmed) {
			axios.delete("/delete-degree/" + ID)
				.then((res) => {
					if (res.status === 200) {
						alert("Degree successfully deleted!");
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
			<td>{name}</td>
			<td>{description}</td>
			<td>{date_obtained}</td>
			<td>{institution}</td>
			<td id="action-row">
				<Link to={`/degree-profile/${ID}`} id="table-button" class="btn btn-primary btn-sm" role="button">View & Edit</Link>
				<Button className="table-button" onClick={deleteDegree} size="sm" variant="danger">Delete</Button>
			</td>
			<td className="hidden">{ID}</td>
		</tr>
	);
};

// Export DegreeTableRow Component
export default DegreeTableRow;