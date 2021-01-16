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
import {GET_YEARS, PREVIEW_POSTS} from "../utils/Enpoints";

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
    },
    gridContainer: {
        padding: 16
    }

});

class PostsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            selectedYear: undefined,
            posts: []
        };
        this.loadYears = this.loadYears.bind(this);
        this.onAddPost = this.onAddPost.bind(this);
        this.getAllPosts = this.getAllPosts.bind(this);
        this.goToPost = this.goToPost.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
    }

    onAddPost() {
        this.setState({showForm: true});
    }

    getAllPosts() {
        AxiosClient
            .get(PREVIEW_POSTS, {
                params: {
                    year: this.state.selectedYear
                }
            })
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

    loadYears() {
        AxiosClient
            .get(GET_YEARS)
            .then((response) => {
                console.log("Loaded distinct years: ");
                console.log(response);
                this.setState({
                    years: response.data,
                    selectedYear: response.data[0]
                }, () => {
                    this.getAllPosts();
                })
            })
    }

    handleYearChange(event) {
        this.setState({
            selectedYear: event.target.value
        })
    }

    componentDidMount() {
        this.loadYears();
    }

    render() {
        const {classes} = this.props;
        return (
            <Container className={classes.rootContainer} fixed={true}>
                <Paper>
                    <Grid className={classes.gridContainer} container>
                        <Grid item md={12} lg={12}>
                            <SearchBar
                                isReady={this.state.years !== undefined}
                                handleYearChange={this.handleYearChange}
                                selectedYear={this.state.selectedYear}
                                years={this.state.years}
                                onAddPost={this.onAddPost}
                            />
                        </Grid>
                        {this.renderPosts()}
                    </Grid>
                    <PostForm
                        show={this.state.showForm}
                        reload={this.loadYears}
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
                    <CardContent>
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
