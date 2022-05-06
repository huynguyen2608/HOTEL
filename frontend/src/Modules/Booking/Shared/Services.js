

import { Http } from "../../../Helper/http";

const API_ENDPOINT = {
    // ROOM
    LIST_ROOM: '/room/room/list',
    GET_ROOM: '/room/room/get?id=',

    // CUSTOMER
    CREATE_CUSTOMER: '/customer/customer/create',

    // ORDER
    CREATE_ORDER: '/order/order/create',
    UPDATE_ORDER: '/order/order/update?id=',

};

class BookingService {
    constructor() {

        if (BookingService._instance) {
            return BookingService._instance;
        }
        BookingService._instance = this;
    }
    Get_List_Room() {
        return Http.get(API_ENDPOINT.LIST_ROOM);
    }
    Get_Id_Room(id) {
        return Http.get(API_ENDPOINT.GET_ROOM + id);
    }
    Create_Cumstomer(params){
        return Http.post(API_ENDPOINT.CREATE_CUSTOMER, params)
    }
    Create_Order(params){
        return Http.post(API_ENDPOINT.CREATE_ORDER, params)
    }
    Update_Order(id, param){
        return Http.post(API_ENDPOINT.UPDATE_ORDER + id, param)
    }



}

const instance = new BookingService();

export default instance;
