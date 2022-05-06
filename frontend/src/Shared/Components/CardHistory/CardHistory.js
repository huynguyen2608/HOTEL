import React from "react";
import { Form as FormRender, Input, Button, Label, Row, Col } from "reactstrap";
import { checkStatus } from "../../../Constances/Util";
// import './ca'
class CardHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const order = this.props.room111;
        const items = order?.items
        const room = items[0].room;
        console.log(order);
        return (
            <Row className="CardHistory">
                <div className="CardHistory-card">
                    <img alt="" className="CardHistory-img" src={room?.image}></img>
                    <div className="CardHistory-content">
                        <div className="name"><h3>{room?.name}</h3></div>
                        <div className="role">{checkStatus(order?.status)}</div>
                        <div className="from-to">Từ<b> {items[0]?.start}</b> đến <b>{items[0]?.end}</b> </div>
                        <div className="total">Tổng <b>{order.total}</b></div>
                    </div>
                </div>

            </Row>
        );
    }
}

export default CardHistory;
