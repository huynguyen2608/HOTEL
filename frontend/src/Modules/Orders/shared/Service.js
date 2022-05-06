

import { Http } from "../../../Helper/http";

const API_ENDPOINT = {
    GET_LIST_ORDER: '/order/order/list?status=',
    LIST_ORDER: "/order/order/list",
    GET_ORDER: '/order/order/get',
    UPDATE_ORDER:'/order/order/update?id=',
    CREATE_ORDER:"/order/order/create",
    CREATE_CUSTOMER:"/customer/customer/create",
    GET_LIST_ROOM: '/room/room/list?status=',
};

class OrderService {
    constructor() {

        if (OrderService._instance) {
            return OrderService._instance;
        }
        OrderService._instance = this;
    }
  
    GetListOrder() {
        return Http.get(API_ENDPOINT.LIST_ORDER)
    }

    Get_List_Order(id, status){
        return Http.get(API_ENDPOINT.GET_LIST_ORDER + status + '&customer_id='+ id)
    }

    GetOrder(id) {
        return Http.get(API_ENDPOINT.GET_ORDER + `?id=${id}`)
    }

    UpdateOrder(id, payload) {
        return Http.post(API_ENDPOINT.UPDATE_ORDER + id, payload)
    }

    CreateOrder( payload) {
        return Http.post(API_ENDPOINT.CREATE_ORDER , payload)
    }

    CreateCustomer(payload) {
        return Http.post(API_ENDPOINT.CREATE_CUSTOMER, payload)
    }

    Get_List_ID_ROOM( status){
        return Http.get(API_ENDPOINT.GET_LIST_ROOM + status)
    }
}

const instance = new OrderService();

export default instance;
