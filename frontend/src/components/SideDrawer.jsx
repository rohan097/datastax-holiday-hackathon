import {Drawer, IconButton, List, ListItem, ListItemText} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import * as React from "react";
import {Component} from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/styles";
import {HomeRoute, LoginRoute, SignUpRoute} from "../utils/Routes";
import AuthenticationService from "../services/AuthenticationService";

const styles = theme => ({
    list: {
        width: 250
    },
    linkText: {
        textDecoration: `none`,
        textTransform: `uppercase`,
        color: `black`
    }
});

class SideDrawer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchor: {right: false}
        }
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.sideDrawerList = this.sideDrawerList.bind(this);
    }

    toggleDrawer = (anchor, open) => event => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        this.setState({anchor: {[anchor]: open}});
    }


    sideDrawerList(anchor) {
        const {classes} = this.props;
        return (
            <div
                className={classes.list}
                role="presentation"
                onClick={this.toggleDrawer(anchor, false)}
                onKeyDown={this.toggleDrawer(anchor, false)}
            >
                <List component="nav">
                    {this.props.navLinks.map(({title, path}) => (
                        <a href={path} key={title} className={classes.linkText}>
                            <ListItem button>
                                <ListItemText primary={title}/>
                            </ListItem>
                        </a>
                    ))}
                    {AuthenticationService.isUserLoggedIn() &&
                    <ListItem button component={"a"} href={HomeRoute.path}>
                        <ListItemText primary={"LOGOUT"}/>
                    </ListItem>
                    }
                    {!AuthenticationService.isUserLoggedIn() && <>
                        <ListItem button component={"a"} href={LoginRoute.path}>
                            <ListItemText primary={"LOGIN"}/>
                        </ListItem>
                        <ListItem button component={"a"} href={SignUpRoute.path}>
                            <ListItemText primary={"SIGN UP"}/>
                        </ListItem>
                    </>
                    }
                </List>
            </div>);
    }

    render() {
        return (
            <React.Fragment>
                <IconButton
                    edge="start"
                    aria-label="menu"
                    onClick={this.toggleDrawer("right", true)}
                >
                    <Menu fontSize="large" style={{color: `white`}}/>
                </IconButton>

                <Drawer
                    anchor="right"
                    open={this.state.anchor.right}
                    onOpen={this.toggleDrawer("right", true)}
                    onClose={this.toggleDrawer("right", false)}
                >
                    {this.sideDrawerList("right")}
                </Drawer>
            </React.Fragment>);
    }

}


SideDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideDrawer);
