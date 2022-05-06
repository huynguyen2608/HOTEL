import rand from "../lib/rand";

export namespace RoomNS {
  export interface Room {
    id: string;
    code: string;
    name: string;
    origin_price: number;
    price: number;
    quality: QualityType;
    amount: number;
    image: string;
    type: RoomType;
    description : string;
    status: RoomStatus;
    ctime: number;
    mtime: number;
    dtime?: number;
  }

  export enum RoomType {
    Single = "single",
    Couple = "couple",
    King = "king",
    Queen = "queen"
  }


  export enum QualityType {
    Bad = "basic",
    Medium = "medium",
    Good = "good",
    Luxury = "luxury",
  }

  export const QUALITY_LABEL=Object.keys(QualityType)

  export interface CreateRoomQuery {
    type?: RoomType;
    quality?:QualityType;
    from?: number;
    to?: number;
  }
  export enum RoomStatus {
    Rent = "rent",
    Empty = "empty",
  }
  export interface CreateRoomParams {
    name: string;
    origin_price: number;
    description : string;
    price: number;
    quality: QualityType;
    amount: number;
    image: string;
    type: RoomType;
    status: RoomStatus;
  }
  export interface UpdateRoomParams {
    name?: string;
    origin_price?: number;
    price?: number;
    quality?: QualityType;
    amount?: number;
    description?: string;
    image?: string;
    type?: RoomType;
    status?: RoomStatus;
  }

  export interface BLL {
    ListRoom(query?: CreateRoomQuery): Promise<Room[]>;
    GetRoom(id: string): Promise<Room>;
    GetRoomByItem(id:string): Promise<Room>;
    CreateRoom(params: CreateRoomParams): Promise<Room>;
    UpdateRoom(id: string, params: UpdateRoomParams): Promise<Room>;
    DeleteRoom(id: string): Promise<Room>;
  }
  export interface DAL {
    ListRoom(query?: CreateRoomQuery): Promise<Room[]>;
    GetRoom(id: string): Promise<Room>;
    CreateRoom(room: Room): Promise<void>;
    UpdateRoom(room: Room): Promise<void>;
  }
  export const Errors = {
    RoomNotFound: new Error("Room not found"),
    RoomExist: new Error("Room already exist"),
    RoomAlreadyRent:new Error("Room already rented")
  };
  export const Generator = {
    NewRoomID: () => rand.uppercase(8),
    NewRoomCode: () => {
      return `Room${rand.number(4)}`;
    },
  };
}
