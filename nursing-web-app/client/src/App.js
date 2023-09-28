// Import React & website logo
import React from "react";
import logo from './logo.png';

// Import Axios
import axios from 'axios';

// Import Bootstrap
import { Nav, Navbar, NavDropdown, Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import { Route, Routes, Link } from "react-router-dom";

// Import Login and Token Components
import Login from './Components/Login/login.component'
import useToken from "./Components/Login/useToken";

// Import other React Component
import CreateFaculty from "./Components/Faculty/create-faculty.component";
import CreateDegree from "./Components/Degree/create-degree.component";
import CreateCourse from "./Components/Course/create-course.component";
import CreateSection from "./Components/Section/create-section.component";
import CreateClinicalSite from "./Components/ClinicalSite/create-clinicalsite.component";
import CreateDocument from "./Components/Document/create-document.component";
import FacultyProfile from "./Components/Faculty/faculty-profile.component";
import DegreeProfile from "./Components/Degree/degree-profile.component";
import CourseProfile from "./Components/Course/course-profile.component";
import SectionProfile from "./Components/Section/section-profile.component";
import ClinicalSiteProfile from "./Components/ClinicalSite/clinicalsite-profile.component";
import DocumentProfile from "./Components/Document/document-profile.component";
import FacultyList from "./Components/Faculty/faculty-list.component";
import DegreeList from "./Components/Degree/degree-list.component";
import SectionList from "./Components/Section/section-list.component";
import CourseList from "./Components/Course/course-list.component";
import ClinicalSiteList from "./Components/ClinicalSite/clinicalsite-list.component";
import DocumentList from "./Components/Document/document-list.component";

// App Component
const App = () => {

	// Store Token for session
	const { token, setToken } = useToken();
	if(!token) { return <Login setToken={setToken} /> }

	// Return App headers, containers, navigation bar, and routes
	return (
		<div className="App">
			<header className="App-header">
				<Navbar className="custom-navbar">
					<Container className="custom-container">
						<Navbar.Brand>
							<img src={logo} alt="Logo" id="page-logo"/>
							<Link to={"/faculty-list"} id="brand-link">
								Otterbein Nursing
							</Link>
						</Navbar.Brand>
						<div class="nav-menu">
							<Nav className="nav-dropdown">
								<NavDropdown title="Enter Information" id="enter-information-dropdown">
									<NavDropdown.Item class="dropdown-item">
										<Link to={"/create-faculty"} className="nav-link">
											Create Faculty
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item class="dropdown-item">
										<Link to={"/create-degree"} className="nav-link">
											Add Degree
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item class="dropdown-item">
										<Link to={"/create-course"} className="nav-link">
											Add Course
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item class="dropdown-item">
										<Link to={"/create-section"} className="nav-link">
											Add Section
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item class="dropdown-item">
										<Link to={"/create-clinicalsite"} className="nav-link">
											Add Clinical Site
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item class="dropdown-item">
										<Link to={"/create-document"}
											className="nav-link">
											Upload Document
										</Link>
									</NavDropdown.Item>
								</NavDropdown>
								<NavDropdown title="View Information" id="view-information-dropdown">
									<NavDropdown.Item class="dropdown-item">
										<Link to={"/faculty-list"} className="nav-link">
											Faculty List
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item class="dropdown-item">
										<Link to={"/degree-list"} className="nav-link">
											Degree List
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item class="dropdown-item">
										<Link to={"/course-list"} className="nav-link">
											Course List
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item class="dropdown-item">
										<Link to={"/section-list"} className="nav-link">
											Section List
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item class="dropdown-item">
										<Link to={"/clinicalsite-list"} className="nav-link">
											Clinical Site List
										</Link>
									</NavDropdown.Item>
									<NavDropdown.Item class="dropdown-item">
										<Link to={"/document-list"} className="nav-link">
											Document List
										</Link>
									</NavDropdown.Item>
								</NavDropdown>
							</Nav>
						</div>
					</Container>
					<Button className="logout-button" variant="danger" size="lg" type="submit" onClick={logOut}>Log Out</Button>
				</Navbar>
			</header>
			<Container>
				<Row>
					<Col md={12}>
						<div className="wrapper">
							<Routes>
								<Route exact path="/" element={<FacultyList />} />
								<Route path="/create-faculty" element={<CreateFaculty />} />
								<Route path="/create-degree" element={<CreateDegree />} />
								<Route path="/create-course" element={<CreateCourse />} />
								<Route path="/create-section" element={<CreateSection />} />
								<Route path="/create-clinicalsite" element={<CreateClinicalSite/>} />
								<Route path="/create-document" element={<CreateDocument />} />
								<Route path="/faculty-profile/:ID" element={<FacultyProfile />} />
								<Route path="/degree-profile/:ID" element={<DegreeProfile />} />
								<Route path="/course-profile/:ID" element={<CourseProfile />} />
								<Route path="/section-profile/:ID" element={<SectionProfile />} />
								<Route path="/clinicalsite-profile/:ID" element={<ClinicalSiteProfile />} />
								<Route path="/document-profile/:ID" element={<DocumentProfile />} />
								<Route path="/faculty-list" element={<FacultyList />} />
								<Route path="/degree-list" element={<DegreeList />} />
								<Route path="/course-list" element={<CourseList />} />
								<Route path="/section-list" element={<SectionList />} />
								<Route path="/clinicalsite-list" element={<ClinicalSiteList />} />
								<Route path="/document-list" element={<DocumentList />} />
								<Route path="/login" element={<Login />} />
							</Routes>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

// Delete faculty function
const logOut = () => {

	// Confirmation window
	const confirmed = window.confirm("Are you sure you want to log out?");

	// Send axios delete request for the specified ID
	if (confirmed) {
		const tokenString = localStorage.getItem('nursingUser');
        const userToken = JSON.parse(tokenString);
		const tokenObject = {
			token: userToken
		}
		axios.post("/api/auth/logout", tokenObject)
			.then((res) => {
				if (res.status === 200) {
					localStorage.removeItem('nursingUser');
					window.location.replace("/");
				}
				else Promise.reject();
			})
			.catch((err) => alert("Something went wrong")
		);
	}	
};

// Export App
export default App;
