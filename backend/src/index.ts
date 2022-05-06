import { ReadConfig } from "./config";
import * as express from "express";
import * as cors from "cors";
import "./lib/express";
import "./ext/log";
import { ExpressStaticFallback } from "./lib/express";
import { HttpErrorHandler } from "./common/http_errror_handler";
import { MongoCommon } from "./lib/mongodb";
import { ContextBLLBase } from "./ext/ctx.bll";

import { NewRoomAPI } from "./room/room.api";
import { NewRoomBLLBase } from "./room/room.bll";
import { RoomMongoDAL } from "./room/room.dal";

import { NewOrderAPI } from "./order/order.api";
import { NewOrderBLLBase } from "./order/order.bll";
import { OrderMongoDAL } from "./order/order.dal";

import { NewCustomerAPI } from "./customer/customer.api";
import { NewCustomerBLLBase } from "./customer/customer.bll";
import { CustomerMongoDAL } from "./customer/customer.dal";

import { CustomerAuthNS } from "./auth/auth";
import { NewAuthAPI } from "./auth/auth.api";
import { CustomerAuthBLLBase } from "./auth/auth.bll.base";
import { CustomerAuthDALMongo } from "./auth/auth.dal.mongo";

import {NewMailAPI} from './mail/mail.api'
async function main() {
  const config = await ReadConfig();
  console.log(config);
  const client = await MongoCommon.Connect(config.database.db_url);
  console.log("Connect to database");
  const db = client.db(config.database.db_name);
  
  /*******************************************************/
  const customerDAL = new CustomerMongoDAL(db);
  customerDAL.init();
  const customerBLL = new NewCustomerBLLBase(customerDAL);
  customerBLL.init();
  /*******************************************************/
  /********************************************************/
  const roomDAL = new RoomMongoDAL(db);
  roomDAL.init();
  const orderDAL = new OrderMongoDAL(db);
  orderDAL.init();
  const roomBLL = new NewRoomBLLBase(roomDAL,orderDAL);
  roomBLL.init();
  const orderBLL = new NewOrderBLLBase(orderDAL, roomBLL,customerBLL);
  orderBLL.init();
  /*******************************************************/

  const authDAL = new CustomerAuthDALMongo(db);
  authDAL.init();
  const authBLL = new CustomerAuthBLLBase(authDAL, customerBLL);
  authBLL.init();
  /*******************************************************/

  const app = express();
  app.use(express.json());
  app.disable("x-powered-by");
  app.use(cors());
  /*******************************************************/
  app.use("/api/customer", NewCustomerAPI(customerBLL,authBLL));
  app.use("/api/room", NewRoomAPI(roomBLL));
  app.use("/api/order", NewOrderAPI(orderBLL));
  app.use("/api/auth",NewAuthAPI(authBLL));
  app.use("/api/mail",NewMailAPI());
  /*******************************************************/
  app.use("/", ExpressStaticFallback(config.app.dir));
  app.use(HttpErrorHandler);
  console.log(`listen on ${config.server.port}`);
  app.listen(config.server.port, "0.0.0.0", () => {
    const err = arguments[0];
    if (err) {
      console.log(err);
    }
  });
}
main().catch((err) => console.log(err));
