import {Component} from "react";
import {Grid, Icon, IconButton, TextField} from "@material-ui/core";

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.addExperience = this.addExperience.bind(this);
    }

    addExperience() {
        console.log("Adding a new Experience.");
        this.props.onAddExperience();
    }

    render() {
        return (
            <Grid container direction="row">
                <Grid item md={8} lg={8}>
                    <TextField
                        variant={"outlined"}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item md={4} lg={4}>
                    <Grid container>
                        <Grid item lg={6}>
                            <IconButton>
                                <Icon>search</Icon>
                            </IconButton>
                        </Grid>
                        <Grid item lg={6}>
                            <IconButton onClick={() => {
                                this.addExperience();
                            }}>
                                <Icon>add</Icon>
                            </IconButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        );
    }
}

export default SearchBar;