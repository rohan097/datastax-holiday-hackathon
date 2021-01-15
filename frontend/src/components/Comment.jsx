import {Button, Divider, Grid, IconButton, TextField, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import React, {Component} from "react";
import {ArrowDownward, ArrowUpward, Delete, Reply} from "@material-ui/icons";
import AxiosClient from "../utils/AxiosClient";
import {DELETE_COMMENT} from "../utils/Enpoints";
import * as Yup from "yup";
import {Formik} from "formik";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const styles = theme => ({
    rootContainer: {
        display: 'flex',
    },
    paper: {
        height: "100%",
        padding: 32
    },
    commentHeader: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentActionBar: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    replyBar: {},
    submitButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8
    }
});

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.postId,
            parentId: this.props.parent,
            username: this.props.username,
            content: this.props.content,
            replyToParent: false,
            showToast: false
        }
        this.onReplyButtonClick = this.onReplyButtonClick.bind(this);
        this.onDeleteButtonClick = this.onDeleteButtonClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    onReplyButtonClick() {
        this.setState({
            replyToParent: !this.state.replyToParent
        })
    }

    onDeleteButtonClick() {
        console.log("Deleting comment with ID = " + this.props.commentId);
        AxiosClient
            .delete(DELETE_COMMENT, {
                params: {
                    postId: this.props.postId,
                    commentId: this.props.commentId
                }
            })
            .then((response) => {
                console.log("Deleted comment. Response = ");
                console.log(response);
                this.setState({
                    showToast: true,
                    severity: "success",
                    message: "Successfully deleted comment."
                });
                this.props.reload();
            })
            .catch((error) => {
                console.log("Error while deleting comment.");
                console.log(error);
                this.setState({
                    showToast: true,
                    severity: "error",
                    errorMessage: error.response.data
                });
            })
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
            <Grid container>
                <Grid className={classes.commentHeader} item lg={12} md={12} sm={12} xs={12}>
                    <Typography variant={"subtitle2"} component={"h6"}>
                        {this.props.username}
                    </Typography>
                    <Divider orientation={"vertical"}/>
                    <Typography variant={"caption"} component={"h6"}>
                        {this.props.date}
                    </Typography>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Typography>
                        {this.props.content}
                    </Typography>
                </Grid>
                <Grid className={classes.commentActionBar} item lg={12} md={12} sm={12} xs={12}>
                    <IconButton onClick={this.onReplyButtonClick} size={"small"}>
                        <Reply/>
                    </IconButton>
                    <IconButton onClick={this.onDeleteButtonClick} size={"small"}>
                        <Delete/>
                    </IconButton>
                    <IconButton size={"small"}>
                        <ArrowUpward/>
                    </IconButton>
                    <IconButton size={"small"}>
                        <ArrowDownward/>
                    </IconButton>
                </Grid>
                {this.state.replyToParent &&
                <>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Formik
                            initialValues={{data: '', postId: this.props.postId, parentId: this.props.commentId}}
                            onSubmit={(values, {setSubmitting}) => {
                                setSubmitting(true);
                                console.log("Submitting comment: ")
                                console.log(values.data);
                                this.props.uploadComment(values, setSubmitting);
                                this.onReplyButtonClick();
                            }}
                            validationSchema={Yup.object().shape({
                                data: Yup.string()
                                    .required('This cannot be empty.')
                            })}
                        >
                            {(props) => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                } = props;
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <Grid container>
                                            <Grid item lg={10} md={10} sm={12} xs={12}>
                                                <TextField
                                                    name={"data"}
                                                    label={"Reply"}
                                                    value={values.data}
                                                    variant={"outlined"}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    helperText={(errors.data && touched.data) && errors.data}
                                                    error={errors.data && touched.data}
                                                    fullWidth={true}
                                                />
                                            </Grid>
                                            <Grid className={classes.submitButton}
                                                  item lg={2} md={2} sm={12} xs={12}>
                                                <Button
                                                    variant={"outlined"}
                                                    type={"submit"}
                                                    disabled={isSubmitting}
                                                >
                                                    Submit
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                );
                            }}
                        </Formik>
                    </Grid>
                </>
                }
                <Snackbar
                    open={this.state.showToast}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                >
                    <Alert severity={this.state.severity} onClose={this.handleClose}>
                        {this.state.message}
                    </Alert>
                </Snackbar>
            </Grid>

        );
    }

}


Comment.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);