import { Http } from "../../Helper/http";

const API_ENDPOINT = {
   GET_LIST_ORDER: '/order/order/list?status=',
   GET_ORDER_BY_ID : '/order/order/get?id='
};

class OrderService {
    constructor() {

        if (OrderService._instance) {
            return OrderService._instance;
        }
        OrderService._instance = this;
    }
  
    Get_List_Order(id, status){
        return Http.get(API_ENDPOINT.GET_LIST_ORDER + status + '&customer_id='+ id)
    }
    Get_Order_by_Id (id){
        return Http.get(API_ENDPOINT.GET_ORDER_BY_ID + id)
    }
    
}

const instance = new OrderService();

export default instance;
