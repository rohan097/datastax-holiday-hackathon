import * as React from "react";
import {Component} from "react";
import HideOnScroll from "./HideOnScroll";
import {
    AppBar,
    Avatar,
    Container,
    Fab,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar
} from "@material-ui/core";
import {Home, KeyboardArrowUp, Person} from "@material-ui/icons";
import SideDrawer from "./SideDrawer";
import BackToTop from "./BackToTop";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import {HomeRoute, LoginRoute, PostsRoute, ResourceRoute, SignUpRoute} from "../utils/Routes";
import AuthenticationService from "../services/AuthenticationService";

const styles = theme => ({
    navbarDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    navListDisplayFlex: {
        display: `flex`,
        justifyContent: `space-between`
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `white`
    }
});

const navLinks = [
    HomeRoute,
    PostsRoute,
    ResourceRoute
];

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showSignUpForm: false,
            anchorEl: null,

        }
        this.handleClick = this.handleClick.bind(this);
        this.handleCloseUserDropDown = this.handleCloseUserDropDown.bind(this);
    }

    handleClick(event) {
        this.setState({
            anchorEl: event.currentTarget
        });
    }

    handleCloseUserDropDown() {
        this.setState({
            anchorEl: null,
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <>
                <HideOnScroll>
                    <AppBar position="fixed">
                        <Toolbar component="nav">
                            <Container maxWidth="md" className={classes.navbarDisplayFlex}>
                                <IconButton edge="start" aria-label="home">
                                    <a href="/" style={{color: `white`}}>
                                        <Home fontSize="large"/>
                                    </a>
                                </IconButton>

                                <Hidden smDown>
                                    <List
                                        component="nav"
                                        aria-labelledby="main navigation"
                                        className={classes.navListDisplayFlex}
                                    >
                                        {navLinks.map(({title, path}) => (
                                            <a href={path} key={title} className={classes.linkText}>
                                                <ListItem button>
                                                    <ListItemText primary={title}/>
                                                </ListItem>
                                            </a>
                                        ))}
                                        <Avatar onClick={this.handleClick}>
                                            <Person/>
                                        </Avatar>
                                        <Menu
                                            id="simple-menu"
                                            elevation={0}
                                            anchorEl={this.state.anchorEl}
                                            keepMounted
                                            open={Boolean(this.state.anchorEl)}
                                            getContentAnchorEl={null}
                                            onClose={this.handleCloseUserDropDown}
                                            anchorOrigin={{
                                                vertical: 'center',
                                                horizontal: 'center'
                                            }}
                                            // transformOrigin={{
                                            //     vertical: 'center',
                                            //     horizontal: 'left'
                                            // }}
                                        >
                                            {/* TODO: Need to make this conditional*/}
                                            {!AuthenticationService.isUserLoggedIn() &&
                                            [
                                                <MenuItem component={"a"} href={LoginRoute.path}
                                                          onClick={this.handleCloseUserDropDown}>Login</MenuItem>,
                                                <MenuItem component={"a"} href={SignUpRoute.path}
                                                          onClick={this.handleCloseUserDropDown}>Sign Up</MenuItem>
                                            ]

                                            }
                                            {AuthenticationService.isUserLoggedIn() &&
                                            [
                                                <MenuItem onClick={this.handleCloseUserDropDown}>My Profile</MenuItem>,
                                                <MenuItem component={"a"} href={LoginRoute.path} onClick={(e) => {
                                                    AuthenticationService.logout();
                                                    this.handleCloseUserDropDown(e);
                                                }}>Logout</MenuItem>
                                            ]
                                            }
                                        </Menu>
                                    </List>
                                </Hidden>
                                <Hidden mdUp>
                                    <SideDrawer navLinks={navLinks}/>
                                </Hidden>
                            </Container>
                        </Toolbar>
                    </AppBar>
                </HideOnScroll>
                <Toolbar id="back-to-top-anchor"/>
                <BackToTop>
                    <Fab color="secondary" size="large" aria-label="scroll back to top">
                        <KeyboardArrowUp/>
                    </Fab>
                </BackToTop>
            </>
        );
    }
}


Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);