import {Component} from "react";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
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
import {PREVIEW_POSTS} from "../utils/Enpoints";

const styles = theme => ({
    rootContainer: {
        paddingTop: 32
    },
    card: {
        padding: 12
    },
    cardAction: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    cardActionArea: {
        display: 'flex',
        flex: '1 0 auto',
        alignItems: 'flex-end',
        flexDirection: 'column'
    },
    rootCard: {
        height: "100%",
        display: 'flex',
        flexDirection: 'column'
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
            .get(PREVIEW_POSTS)
            .then((response) => {
                let items = response.data;
                this.setState({
                    posts: items,
                });

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
                        reload={this.getAllPosts}
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
                <Card className={classes.rootCard} variant={"outlined"}>
                    <CardContent className={classes.cardContent}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            {data.title}
                        </Typography>
                        <Divider/>
                        <Typography variant="body2" component="p">
                            {data.content} ...
                        </Typography>
                    </CardContent>
                    <CardActionArea className={classes.cardActionArea}>
                        <CardActions className={classes.cardAction}>
                            <Button size="small" onClick={() => {
                                this.goToPost(data.userId, data.postId)
                            }}>Read More</Button>
                        </CardActions>
                    </CardActionArea>
                </Card>
            </Grid>
        );
    }
}

PostsPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostsPage);