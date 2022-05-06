import rand from '../lib/rand';
import { RoomNS } from '../room/room'
import { format, startOfWeek } from 'date-fns'
import { CustomerNS } from '../customer/customer'
export namespace OrderNS {
    export interface Order {
        id: string;
        code: string;
        status: OrderStatus;
        total: number;
        customer_id: string;
        ctime: number;
        mtime: number;
    }

    export enum OrderStatus{
        BOOK="book",
        DONE="done",
        PAYMENT="payment",
        CANCEL="cancel",
    }

    export enum QueryReport {
        WEEK = "week",
        DAY = "day",
    }

    export interface CreateOrderParams {
        customer_id: string;
        itemParams: CreateItemParams
    }

    export interface UpdateOrderParams {
        status: OrderStatus;
        itemParams?: UpdateItemParams
    }
    export interface Item {
        id: string;
        room_id: string;
        order_id: string;
        total: number;
        amount: number;
        start: string;
        end: string;
        ctime: number;
        mtime: number;
        dtime?: number;
    }

    export interface CreateItemParams {
        room_id: string;
        start: string;
        end: string;
        amount: number;
    }

    export interface UpdateItemParams {
        room_id?: string;
        start?: string;
        end?: string;
        amount?: number;
    }


    export interface ViewOrder extends Order {
        customer: CustomerNS.Customer
        items: ViewItems[]
    }

    export interface ViewItems extends Item {
        room: RoomNS.Room
    }

    export interface QueryOrderParams {
        status?: OrderStatus,
        customer_id?: string
    }

    export interface InfoReport {
        amount: Array<number>;
        total: Array<number>;
    }
    export interface Report {
        basic: InfoReport;
        medium: InfoReport;
        good: InfoReport;
        luxury: InfoReport;
    }
    export interface BLL {
        ListOrder(query: QueryOrderParams): Promise<ViewOrder[]>
        GetViewOrder(id: string): Promise<ViewOrder>
        CreateOrder(params: CreateOrderParams): Promise<ViewOrder>
        UpdateOrder(id: string, params: UpdateOrderParams): Promise<ViewOrder>
        OrderByAmount(query: QueryReport): Promise<any>

        ListItem(room_id: string): Promise<Item[]>
        GetItem(id: string): Promise<ViewItems>
        UpdateItem(id: string, params: UpdateItemParams): Promise<ViewItems>
    }

    export interface DAL {
        ListOrder(query: QueryOrderParams): Promise<Order[]>
        GetOrder(id: string): Promise<Order>
        CreateOrder(order: Order): Promise<void>
        UpdateOrder(order: Order): Promise<void>
        ListOrderByReport(query: QueryReport): Promise<Order[]>

        ListItem(room_id: string): Promise<Item[]>
        GetItem(order_id: string): Promise<Item>
        CreateItem(item: Item): Promise<void>
        UpdateItem(item: Item): Promise<void>
        // DeleteItem(id:string):Promise<void>
    }

    export const Errors = {
        OrderNotFound: new Error("Order not found"),
        OrderExist: new Error("Order does exist"),
        ItemNotFound: new Error("Item not found"),
        ItemExists: new Error("Item does exist")
    }

    export const Generator = {
        NewOrderID: () => rand.alphabet(12),
        NewOrderCode: () => format(Date.now(), "yyMMddhhmmss"),
        NewItemID: () => rand.alphabet(12),
    }
    export const Utils = {
        TotalMoneyByDay: (viewOrder: Array<any>) => {
            const sum = viewOrder.reduce((init, curr) => {
                return init + curr.total
            }, 0)
            return sum
        },
        FilterOrder: (viewOrder: ViewOrder[]) => {
            const newArr = viewOrder.map(el => {
                return {
                    ...el,
                    day: new Date(el.mtime).toDateString().split(' ')[0]
                }
            })
            return newArr
        },
        FilterReport: (viewArr: Array<any>) => {
            const MonArr = viewArr.filter(el => el.day === "Mon")
            const TueArr = viewArr.filter(el => el.day === "Tue")
            const WedArr = viewArr.filter(el => el.day === "Wed")
            const ThuArr = viewArr.filter(el => el.day === "Thu")
            const FriArr = viewArr.filter(el => el.day === "Fri")
            const SatArr = viewArr.filter(el => el.day === "Sat")
            const SunArr = viewArr.filter(el => el.day === "Sun")
            return [
                { amount: MonArr.length, total: OrderNS.Utils.TotalMoneyByDay(MonArr), day: "Mon" },
                { amount: TueArr.length, total: OrderNS.Utils.TotalMoneyByDay(TueArr), day: "Tue" },
                { amount: WedArr.length, total: OrderNS.Utils.TotalMoneyByDay(WedArr), day: "Wed" },
                { amount: ThuArr.length, total: OrderNS.Utils.TotalMoneyByDay(ThuArr), day: "Thur" },
                { amount: FriArr.length, total: OrderNS.Utils.TotalMoneyByDay(FriArr), day: "Fri" },
                { amount: SatArr.length, total: OrderNS.Utils.TotalMoneyByDay(SatArr), day: "Sat" },
                { amount: SunArr.length, total: OrderNS.Utils.TotalMoneyByDay(SunArr), day: "Sun" }
            ]
        },
        ReportData(array: Array<OrderNS.ViewOrder>, option: "basic" | "medium" | "good" | "luxury") {
            const Info: OrderNS.InfoReport = {
                total: [],
                amount: []
            }
            const obj = {
                [option] : Info
            }
            const ONE_DAY = 24 * 3600e3;
            const startWeek = startOfWeek(Date.now()).getTime() - ONE_DAY * 6;
            array.forEach((r: OrderNS.ViewOrder) => {
                for (let i = +1; i <= 7; i++) {
                  const startOfDay = startWeek + (i - 1) * ONE_DAY;
                  const endOfDay = startWeek + i * ONE_DAY - 1;
                  let count = +0;
                  if (r.ctime >= startOfDay && r.ctime <= endOfDay) {
                    count++;
                    obj[option].total.push(r.total)
                  } else {
                    obj[option].total.push(+0)
                  }
                  obj[option].amount.push(count);
                }
            })
            return obj;
        }
    }
}
