// ClinicalSiteList for viewing all existing faculty

// Import modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import ClinicalSiteTableRow from "./ClinicalSiteTableRow";

// ClinicalSiteList Component
const ClinicalSiteList = () => {

    const [clinicalSite, setClinicalSite] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); // Search box term
    const [filteredClinicalSite, setFilteredClinicalSite] = useState([]); // ClinicalSite list based on current filters
    const [sortOrder, setSortOrder] = useState({ // Column sort fields
        name: null,
        address: null,
        city: null,
        state: null
    });
    const [sortedColumn, setSortedColumn] = useState(""); // Column currently sorting by

    // Send axios request for clinical site list query
    useEffect(() => {
        axios
            .get("/clinicalsite-list")
            .then(({ data }) => {
                setClinicalSite(data);
                setFilteredClinicalSite(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Handles all searching and filter cases
    useEffect(() => {
        let filtered = clinicalSite.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.city.toLowerCase().includes(searchTerm.toLowerCase())
            );
        });

        setFilteredClinicalSite(filtered);
    }, [clinicalSite, searchTerm]);

    // Handle sort for given column, asc or desc
    const handleSort = (sortColumn) => {

        const newSortOrder = { ...sortOrder };
        if (newSortOrder[sortColumn] === "asc") {
            newSortOrder[sortColumn] = "desc";
            setFilteredClinicalSite((prev) =>
                [...prev].sort((a, b) => (b[sortColumn] < a[sortColumn] ? -1 : 1))
            );
        } else {
            newSortOrder[sortColumn] = "asc";
            setFilteredClinicalSite((prev) =>
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
        return filteredClinicalSite.map((res, i) => {
            return <ClinicalSiteTableRow obj={res} key={i} />;
        });
    };

    // Return list with filters and sortable columns
    return (
        <>
            <h1>Clinical Site List</h1>
            <input type="text" className="search-bar" placeholder="Search name, address, or city" onChange={(e) => setSearchTerm(e.target.value)} />
            <div className="filters"></div>
            <div className="table-wrapper">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort("name")}> {getColumnTitle("name")} </th>
                            <th onClick={() => handleSort("address")}> {getColumnTitle("address")} </th>
                            <th onClick={() => handleSort("city")}> {getColumnTitle("city")} </th>
                            <th onClick={() => handleSort("state")}> {getColumnTitle("state")} </th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>{DataTable()}</tbody>
                </Table>
            </div>
        </>
    );
};

// Export ClinicalSiteList Component
export default ClinicalSiteList;