// DocumentTableRow for each DocumentList row

// Import modules
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

// DocumentTableRow Component
const DocumentTableRow = (props) => {

	// Define table row variables
	var { ID, last_name, first_name, name, link, upload_date, notes } = props.obj;

	// Remove timestamp from upload_date
	upload_date = upload_date.substring(0, 10);

	// Delete document function
	const deleteDocument = () => {

		// Confirmation window
		const confirmed = window.confirm("Are you sure you want to delete this document?");

		// Send axios delete request for the specified ID
		if (confirmed) {
			axios.delete("/delete-document/" + ID)
				.then((res) => {
					if (res.status === 200) {
						alert("Document successfully deleted!");
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
			<td>{upload_date}</td>
			<td id="link-row">{link}</td>
			<td id="action-row">	
				<Link to={`/document-profile/${ID}`} id="table-button" class="btn btn-primary btn-sm" role="button">View & Edit</Link>
				<Button className="table-button" onClick={deleteDocument} size="sm" variant="danger">Delete</Button>
			</td>
			<td className="hidden">{ID}</td>
		</tr>
	);
};

// Export DocumentTableRow Component
export default DocumentTableRow;