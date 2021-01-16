import {Component} from "react";
import {Container, Divider, Grid, Paper, Typography} from "@material-ui/core";
import fact1 from "../fact1.jpeg";
import fact2 from "../fact2.jpeg";
import fact3 from "../fact3.jpeg";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import Typewriter from 'typewriter-effect';


const styles = theme => ({
    rootContainer: {
        height: "100vh"
    },
    paperContainer: {
        marginTop: 32,
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16
    },
    image: {
        width: "75%",
        height: "auto"
    },
    notepad: {
        display: 'flex',
        justifyContent: 'center'
    },
    flex: {
        display: 'flex'
    }
});


class HomePage extends Component {

    render() {
        const {classes} = this.props;
        return (
            <Container>
                <Paper className={classes.paperContainer}>
                    <Grid container direction={"row"} spacing={3} alignItems={"center"}>
                        <Grid item lg={12} alignItems={"center"}>
                            <Typography variant={"h2"} align={"center"}>
                                Did you know
                            </Typography>
                        </Grid>
                        <Grid className={classes.notepad} item lg={4} md={4} sm={12} xs={12}>
                            <img className={classes.image} src={fact1}/>
                        </Grid>
                        <Grid className={classes.notepad} item lg={4} md={4} sm={12} xs={12}>
                            <img className={classes.image} src={fact2}/>
                        </Grid>
                        <Grid className={classes.notepad} item lg={4} md={4} sm={12} xs={12}>
                            <img className={classes.image} src={fact3}/>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Divider/>
                        </Grid>
                        <Grid item lg={12} md={12} sm={12} xs={12}>
                            <Typography variant={"h4"} align={"center"}>
                                So, what is this website for?
                            </Typography>
                            {/*<Typography variant={"h6"}>*/}
                            {/*    <Typewriter options={{*/}
                            {/*        strings: ['So, what is this website for?',*/}
                            {/*            'Well, this is a place for people to come together and share their experiences with on and another. ' +*/}
                            {/*            'It\'s a place to know that you are not alone, and that other people too have gone through similar experiences as well.'],*/}
                            {/*        autoStart: true,*/}
                            {/*        loop: true,*/}
                            {/*        delay: 30,*/}
                            {/*        deleteSpeed: 20*/}
                            {/*    }}*/}
                            {/*    />*/}
                            {/*</Typography>*/}
                            <Typography variant={"h6"} align={"justify"}>
                                Well, this is a place for people to come together and share their experiences with on
                                and another.
                                It's a place to know that you are not alone, and that other people too have gone through
                                experiences as well.
                            </Typography>
                        </Grid>
                        <Grid item lg={12} md={12} sm>
                            <Divider/>
                        </Grid>
                        <Grid item lg={12}>
                            <Typography variant={"h6"} align={"center"}>
                                <Typewriter options={{
                                    strings: ['#MentalHealthMatters', '#ReachOut', '#BreakTheStigma', '#NoMoreShame', '#IAmNotAfraid'],
                                    autoStart: true,
                                    loop: true,
                                    delay: 50,
                                    deleteSpeed: 20
                                }}
                                />
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        );
    }

}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
