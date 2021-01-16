import {Component} from "react";
import {Button, CircularProgress, FormControl, Grid, Select, Typography} from "@material-ui/core";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import AuthenticationService from "../services/AuthenticationService";
import * as Theme from "../utils/Theme";

const styles = theme => ({
    buttonBar: {
        justifyContent: "center",
        display: 'flex'
    },
    formControl: {
        // margin: theme.spacing(1),
        minWidth: 120,
    },
    titleBar: {
        display: 'flex',
    },
    yearTitle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8
    },
    addButton: {
        background: Theme.ACCENT_COLOR,
    }
});

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            years: []
        }
    }

    renderButtonBar() {
        const {classes} = this.props;
        if (AuthenticationService.isUserLoggedIn()) {
            return (
                <Button className={classes.addButton} variant={"contained"} onClick={this.props.onAddPost}>
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

    renderOptions() {
        let years = this.props.years;
        return years.map(year => {
            return <option value={year}>{year}</option>
        })
    }

    render() {
        const {classes} = this.props;
        if (this.props.isReady) {
            return (
                <Grid container direction="row">
                    <Grid className={classes.titleBar} item lg={6} md={6} sm={12} xs={12}>
                        <Typography className={classes.yearTitle} variant={"h5"}>
                            Posts from
                        </Typography>
                        <FormControl className={classes.yearTitle}>
                            <Select
                                native
                                value={this.props.selectedYear}
                                onChange={this.props.handleYearChange}
                                inputProps={{
                                    name: 'year',
                                    id: 'year-native-simple',
                                }}
                            >
                                {this.renderOptions()}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid className={classes.buttonBar} item lg={6} md={6} sm={12} xs={12}>
                        {this.renderButtonBar()}
                    </Grid>
                </Grid>

            );
        } else {
            return <CircularProgress/>
        }
    }
}

SearchBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchBar);
