import { OrderNS } from "./order";
import { RoomNS } from "../room/room";
import { CustomerNS } from "../customer/customer";
import { FilterData } from "../common/filter_data_handlers";
export class NewOrderBLLBase implements OrderNS.BLL {
  constructor(
    private dal: OrderNS.DAL,
    private room_bll: RoomNS.BLL,
    private customer_bll: CustomerNS.BLL
  ) { }

  async init() { }

  async GetViewOrder(id: string) {
    const order = await this.dal.GetOrder(id);
    if (!order || !FilterData.One(order)) {
      throw OrderNS.Errors.OrderNotFound;
    }
    const item = await this.GetItem(order.id);
    if (!item) {
      throw OrderNS.Errors.ItemNotFound;
    }
    const customer = await this.customer_bll.GetCustomerByOrder(
      order.customer_id
    );
    const viewOrder: OrderNS.ViewOrder = {
      ...order,
      customer: customer,
      items: [item],
    };
    return viewOrder;
  }

  async ListOrder(query: OrderNS.QueryOrderParams) {
    const orders = await this.dal.ListOrder(query);
    let viewOrderArr: Array<OrderNS.ViewOrder> = [];
    for (let o of orders) {
      const viewOrder = await this.GetViewOrder(o.id);
      viewOrderArr.push(viewOrder);
    }
    return viewOrderArr;
  }

  async CreateOrder(params: OrderNS.CreateOrderParams) {
    const time = Date.now();
    const { room_id, start, end, amount } = params.itemParams;
    const room = await this.room_bll.GetRoom(room_id);
    const customer = await this.customer_bll.GetCustomer(params.customer_id);
    if (room.status == RoomNS.RoomStatus.Rent) {
      throw RoomNS.Errors.RoomAlreadyRent;
    }
    const order = {
      id: OrderNS.Generator.NewOrderID(),
      code: OrderNS.Generator.NewOrderCode(),
      status: OrderNS.OrderStatus.BOOK,
      customer_id: params.customer_id,
      total: room.price * amount,
      ctime: time,
      mtime: time,
    };
    const item = {
      id: OrderNS.Generator.NewItemID(),
      room_id: room_id,
      order_id: order.id,
      total: room.price * amount,
      amount: amount,
      start: start,
      end: end,
      ctime: time,
      mtime: time,
    };
    room.status = RoomNS.RoomStatus.Rent;
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

  async UpdateItem(id: string, params: OrderNS.UpdateItemParams) {
    const item = await this.dal.GetItem(id);
    if (!item || !FilterData.One(item)) {
      throw OrderNS.Errors.ItemNotFound;
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
    } else {
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

  async UpdateOrder(id: string, params: OrderNS.UpdateOrderParams) {
    console.log(params);
    const order = await this.dal.GetOrder(id);
    if (!order || !FilterData.One(order)) {
      throw OrderNS.Errors.OrderNotFound;
    }
    let item = await this.dal.GetItem(order.id);
    if (!item || !FilterData.One(item)) {
      throw OrderNS.Errors.ItemNotFound;
    }
    const customer = await this.customer_bll.GetCustomer(order.customer_id);
    if (params.status === OrderNS.OrderStatus.BOOK) {
      //status=new
      const room = await this.room_bll.GetRoom(item.room_id);
      if (params.itemParams.room_id) {
        let updateItem: OrderNS.ViewOrder;
        const newRoom = await this.room_bll.GetRoom(params.itemParams.room_id);
        const updateRoom = { ...room, status: RoomNS.RoomStatus.Empty };
        const updateStatusNewRoom = {
          ...newRoom,
          status: RoomNS.RoomStatus.Rent,
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
      } else {
        let updateItem: OrderNS.ViewOrder;
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
    } else if (params.status === OrderNS.OrderStatus.CANCEL) {
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
      room.status = RoomNS.RoomStatus.Empty;
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
    } else if (params.status == OrderNS.OrderStatus.PAYMENT) {
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
    else{
      const room=await this.room_bll.GetRoom(item.room_id);
      //status=done
      const time = Date.now();
      const doc={
        ...order,
        status:params.status,
        mtime:time
      }
      room.status= RoomNS.RoomStatus.Empty
      await this.room_bll.UpdateRoom(room.id,room)
      await this.dal.UpdateOrder(doc)
      return {
        ...doc,
        customer: customer,
        items:[{
          ...item,
          room:room
        }]
      }
    }
  }

  async GetItem(order_id: string) {
    const item = await this.dal.GetItem(order_id);
    if (!item) {
      throw OrderNS.Errors.ItemNotFound;
    }
    const room = await this.room_bll.GetRoomByItem(item.room_id);
    const doc: OrderNS.ViewItems = {
      ...item,
      room: room,
    };
    return doc;
  }

  async ListItem(room_id: string) {
    const items = await this.dal.ListItem(room_id);
    return FilterData.Many<OrderNS.Item>(items);
  }


  async OrderByAmount(query: OrderNS.QueryReport) {
    const orders = await this.dal.ListOrderByReport(query);
    const viewOrderArr = [] as OrderNS.ViewOrder[];
    for (const o of orders) {
      const viewOrder = await this.GetViewOrder(o.id)
      viewOrderArr.push(viewOrder)
    }
    const docs = [
      RoomNS.QualityType.Bad, 
      RoomNS.QualityType.Medium, 
      RoomNS.QualityType.Good, 
      RoomNS.QualityType.Luxury].map(r => viewOrderArr.filter(o => o.items[0].room.quality === r));

    const report = docs.reduce((total, prev, index) => {
      let result = {};
      switch (index) {
        case +0:
          result = {...result, ...OrderNS.Utils.ReportData(prev, "basic")};
          break;
        case +1:
          result = {...result, ...OrderNS.Utils.ReportData(prev, "medium")};
          break;
        case +2:
          result = {...result, ...OrderNS.Utils.ReportData(prev, "good")};
            break;
        case +3:
          result = {...result, ...OrderNS.Utils.ReportData(prev, "luxury")};
        default:
          break;
      }
      return { ...total, ...result }
    }, {})
    return report;
  }
}





