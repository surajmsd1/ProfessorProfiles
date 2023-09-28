// CourseList for viewing all existing courses

// Import modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import CourseTableRow from "./CourseTableRow";

// CourseList Component
const CourseList = () => {

	const [course, setCourse] = useState([]);
	const [searchTerm, setSearchTerm] = useState(''); // Search box term
	const [filteredCourse, setFilteredCourse] = useState([]); // Course list based on current filters
	const [sortOrder, setSortOrder] = useState({ // Column sort fields
		course_ID: null
	});
	const [sortedColumn, setSortedColumn] = useState(""); // Column currently sorting by

	// Send axios request for course list query
	useEffect(() => {
		axios
			.get("/course-list")
			.then(({ data }) => {
				setCourse(data);
				setFilteredCourse(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// Handles all searching and filter cases
	useEffect(() => {

		// Filter by search term
		let filtered = course.filter((item) => {
			return (
				item.course_ID.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});

		// Updated course list to filtered faculty
		setFilteredCourse(filtered);
	}, [course, searchTerm]);

	// Handle sort for given column, asc or desc
	const handleSort = (sortColumn) => {

		const newSortOrder = { ...sortOrder };

		if (newSortOrder[sortColumn] === "asc") {
			newSortOrder[sortColumn] = "desc";
			setFilteredCourse((prev) =>
				[...prev].sort((a, b) => (b[sortColumn] < a[sortColumn] ? -1 : 1))
			);
		} else {
			newSortOrder[sortColumn] = "asc";
			setFilteredCourse((prev) =>
				[...prev].sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))
			);
		}

		// Switch sort order and implement sort
		setSortOrder(newSortOrder);
		setSortedColumn(sortColumn);
	};

	// Add the asc or desc arrow in the column header
	const getColumnTitle = (sortColumn) => {
		if (sortedColumn === sortColumn) {
			return `${sortColumn.replace("_", " ").toUpperCase()} ${sortOrder[sortColumn] === "asc" ? "▲" : "▼"}`;
		} else {
			return sortColumn.replace("_", " ").toUpperCase();
		}
	};

	// Define DataTable for the current list
	const DataTable = () => {
		return filteredCourse.map((res, i) => {
			return <CourseTableRow obj={res} key={i} />;
		});
	};

	// Return list with filters and sortable columns
	return (
		<>
			<h1>Course List</h1>
			<input type="text" className="search-bar" placeholder="Search course code" onChange={(e) => setSearchTerm(e.target.value)} />
			<div className="filters"></div>
			<div className="table-wrapper">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>COURSE NAME</th>
							<th onClick={() => handleSort("course_ID")}> {getColumnTitle("course_ID")} </th>
							<th>ACTION</th>
						</tr>
					</thead>
					<tbody>{DataTable()}</tbody>
				</Table>
			</div>
		</>
	);
};

// Export CourseList Component
export default CourseList;