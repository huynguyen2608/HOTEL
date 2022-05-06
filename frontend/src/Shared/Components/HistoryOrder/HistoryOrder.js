import React from "react";
import { Form as FormRender, Input, Button, Label, Row, Col } from "reactstrap";
import Form from "../Form/Form";
import OrderService from "../../Services/OrderService"
import { checkQualityRoom, checkStatus, checkTypeRoom } from "../../../Constances/Util";
import { ButtonForAll } from '../Button/ButtonForAll';
import { reformatDate } from "../../../Constances/const";
class HistoryOrder extends Form {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      listOrder: {}
    };
  }

  onchangeSearch = (el) => {
    this.setState({
      search: el.target.value
    })
  }

  onClickSearch = () => {
    const { search } = this.state
    OrderService.Get_Order_by_Id(search).then(res => {
      this.setState({
        listOrder: res.data
      })
    }).catch(err => {
      console.log(err);
    })
  }



  render() {
    const { search, listOrder } = this.state;
    const items = listOrder?.items
    const room = items ? items[0].room : {}
    return (
      <div className="HistoryOrder">
        <Row className="d-flex justify-content-center " >
          <Col className="middle">
            <h1>THÔNG TIN TRA CỨU</h1>
          </Col>
          <Row className="d-flex justify-content-center ">
            <Col xs="4" >
              <Input className="search-order" placeholder="Nhập mã đơn" value={search} onChange={(el) => { this.onchangeSearch(el) }} ></Input>
            </Col>

            <Col xs='3'>
              <button className="button-search" onClick={() => { this.onClickSearch() }}>Tìm kiếm</button>
            </Col>
          </Row>

        </Row>


        <Row className="HistoryOrder-list">
          <Col xs="6" className="his-col">
            Họ và tên: <b>{listOrder?.customer?.name}</b>
          </Col>
          <Col xs="6" className="his-col">
            Ngày sinh: <b>{listOrder ?reformatDate(listOrder?.customer?.birthday): ''}</b>
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
          <Col xs="12" className="his-col">
            Trạng thái : <b>{checkStatus(listOrder?.status)}</b>
          </Col>
        </Row>
      </div>
    );
  }
}

export default HistoryOrder;
