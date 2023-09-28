// LoginForm for accepting login information

// Import modules
import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button, FormLabel } from "react-bootstrap";

// LoginForm Component
const LoginForm = (props) => {

    // Form field validation
    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Please enter your username."),
        password: Yup.string().required("Please enter your password.")
    });

    console.log(props);

    // Return form fields
    return (
        <div className="form-wrapper">
            <h1>Otterbein Nursing Login</h1>
            <Formik {...props} validationSchema={validationSchema}>
                <Form>
                    <FormGroup className="form-group">
                        <FormLabel>Username</FormLabel>
                        <Field name="username" type="text" className="form-control" placeholder="Username" />
                        <ErrorMessage name="username" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <FormGroup className="form-group">
                        <FormLabel>Password</FormLabel>
                        <Field name="password" type="password" className="form-control" placeholder="Password" />
                        <ErrorMessage name="password" className="d-block invalid-feedback" component="span" />
                    </FormGroup>
                    <Button className="submit-button" variant="danger" size="lg" block="block" type="submit">
                        {props.children}
                    </Button>
                </Form>
            </Formik>
        </div>
    );
};

// Export LoginForm Component
export default LoginForm;