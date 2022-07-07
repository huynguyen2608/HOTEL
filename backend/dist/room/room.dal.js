"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomMongoDAL = void 0;
const room_1 = require("./room");
const mongodb_1 = require("../lib/mongodb");
class RoomMongoDAL {
    constructor(db) {
        this.db = db;
        this.col_room = this.db.collection("room");
    }
    async init() {
        this.col_room.createIndex("name", { unique: true, background: true });
    }
    async ListRoom(query) {
        if (Object.keys(query).length === 1) {
            const rooms = await this.col_room
                .find({ status: room_1.RoomNS.RoomStatus.Empty, quality: query.quality })
                .toArray();
            return mongodb_1.FromMongoData.Many(rooms);
        }
        else if (Object.keys(query).length === 2) {
            const { from, to } = query;
            const rooms = await this.col_room
                .find({
                price: { $gte: from, $lte: to },
            })
                .toArray();
            return mongodb_1.FromMongoData.Many(rooms);
        }
        else if (Object.keys(query).length === 3) {
            const rooms = await this.col_room
                .find({
                quality: query.quality,
                price: { $gte: query.from, $lte: query.to },
            })
                .toArray();
            return mongodb_1.FromMongoData.Many(rooms);
        }
        else {
            const rooms = await this.col_room
                .find()
                .toArray();
            return mongodb_1.FromMongoData.Many(rooms);
        }
    }
    async GetRoom(id) {
        const room = await this.col_room.findOne({ _id: id });
        return mongodb_1.FromMongoData.One(room);
    }
    async CreateRoom(room) {
        const doc = mongodb_1.ToMongoData.One(room);
        try {
            await this.col_room.insertOne(doc);
        }
        catch (error) {
            if (error.code === 11000 /* Duplicate */) {
                throw room_1.RoomNS.Errors.RoomExist;
            }
            else {
                throw error;
            }
        }
    }
    async UpdateRoom(room) {
        const doc = mongodb_1.ToMongoData.One(room);
        try {
            await this.col_room.updateOne({ _id: room.id }, { $set: doc });
        }
        catch (error) {
            throw error;
        }
    }
}
exports.RoomMongoDAL = RoomMongoDAL;
//# sourceMappingURL=room.dal.js.map