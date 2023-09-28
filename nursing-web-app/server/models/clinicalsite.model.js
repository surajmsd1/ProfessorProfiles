// Create SQL variable to communicate with database
const sql = require("../utils/database.js");

// Constructor for Clinical Site and Address object
const ClinicalSite = function (clinicalSite) {
    this.name = clinicalSite.name;
    this.address = clinicalSite.address;
    this.city = clinicalSite.city;
    this.state = clinicalSite.state;
    this.country = clinicalSite.country;
    this.postal_code = clinicalSite.postal_code;
    this.address_notes = clinicalSite.address_notes;
    this.last_visited = clinicalSite.last_visited;
    this.last_semester = clinicalSite.last_semester;
    this.last_year = clinicalSite.last_year;
    this.notes = clinicalSite.notes;
};

// Create and save a new Clinical Site and Address
ClinicalSite.create = (newClinicalSite, result) => {

    // Start building insert Address query
    var address_query = "INSERT INTO address (address, city, state, country, postal_code, address_notes) "
        + "VALUES (?, ?, ?, ?, ?, ?)";

    // Starting building address values array to insert
    var address_values = [newClinicalSite.address, newClinicalSite.city, newClinicalSite.state,
        newClinicalSite.country, newClinicalSite.postal_code, newClinicalSite.address_notes];

    // Execute address query with given values
    sql.query(address_query, address_values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
    });

    // Execute query to obtain ID of newly-added address
    var id_query = "SELECT ID FROM address WHERE address = ? AND city = ? AND state = ? AND postal_code = ?";
    var id_values = [newClinicalSite.address, newClinicalSite.city, newClinicalSite.state, newClinicalSite.postal_code];

    // Execute ID query
    sql.query(id_query, id_values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        var address_ID = res[0].ID;

        // Start building insert Clinical Site query
        var site_query = "INSERT INTO clinical_site (name, address_ID, last_visited, last_semester, last_year, notes) "
            + "VALUES (?, ?, ?, ?, ?, ?)";

        // Check for semester value and parse to Int
        var last_semester = newClinicalSite.last_semester ? parseInt(newClinicalSite.last_semester) : null;

        // Check for year value and parse to Int
        var last_year = newClinicalSite.last_year ? parseInt(newClinicalSite.last_year) : null;

        // Build values array to insert
        var site_values = [newClinicalSite.name, address_ID, newClinicalSite.last_visited, last_semester, last_year, newClinicalSite.notes];

        // Execute clinical site query with given values
        sql.query(site_query, site_values, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newClinicalSite }); // Sends result back to client
        });
    });
};

// Retrieve all existing Clinical Sites from database
ClinicalSite.getAll = result => {

    // Build select query
    let query = "SELECT clinical_site.ID, clinical_site.name, address.address, address.city, address.state, address.postal_code, clinical_site.notes "
        + "FROM clinical_site "
        + "JOIN address on clinical_site.address_ID = address.ID "
        + "WHERE clinical_site.ID > 0";

    // Execute query
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

// Retrieve a Clinical Site with the specified ID
ClinicalSite.view = (ID, result) => {

    // Build select query
    let query = "SELECT clinical_site.ID, clinical_site.name, clinical_site.address_ID, address.address, address.city, address.state, address.country, address.postal_code, address.address_notes, "
        + "clinical_site.last_visited, clinical_site.last_semester, clinical_site.last_year, clinical_site.notes "
        + "FROM clinical_site "
        + "JOIN address on clinical_site.address_ID = address.ID "
        + "WHERE clinical_site.ID = ?";

    // Execute query
    sql.query(query, ID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            result(null, res[0]);
            return;
        }

        // Did not find a Clinical Site with given ID
        result({ kind: "not_found" }, null);
    });
};

// Update a Clinical Site with the specified ID
ClinicalSite.updateById = (ID, updatedClinicalSite, result) => {

    // Build update address query
    var address_query = "UPDATE address SET address = ?, city = ?, state = ?, country = ?, postal_code = ?, address_notes = ? WHERE ID = ?; "

    // Build array of address values to update 
    var address_values = [updatedClinicalSite.address, updatedClinicalSite.city, updatedClinicalSite.state,
    updatedClinicalSite.country, updatedClinicalSite.postal_code, updatedClinicalSite.address_notes, ID];

    // Execute address update query
    sql.query(address_query, address_values, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        // Execute query to obtain ID of updated address
        var id_query = "SELECT ID FROM address WHERE address = ? AND city = ? AND state = ? AND postal_code = ?";
        var id_values = [updatedClinicalSite.address, updatedClinicalSite.city, updatedClinicalSite.state, updatedClinicalSite.postal_code];

        // Execute ID query
        sql.query(id_query, id_values, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            var address_ID = res[0].ID;

            // Build update clinical site query and array of values
            var site_query = "UPDATE clinical_site SET name = ?, address_ID = ?, last_visited = ?, last_semester = ?, last_year = ?, notes = ? WHERE ID = ?; "
            var site_values = [updatedClinicalSite.name, address_ID, updatedClinicalSite.last_visited, updatedClinicalSite.last_semester, updatedClinicalSite.last_year, updatedClinicalSite.notes, ID];

            // Execute clinical site update query
            sql.query(site_query, site_values, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null, { id: ID, ...updatedClinicalSite });
            });
        });
    });
};

// Delete a Clinical Site with the specified ID
ClinicalSite.remove = (ID, result) => {

    // Build and execute query to update the sections that reference the clinical site being deleted
    sql.query("UPDATE course_faculty SET clinical_site_ID = 0 WHERE clinical_site_ID = ?", ID, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        // Build and execute query to retrieve the clinical_site.address_ID
        sql.query("SELECT address_ID FROM clinical_site WHERE ID = ?", ID, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            // Retrieve the address.ID from the result
            const addressID = res[0].address_ID;

            // Set clinical_site.address_ID to null ID
            sql.query("UPDATE clinical_site SET address_ID = 0 WHERE ID = ?", ID, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }

                // Build and execute query to delete the address
                sql.query("DELETE FROM address WHERE ID = ?", addressID, (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(null, err);
                        return;
                    }

                    // Build and execute query to delete the clinical site
                    sql.query("DELETE FROM clinical_site WHERE ID = ?", ID, (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(null, err);
                            return;
                        }

                        if (res.affectedRows == 0) {
                            // Did not find Clinical Site with specified ID
                            result({ kind: "not_found" }, null);
                            return;
                        }
                        result(null, res);
                    });
                });
            });
        });
    });
};

// Export Clinical Site
module.exports = ClinicalSite;