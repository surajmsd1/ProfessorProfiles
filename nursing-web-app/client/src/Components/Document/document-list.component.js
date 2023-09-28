// DocumentList for viewing all existing documents

// Import modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import DocumentTableRow from "./DocumentTableRow";

// DocumentList Component
const DocumentList = () => {

	const [document, setDocument] = useState([]);
	const [searchTerm, setSearchTerm] = useState(''); // Search box term
	const [transcriptFilter, setTranscriptFilter] = useState(false); // Transcript type filter
	const [resumeFilter, setResumeFilter] = useState(false); // Resume type filter
	const [exemptionFilter, setExemptionFilter] = useState(false); // Exemption type filter
	const [filteredDocument, setFilteredDocument] = useState([]); // Document list based on current filters
	const [sortOrder, setSortOrder] = useState({ // Column sort fields
		first_name: null,
		last_name: null,
		name: null,
		upload_date: null
	});
	const [sortedColumn, setSortedColumn] = useState(""); // Column currently sorting by

	// Send axios request for document list query
	useEffect(() => {
		axios
			.get("/document-list")
			.then(({ data }) => {
				setDocument(data);
				setFilteredDocument(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	// Handles all searching and filter cases
	useEffect(() => {

		// Filter by search term
		let filtered = document.filter((item) => {
			return (
				item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				item.last_name.toLowerCase().includes(searchTerm.toLowerCase())
			);
		});

		// Filter by selected document types
		const documentTypes = [];
		if (transcriptFilter) { documentTypes.push("Transcript"); }
		if (resumeFilter) { documentTypes.push("Resume"); }
		if (exemptionFilter) { documentTypes.push("Exemption Letter"); }

		if (documentTypes.length > 0) {
			filtered = filtered.filter((item) => {
				return documentTypes.includes(item.name);
			});
		}

		// Update document list to filtered document
		setFilteredDocument(filtered);
	}, [document, searchTerm, transcriptFilter, resumeFilter, exemptionFilter]);

	// Handle sort for given column, asc or desc
	const handleSort = (sortColumn) => {
		const newSortOrder = { ...sortOrder };
		if (newSortOrder[sortColumn] === "asc") {
			newSortOrder[sortColumn] = "desc";
			setFilteredDocument((prev) =>
				[...prev].sort((a, b) => (b[sortColumn] < a[sortColumn] ? -1 : 1))
			);
		} else {
			newSortOrder[sortColumn] = "asc";
			setFilteredDocument((prev) =>
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
		return filteredDocument.map((res, i) => {
			return <DocumentTableRow obj={res} key={i} />;
		});
	};

	// Return list with filters and sortable columns
	return (
		<>
			<h1>Document List</h1>
			<input type="text" className="search-bar" placeholder="Search name" onChange={(e) => setSearchTerm(e.target.value)} />
			<div className="filters">
				<label>
					Transcript:&nbsp;
					<input type="checkbox" className="filter-box" checked={transcriptFilter} onChange={() => setTranscriptFilter(!transcriptFilter)} />
				</label>
				<label>
					Resume:&nbsp;
					<input type="checkbox" className="filter-box" checked={resumeFilter} onChange={() => setResumeFilter(!resumeFilter)} />
				</label>
				<label>
					Exemption Letter:&nbsp;
					<input type="checkbox" className="filter-box" checked={exemptionFilter} onChange={() => setExemptionFilter(!exemptionFilter)} />
				</label>
			</div>
			<div className="table-wrapper">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th onClick={() => handleSort("last_name")}> {getColumnTitle("last_name")} </th>
							<th onClick={() => handleSort("first_name")}> {getColumnTitle("first_name")} </th>
							<th onClick={() => handleSort("name")}> {getColumnTitle("name")} </th>
							<th onClick={() => handleSort("upload_date")}> {getColumnTitle("upload_date")} </th>
							<th>LINK</th>
							<th>ACTION</th>
						</tr>
					</thead>
					<tbody>{DataTable()}</tbody>
				</Table>
			</div>
		</>
	);
};

// Export DocumentList Component
export default DocumentList;