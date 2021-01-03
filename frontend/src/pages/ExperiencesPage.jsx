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
    TextField,
    Typography
} from "@material-ui/core";
import SearchBar from "../components/SearchBar";
import ExperienceForm from "../components/forms/ExperienceForm";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";

const styles = theme => ({
    tagContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        listStyle: 'none',
        margin: 0,
    },
    tag: {
        margin: 6
    },
    card: {
        display: 'flex',
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

class ExperiencesPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            experiences: []
        };
        this.onAddExperience = this.onAddExperience.bind(this);
    }

    onAddExperience() {
        this.setState({showForm: true});
    }

    componentDidMount() {
        this.setState({
            experiences: [
                {
                    title: 'Title 1  - short',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie scelerisque porttitor. Pellentesque porta aliquet diam vel placerat. Nullam nec est eu tortor euismod semper. Vestibulum nec interdum sapien. In viverra tincidunt nunc et semper. Proin vel ante ullamcorper, dignissim libero imperdiet, auctor dolor. Sed finibus quam ac leo mollis.',
                    tags: ["Tag1", "Tag2", "Tag3"]
                },
                {
                    title: 'Title 2 - maybe a bit longer',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie scelerisque porttitor. Pellentesque porta aliquet diam vel placerat. Nullam nec est eu tortor euismod semper. Vestibulum nec interdum sapien. In viverra tincidunt nunc et semper. Proin vel ante ullamcorper, dignissim libero imperdiet, auctor dolor. Sed finibus quam ac leo mollis.',
                    tags: ["Tag1", "Tag2", "Tag3"]
                },{
                    title: 'Title 3 - quite a bit longer that 2',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie scelerisque porttitor. Pellentesque porta aliquet diam vel placerat. Nullam nec est eu tortor euismod semper. Vestibulum nec interdum sapien. In viverra tincidunt nunc et semper. Proin vel ante ullamcorper, dignissim libero imperdiet, auctor dolor. Sed finibus quam ac leo mollis.',
                    tags: ["Tag1", "Tag2", "Tag3"]
                },
                {
                    title: 'Title 4 - this is a huge title. How will it look?',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie scelerisque porttitor. Pellentesque porta aliquet diam vel placerat. Nullam nec est eu tortor euismod semper. Vestibulum nec interdum sapien. In viverra tincidunt nunc et semper. Proin vel ante ullamcorper, dignissim libero imperdiet, auctor dolor. Sed finibus quam ac leo mollis.',
                    tags: ["Tag1", "Tag2", "Tag3"]
                },
                {
                    title: 'Title 5',
                    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris molestie scelerisque porttitor. Pellentesque porta aliquet diam vel placerat. Nullam nec est eu tortor euismod semper. Vestibulum nec interdum sapien. In viverra tincidunt nunc et semper. Proin vel ante ullamcorper, dignissim libero imperdiet, auctor dolor. Sed finibus quam ac leo mollis.',
                    tags: ["Tag1", "Tag2", "Tag3"]
                }
            ]
        })
    }

    render() {
        return (
            <Container>
                <Paper>
                    <Grid container>
                        <Grid item md={12} lg={12}>
                            <SearchBar
                                onAddExperience={this.onAddExperience}
                            />
                        </Grid>
                        {this.renderExperiences()}
                    </Grid>
                    <ExperienceForm
                        show={this.state.showForm}
                        onHide= {() => {this.setState({showForm: false})}}
                    />
                </Paper>
            </Container>
        );
    }

    renderExperiences() {
        return this.state.experiences.map((data) => {
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
                        <Container component="ul" className={classes.tagContainer}>
                            {data.tags.map((tag) => {
                                return (
                                    <li>
                                        <Chip
                                            label={tag}
                                            className={classes.tag}
                                        />
                                    </li>
                                );
                            })}
                        </Container>
                    </CardContent>
                    <CardActions className={classes.cardAction}>
                        <Button size="small">Read More</Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

ExperiencesPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ExperiencesPage);
