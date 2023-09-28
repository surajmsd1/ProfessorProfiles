// SectionList for viewing all existing sections

// Import modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import SectionTableRow from "./SectionTableRow";

// SectionList Component
const SectionList = () => {

	const [section, setSection] = useState([]);
	const [searchTerm, setSearchTerm] = useState(''); // Search box term
	const [filteredSection, setFilteredSection] = useState([]); // Section list based on current filters
	const [sortOrder, setSortOrder] = useState({ // Column sort fields
		course_ID: null,
		last_name: null,
		first_name: null,
		section_ID: null,
		semester: null,
		year: null,
		clinical_site: null
	});
	const [sortedColumn, setSortedColumn] = useState(""); // Column currently sorting by
	const [springFilter, setSpringFilter] = useState(false); // Spring semester filter
	const [summerFilter, setSummerFilter] = useState(false); // Summer semester filter
	const [fallFilter, setFallFilter] = useState(false); // Fall semester filter
	const [winterFilter, setWinterFilter] = useState(false); // Winter semester filter

	// Send axios request for section list query
	useEffect(() => {
		axios
			.get("/section-list")
			.then(({ data }) => {
				setSection(data);
				setFilteredSection(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// Handles all searching and filter cases
	useEffect(() => {

		// Filter by search term
		let filtered = section.filter((item) => {
			return (
				item.course_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.section_ID.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});

		// Filter by selected semester types
		const semesterTypes = [];
		if (springFilter) { semesterTypes.push(1); }
		if (summerFilter) { semesterTypes.push(2); }
		if (fallFilter) { semesterTypes.push(3); }
		if (winterFilter) { semesterTypes.push(4); }

		if (semesterTypes.length > 0) {
			filtered = filtered.filter((item) => {
				return semesterTypes.includes(item.semester);
			});
        }

		// Update section list to filtered sections
		setFilteredSection(filtered);
	}, [section, searchTerm, springFilter, summerFilter, fallFilter, winterFilter]);

	// Get semester based on given ID for sorting
	const mapSemesterToString = (semester) => {
		switch (semester) {
			case 1: return "Spring";
			case 2: return "Summer";
			case 3: return "Fall";
			case 4: return "Winter";
			default: return "";
		}
	};

	// Handle sort for given column, asc or desc
	const handleSort = (sortColumn) => {

		const newSortOrder = { ...sortOrder };

		// Sort all columns by asc or desc
		if (newSortOrder[sortColumn] === "asc") {
			newSortOrder[sortColumn] = "desc";
			setFilteredSection((prev) =>
				[...prev].sort((a, b) => {

					// semester has custom hierarchy, not alphabetical
					if (sortColumn === "semester") {
						const aSemester = mapSemesterToString(a[sortColumn]);
						const bSemester = mapSemesterToString(b[sortColumn]);
						return bSemester < aSemester ? -1 : 1;
					} else if (sortColumn === "clinical_site") {
						const aName = a.name === null ? "None" : a.name;
						const bName = b.name === null ? "None" : b.name;
						return bName < aName ? -1 : 1;
					} else {
						return b[sortColumn] < a[sortColumn] ? -1 : 1;
					}
				})
			);
		} else {
			newSortOrder[sortColumn] = "asc";
			setFilteredSection((prev) =>
				[...prev].sort((a, b) => {
					if (sortColumn === "semester") {
						const aSemester = mapSemesterToString(a[sortColumn]);
						const bSemester = mapSemesterToString(b[sortColumn]);
						return aSemester < bSemester ? -1 : 1;
					} else if (sortColumn === "clinical_site") {
						const aName = a.name === null ? "None" : a.name;
						const bName = b.name === null ? "None" : b.name;
						return aName < bName ? -1 : 1;
					} else {
						return a[sortColumn] < b[sortColumn] ? -1 : 1;
					}
				})
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
		return filteredSection.map((res, i) => {
			return <SectionTableRow obj={res} key={i} />;
		});
	};

	// Return list with filters and sortable columns
	return (
		<>
			<h1>Section List</h1>
			<input type="text" className="search-bar" placeholder="Search course/section code or faculty/clinical site name"
				onChange={(e) => setSearchTerm(e.target.value)} />
			<div className="filters">
				<label>
					Spring:&nbsp;
					<input type="checkbox" className="filter-box" checked={springFilter} onChange={() => setSpringFilter(!springFilter)} />
				</label>
				<label>
					Summer:&nbsp;
					<input type="checkbox" className="filter-box" checked={summerFilter} onChange={() => setSummerFilter(!summerFilter)} />
				</label>
				<label>
					Fall:&nbsp;
					<input type="checkbox" className="filter-box" checked={fallFilter} onChange={() => setFallFilter(!fallFilter)} />
				</label>
				<label>
					Winter:&nbsp;
					<input type="checkbox" className="filter-box" checked={winterFilter} onChange={() => setWinterFilter(!winterFilter)} />
				</label>
			</div>
			<div className="table-wrapper">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th onClick={() => handleSort("course_ID")}> {getColumnTitle("course_ID")} </th>
							<th onClick={() => handleSort("last_name")}> {getColumnTitle("last_name")} </th>
							<th onClick={() => handleSort("first_name")}> {getColumnTitle("first_name")} </th>
							<th onClick={() => handleSort("section_ID")}> {getColumnTitle("section_ID")} </th>
							<th onClick={() => handleSort("semester")}> {getColumnTitle("semester")} </th>
							<th onClick={() => handleSort("year")}> {getColumnTitle("year")} </th>
							<th onClick={() => handleSort("clinical_site")}> {getColumnTitle("clinical_site")} </th>
							<th>ACTION</th>
						</tr>
					</thead>
					<tbody>{DataTable()}</tbody>
				</Table>
			</div>
		</>
	);
};

// Export SectionList Component
export default SectionList;