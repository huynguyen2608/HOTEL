import { HttpParamValidators } from "../lib/http";
import * as express from "express";
import {OrderNS} from './order'

export function NewOrderAPI(
    bll:OrderNS.BLL
){
    const ORDER_STATUS=Object.values(OrderNS.OrderStatus)
    const REPORT_STATUS=Object.values(OrderNS.QueryReport)
    const router=express.Router();
    router.get('/order/list',async (req, res)=>{
        const query:OrderNS.QueryOrderParams={}
        if(req.query.status){
         query.status=HttpParamValidators.MustBeOneOf(req.query,"status",ORDER_STATUS)
        }
        if(req.query.customer_id){
        query.customer_id=HttpParamValidators.MustBeString(req.query,"customer_id",8)
        }
        const orders=await bll.ListOrder(query)
        res.json(orders)
    })

    router.get('/order/get', async (req, res)=>{
        const id=HttpParamValidators.MustBeString(req.query,"id",12)
        const order=await bll.GetViewOrder(id)
        res.json(order)
    })

    router.post('/order/create', async (req, res)=>{
        const params:OrderNS.CreateOrderParams={
            customer_id:HttpParamValidators.MustBeString(req.body,"customer_id",8),
            itemParams:{
                room_id:HttpParamValidators.MustBeString(req.body.itemParams,"room_id",8),
                start:HttpParamValidators.MustBeString(req.body.itemParams,"start",10),
                end:HttpParamValidators.MustBeString(req.body.itemParams,"end",10),
                amount:HttpParamValidators.MustBeNumber(req.body.itemParams,"amount")
            }
        }
        const order=await bll.CreateOrder(params)
        res.json(order)
    })

    router.post('/order/update', async (req, res)=>{
        const id=HttpParamValidators.MustBeString(req.query,'id',12)
        let params:OrderNS.UpdateOrderParams={
             status:HttpParamValidators.MustBeOneOf(req.body,'status',ORDER_STATUS)
        }
        if(req.body.itemParams){
            if(req.body.itemParams.room_id){
                params={
                    ...params,
                    itemParams:{
                        room_id:HttpParamValidators.MustBeString(req.body.itemParams,"room_id",8)
                    }
                }
            }
            params.itemParams={
                ...params.itemParams,
                start:HttpParamValidators.MustBeString(req.body.itemParams,"start",10),
                end:HttpParamValidators.MustBeString(req.body.itemParams,"end",10),
                amount:HttpParamValidators.MustBeNumber(req.body.itemParams,"amount")
            }
        }
        const order=await bll.UpdateOrder(id,params)
        res.json(order)
    })

    
    // router.get('/item/list',async (req, res)=>{
    //     const order_id=HttpParamValidators.MustBeString(req.query,'order_id',12)
    //     const items=await bll.ListItem(order_id)
    //     res.json(items)
    // })

    router.get('/item/get',async (req, res)=>{
        const order_id=HttpParamValidators.MustBeString(req.query,"order_id",12)
        const item=await bll.GetItem(order_id)
        res.json(item)
    })

    router.post('/item/update',async (req, res)=>{
        const id=HttpParamValidators.MustBeString(req.query,'id',12)
        const params:OrderNS.UpdateItemParams={}
        if(req.body.room_id){
            params.room_id=HttpParamValidators.MustBeString(req.body,"room_id",8)
        }
        if(req.body.start){
            params.start=HttpParamValidators.MustBeString(req.body,"start",10)
        }
        if(req.body.end){
            params.end=HttpParamValidators.MustBeString(req.body,"end",10)
        }
        const item=await bll.UpdateItem(id,params)
        res.json(item)
    })

    router.get('/report/by_amount',async(req, res)=>{
        const query=HttpParamValidators.MustBeOneOf(req.query,"interval",REPORT_STATUS)
        const orders=await bll.OrderByAmount(query)
        res.json(orders)
    })

    return router
}