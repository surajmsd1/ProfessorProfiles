// FacultyList for viewing all existing faculty

// Import modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import FacultyTableRow from "./FacultyTableRow";

// FacultyList Component
const FacultyList = () => {

    const [faculty, setFaculty] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Search box term
    const [activeFilter, setActiveFilter] = useState(false); // Active faculty filter
    const [inactiveFilter, setInactiveFilter] = useState(false); // Inactive faculty filter
    const [filteredFaculty, setFilteredFaculty] = useState([]); // Faculty list based on current filters
    const [sortOrder, setSortOrder] = useState({ // Column sort fields
        first_name: null,
        last_name: null,
        highest_degree: null,
        hire_date: null
    });
    const [sortedColumn, setSortedColumn] = useState(""); // Column currently sorting by
    const [bsnFilter, setBsnFilter] = useState(false); // BSN degree filter
    const [msnFilter, setMsnFilter] = useState(false); // MSN degree filter
    const [dnpFilter, setDnpFilter] = useState(false); // DNP degree filter
    const [phdFilter, setPhdFilter] = useState(false); // PhD degree filter
    const [otherFilter, setOtherFilter] = useState(false); // Other degree filter
    const [naFilter, setNaFilter] = useState(false); // No degree filter

    // Send axios request for faculty list query
    useEffect(() => {
        axios
            .get("/faculty-list")
            .then(({ data }) => {
                setFaculty(data);
                setFilteredFaculty(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Handles all searching and filter cases
    useEffect(() => {

        // Filter by search term
        let filtered = faculty.filter((item) => {
            return (
                item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.otterbein_ID.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        // Filter by active faculty
        if (activeFilter) {
            filtered = filtered.filter((item) => {
                return item.status === 1;
            });
        }

        // Filter by inactive faculty
        if (inactiveFilter) {
            filtered = filtered.filter((item) => {
                return item.status === 0;
            });
        }

        // Filter by selected degree types
        const degreeTypes = [];
        if (bsnFilter) { degreeTypes.push("BSN"); }
        if (msnFilter) { degreeTypes.push("MSN"); }
        if (dnpFilter) { degreeTypes.push("DNP"); }
        if (phdFilter) { degreeTypes.push("PhD"); }
        if (otherFilter) { degreeTypes.push("Other"); }
        if (naFilter) { degreeTypes.push("N/A"); }

        if (degreeTypes.length > 0) {
            filtered = filtered.filter((item) => {
                return degreeTypes.includes(item.highest_degree);
            });
        }

        // Update faculty list to filtered faculty
        setFilteredFaculty(filtered);
    }, [faculty, searchTerm, activeFilter, inactiveFilter, bsnFilter, msnFilter, dnpFilter, phdFilter, otherFilter, naFilter]);

    // Handle sort for given column, asc or desc
    const handleSort = (sortColumn) => {

        const newSortOrder = { ...sortOrder };

        // highest_degree has custom hierarchy, not alphabetical
        if (sortColumn === 'highest_degree') {
            const degreeOrder = ["N/A", "Other", "BSN", "MSN", "DNP", "PhD"];
            setFilteredFaculty((prev) =>
                [...prev].sort((a, b) =>
                    degreeOrder.indexOf(a[sortColumn]) - degreeOrder.indexOf(b[sortColumn])
                )
            );
        } else { // Sort all other columns by asc or desc
            if (newSortOrder[sortColumn] === "asc") {
                newSortOrder[sortColumn] = "desc";
                setFilteredFaculty((prev) =>
                    [...prev].sort((a, b) => (b[sortColumn] < a[sortColumn] ? -1 : 1))
                );
            } else {
                newSortOrder[sortColumn] = "asc";
                setFilteredFaculty((prev) =>
                    [...prev].sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))
                );
            }
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
        return filteredFaculty.map((res, i) => {
            return <FacultyTableRow obj={res} key={i} />;
        });
    };

    // Return list with filters and sortable columns
    return (
        <>
            <h1>Faculty List</h1>
            <input type="text" className="search-bar" placeholder="Search name or Otterbein ID" onChange={(e) => setSearchTerm(e.target.value)} />
            <div className="filters">
                <label>
                    Active:&nbsp;
                    <input type="checkbox" className="filter-box" checked={activeFilter} onChange={() => setActiveFilter(!activeFilter)} />
                </label>
                <label>
                    Inactive:&nbsp;
                    <input type="checkbox" className="filter-box" checked={inactiveFilter} onChange={() => setInactiveFilter(!inactiveFilter)} />
                </label>
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
                <label>
                    N/A:&nbsp;
                    <input type="checkbox" className="filter-box" checked={naFilter} onChange={() => setNaFilter(!naFilter)} />
                </label>
            </div>
            <div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("last_name")}> {getColumnTitle("last_name")} </th>
                            <th onClick={() => handleSort("first_name")}> {getColumnTitle("first_name")} </th>
                            <th>OTTERBEIN ID</th>
                            <th onClick={() => handleSort("highest_degree")}> {getColumnTitle("highest_degree")} </th>
                            <th onClick={() => handleSort("hire_date")}> {getColumnTitle("hire_date")} </th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>{DataTable()}</tbody>
                </Table>
            </div>
        </>
    );
};

// Export FacultyList Component
export default FacultyList;