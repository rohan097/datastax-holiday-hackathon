import React, {Component} from "react";
import PropTypes from "prop-types";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider, Grid,
    Icon,
    IconButton, TextField
} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {
    Formik, Form, Field, ErrorMessage,
} from 'formik';
import * as Yup from 'yup';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class SignupForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSubmissionComplete: false,
        };
    }


    render() {
        const {classes} = this.props;
        return (
            <Dialog
                open={this.props.show}
                onClose={this.props.onHide}
                aria-labelledby="form-dialog-title"
                className={classes.modal}
                maxWidth={"md"}
            >
                <React.Fragment>
                    <DialogTitle id="form-dialog-title">Share Your Experience</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={{title: '', tags: '', experience: ''}}
                            onSubmit={(values, {setSubmitting}) => {
                                setSubmitting(true);
                                console.log("Submitting form.");
                                this.setState({isSubmissionComplete: true});
                            }}

                            validationSchema={Yup.object().shape({
                                title: Yup.string()
                                    .required('Required'),
                                experience: Yup.string()
                                    .required('Required'),
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
                                        <Grid container direction="row" spacing={3}>
                                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                                <TextField
                                                    label="Title"
                                                    name="title"
                                                    value={values.title}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={(errors.title && touched.title) && errors.title}
                                                    error={errors.title && touched.title}
                                                    margin="normal"
                                                    fullWidth={true}
                                                    variant={"outlined"}
                                                />
                                            </Grid>
                                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                                <TextField
                                                    label="Experience"
                                                    name="experience"
                                                    value={values.experience}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={(errors.experience && touched.experience) && errors.experience}
                                                    error={errors.experience && touched.experience}
                                                    margin="normal"
                                                    fullWidth={true}
                                                    multiline={true}
                                                    rows={6}
                                                    variant={"outlined"}
                                                />
                                            </Grid>
                                        </Grid>
                                        <DialogActions>
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
                                        </DialogActions>
                                    </form>
                                );
                            }}
                        </Formik>
                    </DialogContent>
                </React.Fragment>
            </Dialog>
        );
    }
}

SignupForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignupForm);
