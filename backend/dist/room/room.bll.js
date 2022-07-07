"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewRoomBLLBase = void 0;
const room_1 = require("./room");
const order_1 = require("../order/order");
const filter_data_handlers_1 = require("../common/filter_data_handlers");
class NewRoomBLLBase {
    constructor(dal, orderDAL) {
        this.dal = dal;
        this.orderDAL = orderDAL;
    }
    async init() { }
    async ListRoom(query) {
        if (query) {
            const rooms = await this.dal.ListRoom(query);
            return filter_data_handlers_1.FilterData.Many(rooms);
        }
        const rooms = await this.dal.ListRoom();
        return filter_data_handlers_1.FilterData.Many(rooms);
    }
    async GetRoom(id) {
        const room = await this.dal.GetRoom(id);
        if (!room || !filter_data_handlers_1.FilterData.One(room)) {
            throw room_1.RoomNS.Errors.RoomNotFound;
        }
        return room;
    }
    async GetRoomByItem(id) {
        const room = await this.dal.GetRoom(id);
        if (!room) {
            throw room_1.RoomNS.Errors.RoomNotFound;
        }
        return room;
    }
    async CreateRoom(params) {
        const doc = {
            id: room_1.RoomNS.Generator.NewRoomID(),
            code: room_1.RoomNS.Generator.NewRoomCode(),
            ...params,
            ctime: Date.now(),
            mtime: Date.now()
        };
        await this.dal.CreateRoom(doc);
        return doc;
    }
    async UpdateRoom(id, params) {
        const room = await this.GetRoom(id);
        const doc = {
            ...room,
            ...params,
            mtime: Date.now(),
        };
        if (params.price) {
            const items = await this.orderDAL.ListItem(room.id);
            for (let i of items) {
                const order = await this.orderDAL.GetOrder(i.order_id);
                if (order.status == order_1.OrderNS.OrderStatus.BOOK) {
                    const newOrder = {
                        ...order,
                        total: i.amount * params.price
                    };
                    await this.orderDAL.UpdateOrder(newOrder);
                }
            }
        }
        await this.dal.UpdateRoom(doc);
        return doc;
    }
    async DeleteRoom(id) {
        const room = await this.GetRoom(id);
        const doc = {
            ...room,
            dtime: Date.now()
        };
        await this.dal.UpdateRoom(doc);
        return doc;
    }
}
exports.NewRoomBLLBase = NewRoomBLLBase;
//# sourceMappingURL=room.bll.js.map