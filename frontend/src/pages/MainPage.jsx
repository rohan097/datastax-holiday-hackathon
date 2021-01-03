import React, {Component} from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ExperiencesPage from "./ExperiencesPage";
import HomePage from "./HomePage";
import {ExperiencesRoute, SignUpRoute} from "../utils/Routes";
import SignUpPage from "./SignUpPage";

class MainPage extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path={ExperiencesRoute.path} component={ExperiencesPage}/>
                    <Route path={SignUpRoute.path} component={SignUpPage}/>
                </Switch>
            </Router>
        );
    }
}

export default MainPage;
