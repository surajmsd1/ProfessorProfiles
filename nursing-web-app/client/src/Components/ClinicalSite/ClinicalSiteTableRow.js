// ClinicalSiteTableRow for each ClinicalSiteList row

// Import modules
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

// ClinicalSiteTableRow Component
const ClinicalSiteTableRow = (props) => {

	// Define table row variables
	var { ID, name, address, city, state, notes } = props.obj;

	// Delete clinical site function
	const deleteClinicalSite = () => {

		// Confirmation window
		const confirmed = window.confirm("Are you sure you want to delete this clinical site?");

		// Send axios delete request for the specified ID
		if (confirmed) {
			axios.delete("/delete-clinicalsite/" + ID)
				.then((res) => {
					if (res.status === 200) {
						alert("Clinical Site successfully deleted!");
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
			<td>{name}</td>
			<td>{address}</td>
			<td>{city}</td>
			<td>{state}</td>
			<td id="action-row">
				<Link to={`/clinicalsite-profile/${ID}`} id="table-button" class="btn btn-primary btn-sm" role="button">View & Edit</Link>
				<Button className="table-button" onClick={deleteClinicalSite} size="sm" variant="danger">Delete</Button>
			</td>
			<td className="hidden">{ID}</td>
		</tr>
	);
};

// Export ClinicalSiteTableRow Component
export default ClinicalSiteTableRow;