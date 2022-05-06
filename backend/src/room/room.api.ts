import { RoomNS } from "./room";
import * as express from "express";
import { HttpParamValidators } from '../lib/http'
export function NewRoomAPI(
    bll: RoomNS.BLL
) {
    const router = express.Router();
    const quality_type = Object.values(RoomNS.QualityType)
    const type = Object.values(RoomNS.RoomType)
    const status = Object.values(RoomNS.RoomStatus)

    router.get('/room/list', async (req, res) => {
        const query: RoomNS.CreateRoomQuery = {}
        if (req.query.from) {
            query.from = +HttpParamValidators.MustBeString(req.query, 'from')
        }
        if (req.query.to) {
            query.to = +HttpParamValidators.MustBeString(req.query, 'to')
        }
        if (req.query.quality) {
            query.quality = HttpParamValidators.MustBeOneOf(req.query, 'quality', quality_type)
        }
        const rooms = await bll.ListRoom(query)
        res.json(rooms)
    })

    router.get('/room/get', async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, 'id', 8)
        const room = await bll.GetRoom(id)
        res.json(room)
    })

    router.post('/room/create', async (req, res) => {
        const params: RoomNS.CreateRoomParams = {
            name: HttpParamValidators.MustBeString(req.body, 'name', 1),
            description: HttpParamValidators.MustBeString(req.body, 'description', 1),
            origin_price: HttpParamValidators.MustBeNumber(req.body, 'origin_price'),
            price: HttpParamValidators.MustBeNumber(req.body, 'price'),
            amount: HttpParamValidators.MustBeNumber(req.body, 'amount'),
            quality: HttpParamValidators.MustBeOneOf(req.body, 'quality', quality_type),
            image: HttpParamValidators.MustBeString(req.body, 'image'),
            type: HttpParamValidators.MustBeOneOf(req.body, 'type', type),
            status: RoomNS.RoomStatus.Empty
        }
        if(params.price>params.origin_price){
            params.price = params.origin_price;
        }
        if(!params.image.startsWith("http")){
            params.image = "https://media.timeout.com/images/105859033/image.jpg"
        }
        const room = await bll.CreateRoom(params);
        res.json(room);
    })

    router.post('/room/update', async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, 'id', 8)
        const params: RoomNS.UpdateRoomParams = {}
        if (req.body.name) {
            params.name = HttpParamValidators.MustBeString(req.body, 'name', 2)
        }
        if (req.body.origin_price) {
            params.origin_price = HttpParamValidators.MustBeNumber(req.body, 'origin_price')
        }
        if (req.body.price) {
            params.price = HttpParamValidators.MustBeNumber(req.body, 'price')
        }
        if (req.body.quality) {
            params.quality = HttpParamValidators.MustBeOneOf(req.body, 'quality', quality_type)
        }
        if (req.body.amount) {
            params.price = HttpParamValidators.MustBeNumber(req.body, 'amount')
        }
        if (req.body.image) {
            params.image = HttpParamValidators.MustBeString(req.body, 'image')
        }
        if (req.body.description) {
            params.description = HttpParamValidators.MustBeString(req.body, 'description')
        }
        if (req.body.type) {
            params.type = HttpParamValidators.MustBeOneOf(req.body, 'type', type)
        }
        if (req.body.status) {
            params.status = HttpParamValidators.MustBeOneOf(req.body, 'status', status)
        }
        const room = await bll.UpdateRoom(id, params)
        res.json(room)
    })

    router.post('/room/delete', async (req, res) => {
        const id = HttpParamValidators.MustBeString(req.query, 'id', 8)
        const room = await bll.DeleteRoom(id)
        res.json(room)
    })
    return router
}