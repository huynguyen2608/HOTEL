import { UtilService } from "../";
import { EQUAL_ARRAY, LOCALSTORAGE } from "../../Constances/const";
import { Http } from "../../Helper/http";

const API_ENDPOINT = {
    LOGIN: "/auth/login",
    ME: "/auth/me", 
    SEND_MALI: '/mail/mail/sendMail'
};

class AuthService extends UtilService {
    constructor() {
        super();
        if (AuthService._instance) {
            return AuthService._instance;
        }
        AuthService._instance = this;
    }

    userInfo = JSON.parse(window.sessionStorage.getItem(LOCALSTORAGE.USER) || 'null');
    idLocation = JSON.parse(window.sessionStorage.getItem(LOCALSTORAGE.LOCATION) || 'null');
    async login(username, password) {
        return (await Http.post(API_ENDPOINT.LOGIN, { username, password })).data;
    }

    async getUserInfo() {
        return (await Http.get(API_ENDPOINT.ME)).data;
    }
    
    hasRole(roles) {
        if (!roles || !this.userInfo) return;
        return EQUAL_ARRAY(this.userInfo.roles, roles);
    }

    isRole(role) {
        if (!role || !this.userInfo) return;
        const roles = this.userInfo.roles
        if(roles.includes(role)) return true;
        return false
    }

    Send_Mail_To_My_Gmail(param){
       return Http.post(API_ENDPOINT.SEND_MALI, param)
    }

}

const instance = new AuthService();

export default instance;
