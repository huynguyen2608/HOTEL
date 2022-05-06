import { RoomNS } from "./room";
import { OrderNS } from "../order/order";
import {FilterData} from '../common/filter_data_handlers'
export class NewRoomBLLBase implements RoomNS.BLL{
    constructor(private dal:RoomNS.DAL, private orderDAL:OrderNS.DAL){}

    async init(){}

    async ListRoom(query:RoomNS.CreateRoomQuery){
        if(query){
            const rooms=await this.dal.ListRoom(query);
            return FilterData.Many<RoomNS.Room>(rooms)

        }
        const rooms = await this.dal.ListRoom()
        return FilterData.Many<RoomNS.Room>(rooms)
    }
    
    async GetRoom(id:string){
        const room=await this.dal.GetRoom(id)
        if(!room|| !FilterData.One(room)){
            throw RoomNS.Errors.RoomNotFound
        }
        return room
    }

    async GetRoomByItem(id:string){
        const room=await this.dal.GetRoom(id)
        if(!room){
            throw RoomNS.Errors.RoomNotFound
        }
        return room
    }

    async CreateRoom(params:RoomNS.CreateRoomParams){
        const doc={
            id:RoomNS.Generator.NewRoomID(),
            code:RoomNS.Generator.NewRoomCode(),
            ...params,
            ctime:Date.now(),
            mtime:Date.now()
        }
        await this.dal.CreateRoom(doc)
        return doc
    }

    async UpdateRoom(id:string,params:RoomNS.UpdateRoomParams){
        const room=await this.GetRoom(id)
        const doc={
            ...room,
            ...params,
            mtime:Date.now(),
        }
        if(params.price){
            const items=await this.orderDAL.ListItem(room.id)
            for(let i of items){
                const order=await this.orderDAL.GetOrder(i.order_id)
                if(order.status==OrderNS.OrderStatus.BOOK){
                    const newOrder={
                        ...order,
                        total:i.amount* params.price
                    }
                    await this.orderDAL.UpdateOrder(newOrder)
                }
            }
        }
       await this.dal.UpdateRoom(doc)
        return doc
    }
    async DeleteRoom(id:string){
        const room=await this.GetRoom(id)
        const doc={
            ...room,
            dtime:Date.now()
        }
        await this.dal.UpdateRoom(doc)
        return doc
    }
}