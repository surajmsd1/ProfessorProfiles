// Login Component to validate login information

// Import modules
import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from "./LoginForm";
import PropTypes from "prop-types";

// Login component
const Login = ({ setToken }) => {

    // Define initial blank form values
    const [formValues, setFormValues] = useState({ username: '', password: '' })

    // onSubmit handler
    const onSubmit = loginObject => {
        axios.post('/api/auth/login', loginObject).then(res => {
            if (res.status === 200) {
                if (res.data.valid) {
                    setToken(loginObject.username);
                }
                else {
                    alert("Login unsuccessful. Please check your username and password and try again.");
                    Promise.reject();
                }
            }
            else {
                alert("Request not processed successfully. Status: " + res.status);
                Promise.reject();
            }
        })
        .catch(err => alert('Something went wrong! ' + err));
    }

    // Return form
    return (
        <LoginForm initialValues={formValues} onSubmit={onSubmit} enableReinitialize>
            Sign in
        </LoginForm>
    );
}

Login.propTypes = { setToken: PropTypes.func.isRequired }

// Export Login
export default Login;