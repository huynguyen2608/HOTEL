"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewOrderBLLBase = void 0;
const order_1 = require("./order");
const room_1 = require("../room/room");
const filter_data_handlers_1 = require("../common/filter_data_handlers");
class NewOrderBLLBase {
    constructor(dal, room_bll, customer_bll) {
        this.dal = dal;
        this.room_bll = room_bll;
        this.customer_bll = customer_bll;
    }
    async init() { }
    async GetViewOrder(id) {
        const order = await this.dal.GetOrder(id);
        if (!order || !filter_data_handlers_1.FilterData.One(order)) {
            throw order_1.OrderNS.Errors.OrderNotFound;
        }
        const item = await this.GetItem(order.id);
        if (!item) {
            throw order_1.OrderNS.Errors.ItemNotFound;
        }
        const customer = await this.customer_bll.GetCustomerByOrder(order.customer_id);
        const viewOrder = {
            ...order,
            customer: customer,
            items: [item],
        };
        return viewOrder;
    }
    async ListOrder(query) {
        const orders = await this.dal.ListOrder(query);
        let viewOrderArr = [];
        for (let o of orders) {
            const viewOrder = await this.GetViewOrder(o.id);
            viewOrderArr.push(viewOrder);
        }
        return viewOrderArr;
    }
    async CreateOrder(params) {
        const time = Date.now();
        const { room_id, start, end, amount } = params.itemParams;
        const room = await this.room_bll.GetRoom(room_id);
        const customer = await this.customer_bll.GetCustomer(params.customer_id);
        if (room.status == room_1.RoomNS.RoomStatus.Rent) {
            throw room_1.RoomNS.Errors.RoomAlreadyRent;
        }
        const order = {
            id: order_1.OrderNS.Generator.NewOrderID(),
            code: order_1.OrderNS.Generator.NewOrderCode(),
            status: order_1.OrderNS.OrderStatus.BOOK,
            customer_id: params.customer_id,
            total: room.price * amount,
            ctime: time,
            mtime: time,
        };
        const item = {
            id: order_1.OrderNS.Generator.NewItemID(),
            room_id: room_id,
            order_id: order.id,
            total: room.price * amount,
            amount: amount,
            start: start,
            end: end,
            ctime: time,
            mtime: time,
        };
        room.status = room_1.RoomNS.RoomStatus.Rent;
        await this.room_bll.UpdateRoom(room.id, room);
        await this.dal.CreateOrder(order);
        await this.dal.CreateItem(item);
        return {
            ...order,
            customer: customer,
            items: [
                {
                    ...item,
                    room: room,
                },
            ],
        };
    }
    async UpdateItem(id, params) {
        const item = await this.dal.GetItem(id);
        if (!item || !filter_data_handlers_1.FilterData.One(item)) {
            throw order_1.OrderNS.Errors.ItemNotFound;
        }
        if (params.room_id) {
            const room = await this.room_bll.GetRoom(params.room_id);
            const doc = {
                ...item,
                ...params,
                total: room.price * params.amount,
                mtime: Date.now(),
            };
            await this.dal.UpdateItem(doc);
            return {
                ...doc,
                room: room,
            };
        }
        else {
            const room = await this.room_bll.GetRoom(item.room_id);
            const doc = {
                ...item,
                ...params,
                total: room.price * params.amount,
                mtime: Date.now(),
            };
            await this.dal.UpdateItem(doc);
            return {
                ...doc,
                room: room,
            };
        }
    }
    async UpdateOrder(id, params) {
        console.log(params);
        const order = await this.dal.GetOrder(id);
        if (!order || !filter_data_handlers_1.FilterData.One(order)) {
            throw order_1.OrderNS.Errors.OrderNotFound;
        }
        let item = await this.dal.GetItem(order.id);
        if (!item || !filter_data_handlers_1.FilterData.One(item)) {
            throw order_1.OrderNS.Errors.ItemNotFound;
        }
        const customer = await this.customer_bll.GetCustomer(order.customer_id);
        if (params.status === order_1.OrderNS.OrderStatus.BOOK) {
            //status=new
            const room = await this.room_bll.GetRoom(item.room_id);
            if (params.itemParams.room_id) {
                let updateItem;
                const newRoom = await this.room_bll.GetRoom(params.itemParams.room_id);
                const updateRoom = { ...room, status: room_1.RoomNS.RoomStatus.Empty };
                const updateStatusNewRoom = {
                    ...newRoom,
                    status: room_1.RoomNS.RoomStatus.Rent,
                };
                await this.room_bll.UpdateRoom(newRoom.id, updateStatusNewRoom);
                await this.room_bll.UpdateRoom(room.id, updateRoom);
                order.total = params.itemParams.amount * newRoom.price;
                const doc = await this.UpdateItem(order.id, params.itemParams);
                updateItem = {
                    ...order,
                    customer: customer,
                    items: [doc],
                };
                await this.dal.UpdateOrder(order);
                return updateItem;
            }
            else {
                let updateItem;
                if (params.itemParams) {
                    order.total = params.itemParams.amount * room.price;
                    const doc = await this.UpdateItem(order.id, params.itemParams);
                    updateItem = {
                        ...order,
                        customer: customer,
                        items: [doc],
                    };
                    await this.dal.UpdateOrder(order);
                }
                return updateItem;
            }
        }
        else if (params.status === order_1.OrderNS.OrderStatus.CANCEL) {
            //status=cancel
            const room = await this.room_bll.GetRoom(item.room_id);
            const time = Date.now();
            const doc = {
                ...order,
                status: params.status,
                mtime: time,
            };
            const updateItem = {
                ...item,
                dtime: time,
            };
            room.status = room_1.RoomNS.RoomStatus.Empty;
            await this.room_bll.UpdateRoom(room.id, room);
            await this.dal.UpdateItem(updateItem);
            await this.dal.UpdateOrder(doc);
            return {
                ...doc,
                customer: customer,
                items: [
                    {
                        ...updateItem,
                        room: room,
                    },
                ],
            };
        }
        else if (params.status == order_1.OrderNS.OrderStatus.PAYMENT) {
            // status="payment"
            const room = await this.room_bll.GetRoom(item.room_id);
            const time = Date.now();
            const doc = {
                ...order,
                status: params.status,
                mtime: time,
            };
            await this.dal.UpdateOrder(doc);
            return {
                ...doc,
                customer: customer,
                items: [
                    {
                        ...item,
                        room: room,
                    },
                ],
            };
        }
        else {
            const room = await this.room_bll.GetRoom(item.room_id);
            //status=done
            const time = Date.now();
            const doc = {
                ...order,
                status: params.status,
                mtime: time
            };
            room.status = room_1.RoomNS.RoomStatus.Empty;
            await this.room_bll.UpdateRoom(room.id, room);
            await this.dal.UpdateOrder(doc);
            return {
                ...doc,
                customer: customer,
                items: [{
                        ...item,
                        room: room
                    }]
            };
        }
    }
    async GetItem(order_id) {
        const item = await this.dal.GetItem(order_id);
        if (!item) {
            throw order_1.OrderNS.Errors.ItemNotFound;
        }
        const room = await this.room_bll.GetRoomByItem(item.room_id);
        const doc = {
            ...item,
            room: room,
        };
        return doc;
    }
    async ListItem(room_id) {
        const items = await this.dal.ListItem(room_id);
        return filter_data_handlers_1.FilterData.Many(items);
    }
    async OrderByAmount(query) {
        const orders = await this.dal.ListOrderByReport(query);
        const viewOrderArr = [];
        for (const o of orders) {
            const viewOrder = await this.GetViewOrder(o.id);
            viewOrderArr.push(viewOrder);
        }
        const docs = [
            room_1.RoomNS.QualityType.Bad,
            room_1.RoomNS.QualityType.Medium,
            room_1.RoomNS.QualityType.Good,
            room_1.RoomNS.QualityType.Luxury
        ].map(r => viewOrderArr.filter(o => o.items[0].room.quality === r));
        const report = docs.reduce((total, prev, index) => {
            let result = {};
            switch (index) {
                case +0:
                    result = { ...result, ...order_1.OrderNS.Utils.ReportData(prev, "basic") };
                    break;
                case +1:
                    result = { ...result, ...order_1.OrderNS.Utils.ReportData(prev, "medium") };
                    break;
                case +2:
                    result = { ...result, ...order_1.OrderNS.Utils.ReportData(prev, "good") };
                    break;
                case +3:
                    result = { ...result, ...order_1.OrderNS.Utils.ReportData(prev, "luxury") };
                default:
                    break;
            }
            return { ...total, ...result };
        }, {});
        return report;
    }
}
exports.NewOrderBLLBase = NewOrderBLLBase;
//# sourceMappingURL=order.bll.js.map