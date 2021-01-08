import React, {Component} from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ExperiencesPage from "./ExperiencesPage";
import HomePage from "./HomePage";
import {ExperiencesRoute, LoginRoute, SignUpRoute} from "../utils/Routes";
import SignUpPage from "./SignUpPage";
import LoginPage from "./LoginPage";

class MainPage extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path={ExperiencesRoute.path} component={ExperiencesPage}/>
                    <Route path={SignUpRoute.path} component={SignUpPage}/>
                    <Route path={LoginRoute.path} component={LoginPage}/>
                </Switch>
            </Router>
        );
    }
}

export default MainPage;
