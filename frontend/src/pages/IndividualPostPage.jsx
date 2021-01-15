import {Component} from "react";
import {Container, CssBaseline, Grid, Paper, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import AxiosClient from "../utils/AxiosClient";
import {POST_BY_ID} from "../utils/Enpoints";
import CommentSection from "../components/CommentSection";

const styles = theme => ({
    rootContainer: {
        paddingTop: 32,
        height: "100vh"
    },
    paper: {
        height: "100%",
        padding: 32
    },
    divider: {}
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
        // this.setState({
        //     title: 'Title 1  - short',
        //     content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie scelerisque porttitor. Pellentesque porta aliquet diam vel placerat. Nullam nec est eu tortor euismod semper. Vestibulum nec interdum sapien. In viverra tincidunt nunc et semper. Proin vel ante ullamcorper, dignissim libero imperdiet, auctor dolor. Sed finibus quam ac leo mollis.',
        //     tags: "Tag1,Tag2Tag3",
        // });
    }

    render() {
        const {classes} = this.props;
        return (
            <>
                <CssBaseline/>
                <Container className={classes.rootContainer} fixed={true}>
                    <Paper className={classes.paper}>
                        <Grid direction={"row"} container>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Typography variant={"h1"}>
                                    {this.state.title}
                                </Typography>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Typography variant={"body1"} component={"p"}>
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
