import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {Formik,} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {LOGIN} from "../utils/Enpoints";
import AuthenticationService from "../services/AuthenticationService";
import {HomeRoute} from "../utils/Routes";


const styles = theme => ({
    rootContainer: {
        flexGrow: 1,
        justifyItems: "centered"
    }
});

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showErrorMessage: false,
            errorMessage: ""
        };
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({
            showErrorMessage: false,
            errorMessage: "",
        });
    }


    render() {
        const {classes} = this.props;
        return (
            <Container className={classes.rootContainer}>
                <Grid container justify={"center"}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Typography variant={"h2"} align={"center"}>
                            Login
                        </Typography>
                    </Grid>
                    <Formik
                        initialValues={{profileName: '', password: ''}}
                        onSubmit={(values, {setSubmitting}) => {
                            setSubmitting(true);
                            axios
                                .post(LOGIN, values, {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                })
                                .then((response) => {
                                    setSubmitting(false);
                                    AuthenticationService.registerSuccessfulLoginForJwt(values.profileName, response.data.token);
                                    this.props.history.push(HomeRoute.path);
                                })
                                .catch((error) => {
                                    this.setState({
                                        showErrorMessage: true,
                                        errorMessage: error.response.data
                                    });
                                })
                                .finally(() => {
                                    setSubmitting(false);
                                });
                        }}
                        validationSchema={Yup.object().shape({
                            profileName: Yup.string()
                                .required('This cannot be blank.'),
                            password: Yup.string()
                                .required('You must give a password.')
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
                                            Login
                                        </Button>
                                    </Grid>
                                </form>
                            );
                        }}
                    </Formik>
                </Grid>
                <Snackbar
                    open={this.state.showErrorMessage}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                >
                    <Alert severity="error" onClose={this.handleClose}>
                        {this.state.errorMessage}
                    </Alert>
                </Snackbar>
            </Container>
        );
    }
}

LoginPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
