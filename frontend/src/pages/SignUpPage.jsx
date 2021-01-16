import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {Formik,} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {SIGNUP} from "../utils/Enpoints";


const styles = theme => ({
    rootContainer: {
        flexGrow: 1,
        justifyItems: "centered"
    }
});

class SignUpPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showToast: false
        }
    }


    render() {
        const {classes} = this.props;
        return (
            <Container className={classes.rootContainer}>
                <Grid container justify={"center"}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Typography variant={"h2"} align={"center"}>
                            Create an account and get started.
                        </Typography>
                    </Grid>
                    <Formik
                        initialValues={{email: '', profileName: '', password: '', gender: ''}}
                        onSubmit={(values, {setSubmitting}) => {
                            setSubmitting(true);
                            axios
                                .post(SIGNUP, values, {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                })
                                .then((response) => {
                                    this.setState({
                                        showToast: true,
                                        severity: "success",
                                        message: "Successfully created an account."
                                    });
                                    setSubmitting(false);
                                })
                                .catch((error) => {
                                    this.setState({
                                        showToast: true,
                                        severity: "error",
                                        errorMessage: error.response.data
                                    });
                                })
                                .finally(() => {
                                    setSubmitting(false);
                                });
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email()
                                .required('This cannot be blank.'),
                            profileName: Yup.string()
                                .required('This cannot be blank.'),
                            password: Yup.string()
                                .required('You must give a password.'),
                            gender: Yup.string()
                                .required('Please select an option.')
                        })}
                    >
                        {(props) => {
                            const {
                                values,
                                touched,
                                errors,
                                dirty,
                                isSubmitting,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                handleReset,
                            } = props;
                            return (
                                <form onSubmit={handleSubmit}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField
                                            label="Email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.email && touched.email) && errors.email}
                                            error={errors.email && touched.email}
                                            margin="normal"
                                            variant={"outlined"}
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField
                                            label="Profile Name"
                                            name="profileName"
                                            value={values.profileName}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.profileName && touched.profileName) && errors.profileName}
                                            error={errors.profileName && touched.profileName}
                                            margin="normal"
                                            variant={"outlined"}
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField
                                            label="Password"
                                            name="password"
                                            value={values.password}
                                            type={"password"}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={(errors.password && touched.password) && errors.password}
                                            error={errors.password && touched.password}
                                            margin="normal"
                                            variant={"outlined"}
                                        />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <Button
                                            type="button"
                                            className="outline"
                                            onClick={handleReset}
                                            disabled={!dirty || isSubmitting}
                                        >
                                            Reset
                                        </Button>
                                        <Button type="submit" disabled={isSubmitting}>
                                            Submit
                                        </Button>
                                    </Grid>
                                </form>
                            );
                        }}
                    </Formik>
                </Grid>
                <Snackbar
                    open={this.state.showToast}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                >
                    <Alert severity={this.state.severity} onClose={this.handleClose}>
                        {this.state.message}
                    </Alert>
                </Snackbar>
            </Container>
        );
    }
}

SignUpPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUpPage);
