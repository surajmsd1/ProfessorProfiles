// Routes file for defining axios requests
module.exports = app => {

	// Controller requirements for each component type
	const faculty = require("../controllers/faculty.controller.js");
	const login = require("../controllers/login.controller.js")
	const degree = require("../controllers/degree.controller.js");
	const course = require("../controllers/course.controller.js");
	const section = require("../controllers/section.controller.js");
	const clinicalSite = require("../controllers/clinicalsite.controller.js");
	const document = require("../controllers/document.controller.js");

	// Create router object
	var router = require("express").Router();

	// Create a new Faculty
	router.post("/create-faculty", faculty.create);

	// Create a new Degree entry
	router.post("/create-degree", degree.create);

	// Create a new Course entry
	router.post("/create-course", course.create);

	// Create a new Section entry
	router.post("/create-section", section.create);

	// Create a new Clinical Site entry
	router.post("/create-clinicalsite", clinicalSite.create);

	// Create a new Document entry
	router.post("/create-document", document.create);

	// Retrieve all Faculty
	router.get("/", faculty.findAll);

	// Retrieve all Faculty
	router.get("/faculty-list", faculty.findAll);

	// Retrieve all Degrees
	router.get("/degree-list", degree.findAll);

	// Retrieve all Courses
	router.get("/course-list", course.findAll);

	// Retrieve all Courses
	router.get("/section-list", section.findAll);

	// Retrieve all Clinical Sites
	router.get("/clinicalsite-list", clinicalSite.findAll);

	// Retrieve all Documents
	router.get("/document-list", document.findAll);

	// View profile of Faculty with ID
	router.get("/faculty-profile/:ID", faculty.view);

	// View profile of Degree with ID
	router.get("/degree-profile/:ID", degree.view);

	// View profile of Course with ID
	router.get("/course-profile/:ID", course.view);

	// View profile of Section with ID
	router.get("/section-profile/:ID", section.view);

	// View profile of Clinical Site with ID
	router.get("/clinicalsite-profile/:ID", clinicalSite.view);

	// View profile of Document with ID
	router.get("/document-profile/:ID", document.view);

	// Update a Faculty with ID
	router.put("/update-faculty/:ID", faculty.update);

	// Update a Degree with ID
	router.put("/update-degree/:ID", degree.update);

	// Update a Course with ID
	router.put("/update-course/:ID", course.update);

	// Update a Section with ID
	router.put("/update-section/:ID", section.update);

	// Update a Clinical Site with ID
	router.put("/update-clinicalsite/:ID", clinicalSite.update);

	// Update a Document with ID
	router.put("/update-document/:ID", document.update);

	// Delete a Faculty with ID
	router.delete("/delete-faculty/:ID", faculty.delete);

	// Delete a Degree with ID
	router.delete("/delete-degree/:ID", degree.delete);

	// Delete a Course with ID
	router.delete("/delete-course/:ID", course.delete);

	// Delete a Section with ID
	router.delete("/delete-section/:ID", section.delete);

	// Delete a ClinicalSite with ID
	router.delete("/delete-clinicalsite/:ID", clinicalSite.delete);

	// Delete a Document with ID
	router.delete("/delete-document/:ID", document.delete);

  	// Validate login
  	router.post("/api/auth/login", login.validate);

	// Store session token
	router.post("/api/auth/store", login.store);

	// Verify existing session token
	router.post("/api/auth/verify", login.verify);

	router.post("/api/auth/logout", login.logout);

	app.use("/", router);
};