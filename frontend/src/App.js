import './App.css';
import MainPage from "./pages/MainPage";
import React, {Component} from "react";
import ReactGA from 'react-ga';
import AuthenticationService from "./services/AuthenticationService";

class App extends Component {
  componentDidMount() {
    const trackingId = "";
    ReactGA.initialize(trackingId);
    ReactGA.set({
      userId: AuthenticationService.getLoggerInUser()
    })
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

  render() {
    return (
        <MainPage/>
    );
  }
}

export default App;