import { RoomNS } from "./room";
import { Db } from "mongodb";
import {
  FromMongoData,
  MongoErrorCodes,
  MongoModel,
  ToMongoData,
} from "../lib/mongodb";
export class RoomMongoDAL implements RoomNS.DAL {
  constructor(private db: Db) {}

  private col_room = this.db.collection<MongoModel<RoomNS.Room>>("room");

  async init() {
    this.col_room.createIndex("name", { unique: true, background: true });
  }

  async ListRoom(query: RoomNS.CreateRoomQuery) {
    if (Object.keys(query).length === 1) {
        const rooms = await this.col_room
          .find({ status: RoomNS.RoomStatus.Empty, quality: query.quality })
          .toArray();
        return FromMongoData.Many<RoomNS.Room>(rooms);
    } else if (Object.keys(query).length === 2) {
        const { from, to } = query;
        const rooms = await this.col_room
          .find({
            price: { $gte: from, $lte: to },
          })
          .toArray();
        return FromMongoData.Many<RoomNS.Room>(rooms);
    } else if (Object.keys(query).length === 3) {
        const rooms = await this.col_room
          .find({
            quality: query.quality,
            price: { $gte: query.from, $lte: query.to },
          })
          .toArray();
        return FromMongoData.Many<RoomNS.Room>(rooms);
    } else {
      const rooms = await this.col_room
        .find()
        .toArray();
      return FromMongoData.Many<RoomNS.Room>(rooms);
    }
  }

  async GetRoom(id: string) {
    const room = await this.col_room.findOne({ _id: id });
    return FromMongoData.One<RoomNS.Room>(room);
  }

  async CreateRoom(room: RoomNS.Room) {
    const doc = ToMongoData.One<RoomNS.Room>(room);
    try {
      await this.col_room.insertOne(doc);
    } catch (error) {
      if (error.code === MongoErrorCodes.Duplicate) {
        throw RoomNS.Errors.RoomExist;
      } else {
        throw error;
      }
    }
  }

  async UpdateRoom(room: RoomNS.Room) {
    const doc = ToMongoData.One<RoomNS.Room>(room);
    try {
      await this.col_room.updateOne({ _id: room.id }, { $set: doc });
    } catch (error) {
      throw error;
    }
  }
}
