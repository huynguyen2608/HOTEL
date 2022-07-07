"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomNS = void 0;
const rand_1 = require("../lib/rand");
var RoomNS;
(function (RoomNS) {
    let RoomType;
    (function (RoomType) {
        RoomType["Single"] = "single";
        RoomType["Couple"] = "couple";
        RoomType["King"] = "king";
        RoomType["Queen"] = "queen";
    })(RoomType = RoomNS.RoomType || (RoomNS.RoomType = {}));
    let QualityType;
    (function (QualityType) {
        QualityType["Bad"] = "basic";
        QualityType["Medium"] = "medium";
        QualityType["Good"] = "good";
        QualityType["Luxury"] = "luxury";
    })(QualityType = RoomNS.QualityType || (RoomNS.QualityType = {}));
    RoomNS.QUALITY_LABEL = Object.keys(QualityType);
    let RoomStatus;
    (function (RoomStatus) {
        RoomStatus["Rent"] = "rent";
        RoomStatus["Empty"] = "empty";
    })(RoomStatus = RoomNS.RoomStatus || (RoomNS.RoomStatus = {}));
    RoomNS.Errors = {
        RoomNotFound: new Error("Room not found"),
        RoomExist: new Error("Room already exist"),
        RoomAlreadyRent: new Error("Room already rented")
    };
    RoomNS.Generator = {
        NewRoomID: () => rand_1.default.uppercase(8),
        NewRoomCode: () => {
            return `Room${rand_1.default.number(4)}`;
        },
    };
})(RoomNS = exports.RoomNS || (exports.RoomNS = {}));
//# sourceMappingURL=room.js.map