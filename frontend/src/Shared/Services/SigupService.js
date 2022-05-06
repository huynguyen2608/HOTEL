import { UtilService } from "..";
import { Http } from "../../Helper/http";

const API_ENDPOINT = {
 CREATE_CUSTOMER: '/customer/customer/create',
 SET_PASSWORD: '/auth/customer/set_password',
};

class SignUpService extends UtilService {
    constructor() {
        super();
        if (SignUpService._instance) {
            return SignUpService._instance;
        }
        SignUpService._instance = this;
    }


    Create_Customer(params){
        return Http.post(API_ENDPOINT.CREATE_CUSTOMER, params)
    }

    Set_Password(params){
        return Http.post(API_ENDPOINT.SET_PASSWORD, params)
    }


}

const instance = new SignUpService();

export default instance;
