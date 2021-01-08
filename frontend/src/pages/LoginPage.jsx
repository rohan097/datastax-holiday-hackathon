import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Container, Grid, TextField, Typography} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {Formik,} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import {AlertTitle} from "@material-ui/lab";
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
                        initialValues={{email: '', password: ''}}
                        onSubmit={(values, {setSubmitting}) => {
                            setSubmitting(true);
                            console.log("Submitting form to signup with values = ");
                            console.log(values);
                            axios
                                .post(LOGIN, values, {
                                    headers: {
                                        "Access-Control-Allow-Origin": "*",
                                        "Content-Type": "application/json",
                                    },
                                })
                                .then((response) => {
                                    console.log("Response = ");
                                    console.log(response);
                                    setSubmitting(false);
                                    AuthenticationService.registerSuccessfulLoginForJwt(values.email, response.data.token);
                                    this.props.history.push(HomeRoute.path);
                                })
                                .catch((error) => {
                                    console.log(error);
                                    console.log(error.config);
                                })
                                .finally(() => {
                                    setSubmitting(false);
                                });
                        }}
                        validationSchema={Yup.object().shape({
                            email: Yup.string()
                                .email()
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
                <Snackbar open={true}>
                    <Alert severity="error" hidden={true}>
                        <AlertTitle>Error</AlertTitle>
                        This is an error alert — <strong>check it out!</strong>
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
