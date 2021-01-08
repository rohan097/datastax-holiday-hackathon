import React, {Component} from 'react'
import {Redirect, Route} from 'react-router-dom'
import AuthenticationService from "../services/AuthenticationService";
import {LoginRoute} from "./Routes";

class AuthenticatedRoute extends Component {
    render() {
        if (AuthenticationService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to={LoginRoute.path}/>
        }

    }
}

export default AuthenticatedRoute