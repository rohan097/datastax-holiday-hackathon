import React, {Component} from "react";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ExperiencesPage from "../pages/ExperiencesPage";
import HomePage from "../pages/HomePage";
import {Container} from "@material-ui/core";

class MainPage extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" exact component={HomePage}/>
                    <Route path="/experiences" component={ExperiencesPage}/>
                </Switch>
            </Router>
        );
    }
}

export default MainPage;
