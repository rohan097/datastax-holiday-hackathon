import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {Formik,} from 'formik';
import * as Yup from 'yup';
import {ADD_POST} from "../../utils/Enpoints";
import AxiosClient from "../../utils/AxiosClient";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

class PostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showErrorMessage: false
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
            <>
                <Dialog
                    open={this.props.show}
                    onClose={this.props.onHide}
                    aria-labelledby="form-dialog-title"
                    className={classes.modal}
                    maxWidth={"md"}
                >
                    <React.Fragment>
                        <DialogTitle id="form-dialog-title">Share Your Story</DialogTitle>
                        <DialogContent>
                            <Formik
                                initialValues={{title: '', tags: '', content: ''}}
                                onSubmit={(values, {setSubmitting}) => {
                                    setSubmitting(true);
                                    console.log("Submitting form.");
                                    console.log(values);
                                    AxiosClient
                                        .post(ADD_POST, values, {
                                            headers: {
                                                // "Access-Control-Allow-Origin": "*",
                                                "Content-Type": "application/json",
                                            },
                                        })
                                        .then((response) => {
                                            console.log("Successfully submitted form.")
                                            setSubmitting(false);
                                            this.setState({
                                                showErrorMessage: true,
                                                severity: "success",
                                                errorMessage: "Successfully saved post."
                                            });
                                            this.props.reload();
                                        })
                                        .catch((error) => {
                                            this.setState({
                                                showErrorMessage: true,
                                                severity: "error",
                                                errorMessage: error.response.data
                                            });
                                        })
                                        .finally(() => {
                                            setSubmitting(false);
                                            this.props.onHide();
                                        });
                                }}
                                validationSchema={Yup.object().shape({
                                    title: Yup.string()
                                        .required('Required'),
                                    content: Yup.string()
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
                                                        name="content"
                                                        value={values.content}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        helperText={(errors.content && touched.content) && errors.content}
                                                        error={errors.content && touched.content}
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
                <Snackbar
                    open={this.state.showErrorMessage}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                >
                    <Alert severity={this.state.severity} onClose={this.handleClose}>
                        {this.state.errorMessage}
                    </Alert>
                </Snackbar>
            </>
        );
    }
}

PostForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostForm);
