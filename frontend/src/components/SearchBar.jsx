import {Component} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import AuthenticationService from "../services/AuthenticationService";

const styles = theme => ({
    buttonBar: {
        justifyContent: "center",
        display: 'flex'
    }
});

class SearchBar extends Component {

    renderButtonBar() {
        if (AuthenticationService.isUserLoggedIn()) {
            return (
                <Button variant={"contained"} onClick={this.props.onAddPost}>
                    Add Your Story
                </Button>
            );
        } else {
            return (
                <Typography variant={"h6"}>
                    Login or create an account to add your story.
                </Typography>
            );
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Grid container direction="row" justify={"center"}>
                <Grid className={classes.buttonBar} item lg={12} md={12} sm={12} xs={12}>
                    {this.renderButtonBar()}
                </Grid>
            </Grid>

        );
    }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);
