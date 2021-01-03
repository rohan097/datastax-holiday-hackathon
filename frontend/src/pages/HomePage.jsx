import {Component} from "react";
import {Container, Grid, Paper, Typography} from "@material-ui/core";

class HomePage extends Component {

    render() {
        return (
            <Container>
                <Paper>
                    <Grid container direction="column">
                        <Grid>
                            <Typography variant="h2">
                                Some important facts regarding mental health.

                            </Typography>
                        </Grid>
                        <Grid item md={12} lg={12}>
                            <Typography variant="h2">
                                You are not alone
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        );
    }

}

export default HomePage;