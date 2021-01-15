import {Component} from "react";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Container,
    Divider,
    Grid,
    Paper,
    Typography
} from "@material-ui/core";
import SearchBar from "../components/SearchBar";
import PostForm from "../components/forms/PostForm";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import AxiosClient from "../utils/AxiosClient";
import {ALL_POSTS} from "../utils/Enpoints";

const styles = theme => ({
    rootContainer: {
        paddingTop: 32
    },
    tagContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: 0,
    },
    tag: {
        margin: 6
    },
    card: {
        // display: 'flex',
        padding: 12
    },
    cardContent: {
        // spacing: 3
    },
    cardAction: {
        position: "relative",
        bottom: 0
    }

});

class PostsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            posts: []
        };
        this.onAddPost = this.onAddPost.bind(this);
        this.getAllPosts = this.getAllPosts.bind(this);
        this.goToPost = this.goToPost.bind(this);
    }

    onAddPost() {
        this.setState({showForm: true});
    }

    getAllPosts() {
        AxiosClient
            .get(ALL_POSTS)
            .then((response) => {
                console.log("Got content: ");
                console.log(response.data);
                let items = response.data;
                this.setState({
                    posts: items,
                })

            })
    }

    goToPost(userId, postId) {
        this.props.history.push("/post/" + userId + "/" + postId);
    }

    componentDidMount() {
        this.getAllPosts();
    }

    render() {
        const {classes} = this.props;
        return (
            <Container className={classes.rootContainer} fixed={true}>
                <Paper>
                    <Grid container>
                        <Grid item md={12} lg={12}>
                            <SearchBar
                                onAddPost={this.onAddPost}
                            />
                        </Grid>
                        {this.renderPosts()}
                    </Grid>
                    <PostForm
                        show={this.state.showForm}
                        onHide={() => {
                            this.setState({showForm: false})
                        }}
                    />
                </Paper>
            </Container>
        );
    }

    renderPosts() {
        return this.state.posts.map((data) => {
            return this.createCard(data);
        });
    }

    createCard(data) {
        const {classes} = this.props;
        return (
            <Grid item lg={4} md={6} sm={12} xs={12} className={classes.card}>
                <Card variant={"outlined"}>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {data.title}
                        </Typography>
                        <Divider/>
                        <Typography variant="body2" component="p">
                            {data.content}
                        </Typography>
                        <Grid container direction={"row"} className={classes.tagContainer}>
                            {data.tags.split(",").map((tag) => {
                                if (tag !== undefined && tag !== "") {
                                    return (
                                        <Chip
                                            label={tag}
                                            className={classes.tag}
                                        />
                                    );
                                }
                            })}
                        </Grid>
                    </CardContent>
                    <CardActions className={classes.cardAction}>
                        <Button size="small" onClick={() => {
                            this.goToPost(data.userId, data.postId)
                        }}>Read More</Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

PostsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsPage);
