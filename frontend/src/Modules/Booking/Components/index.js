import React from "react"
import { Row } from "reactstrap"
import ListLocactionRoom from "./RoomList"

const BookingViewView = (props) => {

    return (
        <div className="view-room-list">
            <Row><ListLocactionRoom></ListLocactionRoom></Row>
        </div>
    )
}

export default BookingViewView