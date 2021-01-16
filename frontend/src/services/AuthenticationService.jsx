// import {AUTHENTICATE, BASIC_AUTH, FORGOT_PASSWORD} from "../utils/Enpoints";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser";
export const USER_TOKEN = "token";
var myHour = new Date();

class AuthenticationService {

    registerSuccessfulLoginForJwt(username, token) {
        myHour.setHours(myHour.getHours() + 1); //one hour from now
        localStorage.setItem('storedData', myHour);
        localStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        localStorage.setItem(USER_TOKEN, this.createJWTToken(token));
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
        return user !== null;

    }

}

export default new AuthenticationService();
