// CourseTableRow for each CourseList row

// Import modules
import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

// CourseTableRow Component
const CourseTableRow = (props) => {

	// Define table row variables
	var { ID, name, course_ID, notes } = props.obj;

	// Delete course function
	const deleteCourse = () => {

		// Confirmation window
		const confirmed = window.confirm("Are you sure you want to delete this course?");

		// Send axios delete request for the specified ID
		if (confirmed) {
			axios.delete("/delete-course/" + ID)
				.then((res) => {
					if (res.status === 200) {
						alert("Course successfully deleted!");
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
			<td>{course_ID}</td>
			<td id="action-row">
				<Link to={`/course-profile/${ID}`} id="table-button" class="btn btn-primary btn-sm" role="button">View & Edit</Link>
				<Button className="table-button" onClick={deleteCourse} size="sm" variant="danger">Delete</Button>
			</td>
			<td className="hidden">{ID}</td>
		</tr>
	);
};

// Export CourseTableRow Component
export default CourseTableRow;