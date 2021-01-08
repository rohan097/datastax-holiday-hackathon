import axios from "axios";
import jwtDecode from "jwt-decode";
// import {AUTHENTICATE, BASIC_AUTH, FORGOT_PASSWORD} from "../utils/Enpoints";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";
export const USER_TOKEN = "token";
var myHour = new Date();

class AuthenticationService {
    // executeBasicAuthenticationService(username, password) {
    //     return axios.get(BASIC_AUTH, {
    //         headers: {authorization: this.createBasicAuthToken(username, password)}
    //     });
    // }
    //
    // executeJwtAuthenticationService(username, password) {
    //     console.log(username);
    //     return axios.post(AUTHENTICATE, {
    //         username,
    //         password
    //     });
    // }

    // forgotPasswordService(username) {
    //     console.log(username);
    //     return axios.post(FORGOT_PASSWORD, {
    //         username
    //     });
    // }

    // createBasicAuthToken(username, password) {
    //     return "Basic " + window.btoa(username + ":" + password);
    // }
    //
    // registerSuccessfulLogin(username, password) {
    //     //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
    //     //console.log('registerSuccessfulLogin')
    //     localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    //     this.setupAxiosInterceptors(this.createBasicAuthToken(username, password));
    // }
    //
    registerSuccessfulLoginForJwt(username, token) {
        console.log(username);
        let tokenDetails = jwtDecode(token);
        myHour.setHours(myHour.getHours() + 1); //one hour from now
        localStorage.setItem('storedData', myHour);
        console.log("token----", tokenDetails);
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        localStorage.setItem(USER_TOKEN, this.createJWTToken(token));
        // localStorage.setItem("name", tokenDetails.details.name);
        this.setupAxiosInterceptors();
    }

    createJWTToken(token) {
        return "Bearer " + token;
    }

    logout() {
        localStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        localStorage.removeItem(USER_TOKEN);
        localStorage.removeItem("name");
    }

    isUserLoggedIn() {
        let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        console.log("User logged in: " + (user !== null))
        return user !== null;

    }

    //
    // getLoggedInUserName() {
    //     let user = localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    //     if (user === null) return "";
    //     return user;
    // }
    //
    setupAxiosInterceptors() {
        axios.interceptors.request.use((config) => {
            if (this.isUserLoggedIn()) {
                config.headers.authorization = localStorage.getItem(USER_TOKEN);
            }
            return config;
        });
    }

    //
    //
    // getRoleForCurrentUser() {
    //     let token = localStorage.getItem("token");
    //     token = token.replace("Bearer ", "");
    //     let tokenDetails = jwtDecode(token);
    //     return tokenDetails.details.role;
    // }

}

export default new AuthenticationService();
