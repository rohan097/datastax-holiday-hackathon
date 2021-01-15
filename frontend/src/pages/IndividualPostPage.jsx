import {Component} from "react";
import {Container, Grid, Paper, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import AxiosClient from "../utils/AxiosClient";
import {POST_BY_ID} from "../utils/Enpoints";
import CommentSection from "../components/CommentSection";

const styles = theme => ({
    rootContainer: {
        paddingTop: 32,
        minHeight: "100vh",
        height: "100%"
    },
    paper: {
        height: "100%",
        padding: 32
    }
});


class IndividualPostPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            postId: this.props.match.params.postId,
            userId: this.props.match.params.userId,
            title: "",
            content: "",
            tags: "",
            hasPostLoaded: false
        }
        this.getContent = this.getContent.bind(this);
    }

    getContent() {
        AxiosClient
            .get(POST_BY_ID, {
                params: {
                    userId: this.state.userId,
                    postId: this.state.postId
                }
            })
            .then((response) => {
                console.log("Got response for Post Id = " + this.state.postId);
                console.log(response.data);
                this.setState({
                    title: response.data.title,
                    content: response.data.content,
                    tags: response.data.tags,
                    hasPostLoaded: true
                })
            });
    }

    componentDidMount() {
        this.getContent();
    }

    render() {
        const {classes} = this.props;
        return (
            <>
                <Container className={classes.rootContainer} fixed={true}>
                    <Paper className={classes.paper}>
                        <Grid direction={"row"} container>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Typography variant={"h2"}>
                                    {this.state.title}
                                </Typography>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Typography variant={"body1"} component={"p"} paragraph={true} align={"justify"}>
                                    {this.state.content}
                                </Typography>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <CommentSection
                                    userId={this.state.userId}
                                    postId={this.state.postId}
                                    hasPostLoaded={this.state.hasPostLoaded}
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </>
        );
    }
}

IndividualPostPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IndividualPostPage);
