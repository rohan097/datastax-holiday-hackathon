import React, {Component} from "react";
import {Button, Divider, Grid, TextField, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import Comment from "./Comment";
import {TreeItem, TreeView} from "@material-ui/lab";
import {Formik,} from 'formik';
import * as Yup from 'yup';
import AxiosClient from "../utils/AxiosClient";
import {ADD_COMMENT, GET_COMMENT} from "../utils/Enpoints";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import AuthenticationService from "../services/AuthenticationService";
import {withStyles} from "@material-ui/styles";
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
    submitButton: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8
    }
});

class CommentSection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.postId,
            userId: this.props.userId,
            showToast: false
        }
        this.sendCommentToServer = this.sendCommentToServer.bind(this);
        this.loadComments = this.loadComments.bind(this);
        this.renderTree = this.renderTree.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }

    componentDidMount() {
        this.loadComments()
    }

    loadComments() {
        AxiosClient
            .get(GET_COMMENT, {
                params: {
                    postId: this.props.postId
                }
            })
            .then((response) => {
                console.log("Loaded all comments.");
                console.log(response);
                this.setState({
                    comments: response.data.comments,
                    commentIds: response.data.keys
                });
            }).catch((error) => {
            console.log("Got an error.");
            console.log(error);
        })
    }

    sendCommentToServer(object, setSubmitting) {
        AxiosClient
            .post(ADD_COMMENT, object, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                console.log("Successfully saved comment.");
                this.setState({
                    showToast: true,
                    severity: "success",
                    message: "Successfully saved comment."
                });
                this.loadComments();
            })
            .catch((error) => {
                console.log("Got an error.");
                console.log(error);
                this.setState({
                    showToast: true,
                    severity: "error",
                    message: "Unable to add comment."
                });
            })
            .finally(() => {
                setSubmitting(false);
            })
    }

    renderTree(data) {
        if (data !== undefined) {
            console.log("data = ");
            console.log(data);
            let tree = data.map((comment) => {
                console.log("Comment");
                console.log(comment);
                console.log(Array.isArray(comment.children) && comment.children.length !== 0);
                let item = <TreeItem key={comment.commentId} nodeId={comment.commentId}
                                     label={
                                         <Comment
                                             commentId={comment.commentId}
                                             postId={comment.postId}
                                             username={comment.username}
                                             content={comment.data}
                                             date={comment.date}
                                             reload={this.loadComments}
                                             uploadComment={this.sendCommentToServer}
                                         />
                                     }>
                    {Array.isArray(comment.children) && comment.children.length !== 0 ? comment.children.map((node) => this.renderTree([node])) : null}
                </TreeItem>
                return item;

            });
            return (
                tree
            );
        }
    }

    renderComments() {
        if (this.state.comments === undefined || this.state.comments.length === 0) {
            if (AuthenticationService.isUserLoggedIn()) {
                return (
                    <Typography>
                        Looks like there are no comments yet.
                    </Typography>
                );
            } else {
                return (
                    <Typography>
                        Looks like there are no comments. Login/Create an account to make a comment.
                    </Typography>
                );
            }
        } else {
            return (
                <TreeView
                    disableSelection={true}
                    defaultExpandIcon={<ExpandMore/>}
                    defaultCollapseIcon={<ExpandLess/>}
                >
                    {this.renderTree(this.state.comments)}
                </TreeView>
            );
        }
    }

    handleClose() {
        this.setState({
            showToast: false,
            message: "",
        });
    }

    render() {
        if (this.props.hasPostLoaded === true) {
            const {classes} = this.props;
            return (
                <Grid container className={classes.rootContainer} spacing={3}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Typography variant={"h4"}>
                            Comments
                        </Typography>
                    </Grid>
                    {AuthenticationService.isUserLoggedIn() &&
                    <>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Formik
                                initialValues={{data: '', postId: this.props.postId}}
                                onSubmit={(values, {setSubmitting, handleReset}) => {
                                    setSubmitting(true);
                                    console.log("Submitting comment: ")
                                    console.log(values.data);
                                    this.sendCommentToServer(values, setSubmitting);
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
                                                        label={"Comment"}
                                                        variant={"outlined"}
                                                        value={values.data}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        helperText={(errors.data && touched.data) && errors.data}
                                                        error={errors.data && touched.data}
                                                        fullWidth={true}
                                                        multiline={true}
                                                        rows={3}
                                                        rowsMax={4}/>
                                                </Grid>
                                                <Grid className={classes.submitButton} item lg={2} md={2} sm={12}
                                                      xs={12}>
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
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Divider/>
                        </Grid>
                    </>
                    }
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        {this.renderComments()}
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
                </Grid>
            );
        } else {
            return null;
        }
    }

}

CommentSection.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentSection);
