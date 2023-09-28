// DegreeList for viewing all existing degrees

// Import modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import DegreeTableRow from "./DegreeTableRow";

// DegreeList Component
const DegreeList = () => {

	const [degree, setDegree] = useState([]);
	const [searchTerm, setSearchTerm] = useState(''); // Search box term
	const [filteredDegree, setFilteredDegree] = useState([]); // Degree list based on current filters
	const [sortOrder, setSortOrder] = useState({ // Column sort fields
		first_name: null,
		last_name: null,
		date_obtained: null
	});
	const [sortedColumn, setSortedColumn] = useState(""); // Column currently sorting by
	const [bsnFilter, setBsnFilter] = useState(false); // BSN degree filter
	const [msnFilter, setMsnFilter] = useState(false); // MSN degree filter
	const [dnpFilter, setDnpFilter] = useState(false); // DNP degree filter
	const [phdFilter, setPhdFilter] = useState(false); // PhD degree filter
	const [otherFilter, setOtherFilter] = useState(false); // Other degree filter

	// Send axios request for degree list query
	useEffect(() => {
		axios
			.get("/degree-list")
			.then(({ data }) => {
				setDegree(data);
				setFilteredDegree(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// Handles all searching and filter cases
	useEffect(() => {

		// Filter by search term
		let filtered = degree.filter((item) => {
			return (
				item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				(item.institution?.toLowerCase() ?? "").includes(searchTerm.toLowerCase())
			);
		});

		// Filter by selected degree types
		const degreeTypes = [];
		if (bsnFilter) { degreeTypes.push("BSN"); }
		if (msnFilter) { degreeTypes.push("MSN"); }
		if (dnpFilter) { degreeTypes.push("DNP"); }
		if (phdFilter) { degreeTypes.push("PhD"); }
		if (otherFilter) { degreeTypes.push("Other"); }

		if (degreeTypes.length > 0) {
			filtered = filtered.filter((item) => {
				return degreeTypes.includes(item.name);
			});
		}

		// Update degree list to filtered degrees
		setFilteredDegree(filtered);
	}, [degree, searchTerm, bsnFilter, msnFilter, dnpFilter, phdFilter, otherFilter]);

	// Handle sort for given column, asc or desc
	const handleSort = (sortColumn) => {

		const newSortOrder = { ...sortOrder };

		if (newSortOrder[sortColumn] === "asc") {
			newSortOrder[sortColumn] = "desc";
			setFilteredDegree((prev) =>
				[...prev].sort((a, b) => (b[sortColumn] < a[sortColumn] ? -1 : 1))
			);
		} else {
			newSortOrder[sortColumn] = "asc";
			setFilteredDegree((prev) =>
				[...prev].sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))
			);
		}

		// Switch sort order and implemnet sort
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
		return filteredDegree.map((res, i) => {
			return <DegreeTableRow obj={res} key={i} />;
		});
	};

	// Return list with filters and sortable columns
	return (
		<>
			<h1>Degree List</h1>
			<input type="text" className="search-bar" placeholder="Search name or institution" onChange={(e) => setSearchTerm(e.target.value)} />
			<div className="filters">
				<label>
					BSN:&nbsp;
					<input type="checkbox" className="filter-box" checked={bsnFilter} onChange={() => setBsnFilter(!bsnFilter)} />
				</label>
				<label>
					MSN:&nbsp;
					<input type="checkbox" className="filter-box" checked={msnFilter} onChange={() => setMsnFilter(!msnFilter)} />
				</label>
				<label>
					DNP:&nbsp;
					<input type="checkbox" className="filter-box" checked={dnpFilter} onChange={() => setDnpFilter(!dnpFilter)} />
				</label>
				<label>
					PhD:&nbsp;
					<input type="checkbox" className="filter-box" checked={phdFilter} onChange={() => setPhdFilter(!phdFilter)} />
				</label>
				<label>
					Other:&nbsp;
					<input type="checkbox" className="filter-box" checked={otherFilter} onChange={() => setOtherFilter(!otherFilter)} />
				</label>
			</div>
			<div className="table-wrapper">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th onClick={() => handleSort("last_name")}> {getColumnTitle("last_name")} </th>
							<th onClick={() => handleSort("first_name")}> {getColumnTitle("first_name")} </th>
							<th>DEGREE TYPE</th>
							<th>DESCRIPTION</th>
							<th onClick={() => handleSort("date_obtained")}> {getColumnTitle("date_obtained")} </th>
							<th>INSTITUTION</th>
							<th>ACTION</th>
						</tr>
					</thead>
					<tbody>{DataTable()}</tbody>
				</Table>
			</div>
		</>
	);
};

// Export DegreeList Component
export default DegreeList;