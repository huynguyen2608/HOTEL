import { HttpError, HttpStatusCodes } from "../lib/http";
import { RoomNS } from "../room/room";
import {OrderNS} from '../order/order'
import { CustomerNS } from "../customer/customer";
const commonErrors = new Set([
    ...Object.values(RoomNS.Errors),
   ...Object.values(OrderNS.Errors),
   ...Object.values(CustomerNS.Errors)
]);


export function HttpErrorHandler(err, req, res, next) {
    if (commonErrors.has(err)) {
        err = new HttpError(err.message, HttpStatusCodes.BadRequest);
    }
    if (err && typeof err.HttpStatusCode === "function") {
        const message = err.message;
        res.status(err.HttpStatusCode() || 500).json({
            error: message,
        });
        return;
    }
    res.status(500).send({
        error: "internal server error",
    });
}