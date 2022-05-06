

import { Http } from "../../../Helper/http";

const API_ENDPOINT = {
    UPDATE_CUSTOMER: '/customer/customer/update?id=',
    GET_LIST_ORDER: '/order/order/list?status=',
    SET_PASS_WORD: '/auth/customer/set_password',
    UPDATE_ORDER: '/order/order/update?id='
};

class MyProfileService {
    constructor() {

        if (MyProfileService._instance) {
            return MyProfileService._instance;
        }
        MyProfileService._instance = this;
    }
    Update_Customer(id, param) {
        return Http.post(API_ENDPOINT.UPDATE_CUSTOMER + id, param)
    }
    Get_List_Order(id, status) {
        return Http.get(API_ENDPOINT.GET_LIST_ORDER + status + '&customer_id=' + id)
    }
    Set_PassWord(data){
        return Http.post(API_ENDPOINT.SET_PASS_WORD, data)
    }
    Update_order(id,data){
        return Http.post(API_ENDPOINT.UPDATE_ORDER + id, data)
    }

}

const instance = new MyProfileService();

export default instance;
