

import { Http } from "../../../Helper/http";

const API_ENDPOINT = {
    GET_LIST_CUS: '/customer/customer/list',
    CREATE_CUS: '/customer/customer/create',
    SET_PASSWORD: '/auth/customer/set_password',
    GET_ID_CUS: '/customer/customer/get?id=',
    DELETE_CUS:"/customer/customer/delete?id=",
    UPDATE_CUS: '/customer/customer/update?id='
};

class CustomerService {
    constructor() {

        if (CustomerService._instance) {
            return CustomerService._instance;
        }
        CustomerService._instance = this;
    }

    Get_List_Cus() {
        return Http.get(API_ENDPOINT.GET_LIST_CUS)
    }
    Create_Cus(param) {
        return Http.post(API_ENDPOINT.CREATE_CUS, param)
    }
    Set_Password(params) {
        return Http.post(API_ENDPOINT.SET_PASSWORD, params)
    }
    Get_Id_Cus(id) {
        return Http.get(API_ENDPOINT.GET_ID_CUS + id)
    }
    /// Viết hoa chữ cái ddaauff nha a :))

    delete_Cus(id) {
        return Http.post(API_ENDPOINT.DELETE_CUS + id)
    }

    Update_Cus(id, param){
        return Http.post(API_ENDPOINT.UPDATE_CUS + id, param)
    }
}

const instance = new CustomerService();

export default instance;
