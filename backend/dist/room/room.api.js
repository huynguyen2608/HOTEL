"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewRoomAPI = void 0;
const room_1 = require("./room");
const express = require("express");
const http_1 = require("../lib/http");
function NewRoomAPI(bll) {
    const router = express.Router();
    const quality_type = Object.values(room_1.RoomNS.QualityType);
    const type = Object.values(room_1.RoomNS.RoomType);
    const status = Object.values(room_1.RoomNS.RoomStatus);
    router.get('/room/list', async (req, res) => {
        const query = {};
        if (req.query.from) {
            query.from = +http_1.HttpParamValidators.MustBeString(req.query, 'from');
        }
        if (req.query.to) {
            query.to = +http_1.HttpParamValidators.MustBeString(req.query, 'to');
        }
        if (req.query.quality) {
            query.quality = http_1.HttpParamValidators.MustBeOneOf(req.query, 'quality', quality_type);
        }
        const rooms = await bll.ListRoom(query);
        res.json(rooms);
    });
    router.get('/room/get', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, 'id', 8);
        const room = await bll.GetRoom(id);
        res.json(room);
    });
    router.post('/room/create', async (req, res) => {
        const params = {
            name: http_1.HttpParamValidators.MustBeString(req.body, 'name', 1),
            description: http_1.HttpParamValidators.MustBeString(req.body, 'description', 1),
            origin_price: http_1.HttpParamValidators.MustBeNumber(req.body, 'origin_price'),
            price: http_1.HttpParamValidators.MustBeNumber(req.body, 'price'),
            amount: http_1.HttpParamValidators.MustBeNumber(req.body, 'amount'),
            quality: http_1.HttpParamValidators.MustBeOneOf(req.body, 'quality', quality_type),
            image: http_1.HttpParamValidators.MustBeString(req.body, 'image'),
            type: http_1.HttpParamValidators.MustBeOneOf(req.body, 'type', type),
            status: room_1.RoomNS.RoomStatus.Empty
        };
        if (params.price > params.origin_price) {
            params.price = params.origin_price;
        }
        if (!params.image.startsWith("http")) {
            params.image = "https://media.timeout.com/images/105859033/image.jpg";
        }
        const room = await bll.CreateRoom(params);
        res.json(room);
    });
    router.post('/room/update', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, 'id', 8);
        const params = {};
        if (req.body.name) {
            params.name = http_1.HttpParamValidators.MustBeString(req.body, 'name', 2);
        }
        if (req.body.origin_price) {
            params.origin_price = http_1.HttpParamValidators.MustBeNumber(req.body, 'origin_price');
        }
        if (req.body.price) {
            params.price = http_1.HttpParamValidators.MustBeNumber(req.body, 'price');
        }
        if (req.body.quality) {
            params.quality = http_1.HttpParamValidators.MustBeOneOf(req.body, 'quality', quality_type);
        }
        if (req.body.amount) {
            params.price = http_1.HttpParamValidators.MustBeNumber(req.body, 'amount');
        }
        if (req.body.image) {
            params.image = http_1.HttpParamValidators.MustBeString(req.body, 'image');
        }
        if (req.body.description) {
            params.description = http_1.HttpParamValidators.MustBeString(req.body, 'description');
        }
        if (req.body.type) {
            params.type = http_1.HttpParamValidators.MustBeOneOf(req.body, 'type', type);
        }
        if (req.body.status) {
            params.status = http_1.HttpParamValidators.MustBeOneOf(req.body, 'status', status);
        }
        const room = await bll.UpdateRoom(id, params);
        res.json(room);
    });
    router.post('/room/delete', async (req, res) => {
        const id = http_1.HttpParamValidators.MustBeString(req.query, 'id', 8);
        const room = await bll.DeleteRoom(id);
        res.json(room);
    });
    return router;
}
exports.NewRoomAPI = NewRoomAPI;
//# sourceMappingURL=room.api.js.map