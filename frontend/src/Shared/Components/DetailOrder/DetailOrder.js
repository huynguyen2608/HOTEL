import React from "react";
import { Form as FormRender, Input, Button, Label, Row, Col } from "reactstrap";
import Form from "../Form/Form";
import OrderService from "../../Services/OrderService"
import { checkQualityRoom, checkTypeRoom } from "../../../Constances/Util";
import { reformatDate } from "../../../Constances/const";

class DetailOrder extends Form {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  render() {
    const {listOrder } = this.props;
    console.log(listOrder);
    const items = listOrder?.items
    const room = items ? items[0].room : {}
    return (
      <div className="HistoryOrder" style={{ color: 'black'}}>
        <Row className="HistoryOrder-list">
          <Col xs="6" className="his-col">
            Họ và tên: <b>{listOrder?.customer?.name}</b>
          </Col>
          <Col xs="6" className="his-col">
            Ngày sinh: <b>{listOrder ? reformatDate(listOrder?.customer?.birthday) : ''}</b>
          </Col>
          <Col xs="6" className="his-col">
            CCCD: <b>{listOrder?.customer?.cccd}</b>
          </Col>
          <Col xs="6" className="his-col">
            Số điện thoại: <b>{listOrder?.customer?.phone}</b>
          </Col>
            <Col xs="12" className="his-col">
              Tên phòng: <b>{room?.name}</b>
            </Col>
            <Col xs="12" className="his-col">
              Loại phòng: <b>{checkQualityRoom(room?.quality)}</b>
            </Col>
            <Col xs="12" className="his-col">
              Kiểu: <b>{checkTypeRoom(room?.type)}</b>
            </Col>
            <Col xs="12" className="his-col">
              Giá phòng: <b>{room?.price} VNĐ</b>
            </Col>
            <Col xs="12" className="his-col">
              Ngày nhận: <b>{items ? reformatDate(items[0]?.start) : ''}</b>
            </Col>
            <Col xs="12" className="his-col">
              Ngày trả: <b>{items ? reformatDate(items[0]?.end) : ''}</b>
            </Col>
            <Col xs="12" className="his-col">
              Tổng tiền: <b>{listOrder?.total} VNĐ</b>
            </Col>
        </Row>
      </div>
    );
  }
}

export default DetailOrder;
