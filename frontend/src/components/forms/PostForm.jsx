import React, {Component} from "react";
import PropTypes from "prop-types";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    TextField,
    Typography
} from "@material-ui/core";
import {withStyles} from "@material-ui/styles";
import {Formik,} from 'formik';
import * as Yup from 'yup';
import {ADD_POST} from "../../utils/Enpoints";
import AxiosClient from "../../utils/AxiosClient";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {Close} from "@material-ui/icons";

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

class PostForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showToast: false
        };
        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.setState({
            showToast: false,
            message: "",
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
                        <DialogTitle id="form-dialog-title"
                                     disableTypography
                                     style={{
                                         display: "flex",
                                         justifyContent: "space-between",
                                         alignItems: "center"
                                     }}
                        >
                            <Typography variant={"h5"}>
                                Share Your Story
                            </Typography>
                            <IconButton onClick={this.props.onHide}>
                                <Close/>
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <Formik
                                initialValues={{title: '', tags: '', content: ''}}
                                onSubmit={(values, {setSubmitting}) => {
                                    setSubmitting(true);
                                    AxiosClient
                                        .post(ADD_POST, values, {
                                            headers: {
                                                "Content-Type": "application/json",
                                            },
                                        })
                                        .then((response) => {
                                            setSubmitting(false);
                                            this.setState({
                                                showToast: true,
                                                severity: "success",
                                                message: "Successfully saved post."
                                            });
                                            this.props.reload();
                                        })
                                        .catch((error) => {
                                            this.setState({
                                                showToast: true,
                                                severity: "error",
                                                message: error.response.data
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
                    open={this.state.showToast}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                >
                    <Alert severity={this.state.severity} onClose={this.handleClose}>
                        {this.state.message}
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
