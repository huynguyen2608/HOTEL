listRoom:
http://localhost:3000/api/room/room/list (?from=&?to=&?quality=)

getRoom:
http://localhost:3000/api/room/room/get?id=

createRoom:
http://localhost:3000/api/room/room/create
body:{
name,
price,
origin_price,
quality(basic || medium || good || luxury ),
image,
type(single || couple)
}

updateRoom:
http://localhost:3000/api/room/room/update?id=
body:
name?: string;
origin_price?: number;
price?: number;
quality?: (basic || medium || good || luxury );
image?: string;
type?: (couple||single);
status?: RoomStatus;

deleteRoom:
http://localhost:3000/api/room/room/delete?id=

createOrder:
http://localhost:3000/api/order/order/create
body:
{
customer_id
itemParams:{
room_id
start
end
total
}
}

listOrder:
http://localhost:3000/api/order/order/list?status=&customer_id= (status=new||cancel||done)

getOrder:
http://localhost:3000/api/order/order/get?id=

updateOrder:
http://localhost:3000/api/order/order/update?id=
body
{
status:(new||done||cancel),
itemParams:{
    start:,
    end:,
    total:
}
}
