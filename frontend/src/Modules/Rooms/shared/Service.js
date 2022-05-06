

import { Http } from "../../../Helper/http";

const API_ENDPOINT = {
   GET_LIST_ROOM: '/room/room/list',
   DELETE_ROOM:"/room/room/delete?id=",
   GET_ID_ROOM:"/room/room/get?id=",
   CREATE_ROOM:"/room/room/create",
   UPDATE_ROOM:"/room/room/update?id="

};

class RoomService {
    constructor() {

        if (RoomService._instance) {
            return RoomService._instance;
        }
        RoomService._instance = this;
    }
  
    Get_List_Room(){
        return Http.get(API_ENDPOINT.GET_LIST_ROOM)
    }

    Delete_Room(id) {
        return Http.post(API_ENDPOINT.DELETE_ROOM + id)
    }

    Create_Room(payload) {
        return Http.post(API_ENDPOINT.CREATE_ROOM, payload )
    }

    Update_Room(id, payload) {
        return Http.post(API_ENDPOINT.UPDATE_ROOM + id, payload)
    }

    Get_Room(id) {
        return Http.get(API_ENDPOINT.GET_ID_ROOM + id)
    }
}

const instance = new RoomService();

export default instance;
