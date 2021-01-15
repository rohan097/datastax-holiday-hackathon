import React, {Component} from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PostsPage from "./PostsPage";
import HomePage from "./HomePage";
import {LoginRoute, PostsRoute, SignUpRoute} from "../utils/Routes";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";
import IndividualPostPage from "./IndividualPostPage";

class MainPage extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path={PostsRoute.path} component={PostsPage}/>
                    <Route path={SignUpRoute.path} component={SignUpPage}/>
                    <Route path={LoginRoute.path} component={LoginPage}/>
                    <Route path={"/post/:userId/:postId"} component={IndividualPostPage}/>
                </Switch>
            </Router>
        );
    }
}

export default MainPage;
