import React from "react";
import { Form as FormRender, Input, Button, Label, Row, Col } from "reactstrap";
import Form from "../Form/Form";
import OrderService from "../../Services/OrderService"
import { checkQualityRoom, checkStatus, checkTypeRoom } from "../../../Constances/Util";
import { Divider } from "@mui/material";
import { reformatDate } from "../../../Constances/const";

class PrintForm extends Form {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    checkDay = (day) => {
        switch (day) {
            case 0:
                return "Chủ nhật";
            case 1:
                return "Thứ hai";
            case 2:
                return "Thứ ba";
            case 3:
                return "Thứ tư";
            case 4:
                return "Thứ năm";
            case 5:
                return "Thứ sau";
            case 6:
                return "Thứ bảy";
            default:
                break;
        }
    }



    render() {

        const data = this.props.data;

        const customer = data?.customer

        const item = data?.items ? data?.items[0] : {};

        const room = item?.room

        // const 

        const current = new Date()

        var current_day = current.getDay();
        return (
            <div className="PrintForm" id="PrintForm">
                <Row>
                    <Col xs='6' className="footer-print">
                        <Row className="footer-row name-hotel">
                            <h4>Khách sạn Phương Đông</h4>
                        </Row>
                        <Row className="footer-row">
                            <i><b>Add: 97 Phan Châu Trinh, Đà Nẵng</b></i>
                        </Row>
                        <Row className="footer-row">
                            <i><b>Tell:05113.821.266/ 550.666</b></i>
                        </Row>
                        <Row className="footer-row">
                            <i><b>Email: otc@phuongdong.com.vn</b></i>
                        </Row>
                    </Col>
                </Row>
                <Row className="title-print text-center"><b><h4>Hóa đơn thanh toán dịch vụ</h4></b></Row>
                <Row className="d-flex justify-content-around">
                    <Col sm='5'>
                        {`${this.checkDay(current_day)}, ${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`}
                    </Col>
                    <Col sm='5' className="d-flex justify-content-end">
                        <b>Mã hóa đơn: {data ? data.id : '12345678'}</b>
                    </Col>
                </Row>
                <Row className="row-divider">
                    <Divider className="divider-print"></Divider>
                </Row>
                <Row className="info-print">
                    <Col xs='6' >
                        <Row >
                            <Col sm='5'>Tên</Col>
                            <Col sm='7'>: <b>{customer?.name}</b></Col>
                        </Row>
                        <Row >
                            <Col sm='5'>Địa chỉ</Col>
                            <Col sm='7'>:</Col>
                        </Row>
                        <Row >
                            <Col sm='5'>Điện thoại</Col>
                            <Col sm='7'>: <b>{customer?.phone}</b></Col>
                        </Row>
                        <Row >
                            <Col sm='5'>Mã số thuế</Col>
                            <Col sm='7'>:</Col>
                        </Row>
                        <Row >
                            <Col sm='5'>Phòng</Col>
                            <Col sm='7'>: <b>{room?.name}</b></Col>
                        </Row>
                    </Col>
                    <Col xs='6' >
                        <Row >
                            <Col sm='5'>Ngày đến</Col>
                            <Col sm='7'>: <b>{item? reformatDate(item?.start) : ''}</b> 10:30 sáng</Col>
                        </Row>
                        <Row>
                            <Col sm='5'>Ngày đi</Col>
                            <Col sm='7'>: <b>{item? reformatDate(item?.end): ''}</b> 10:30 sáng</Col>
                        </Row>
                        <Row >
                            <Col sm='5'>Số ngày</Col>
                            <Col sm='7'>: <b>{item?.amount}</b></Col>
                        </Row>
                        <Row >
                            <Col sm='5'>Thu ngân</Col>
                            <Col sm='7'>:</Col>
                        </Row>
                        <Row>
                            <Col sm='5'>Thanh toán</Col>
                            <Col sm='7'>: Thu ngân</Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="row-divider">
                    <Divider className="divider-print"></Divider>
                </Row>
                <Row className="total-print d-flex justify-content-around">
                    <Col xs='4' >
                        <Row >
                            <b>Ngày</b>
                        </Row>
                        <Row >
                        <b>{`${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`}</b>
                        </Row>
                    </Col>
                    <Col xs="6">
                        <Row>
                            <Col xs='6' >
                                <Row >
                                    <b>Chi tiết</b>
                                </Row>
                                <Row >
                                    Tiền phòng
                                </Row>
                            </Col>
                            <Col xs='6' className="text-center">
                                <Row >
                                    <b>Số tiền</b>
                                </Row>
                                <Row >
                                    <span>{item.total}</span>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Divider className="divider-print"></Divider>
                        </Row>
                    </Col>
                </Row>
                <Row className="total-print d-flex justify-content-around">
                    <Col xs='4' className="d-flex justify-content-center">
                      <i>Đã bao gồm thuế VAT</i>
                    </Col>
                    <Col xs="6">
                        <Row>
                            <Col sm='6' className=" d-flex justify-content-end"><b>Tổng Tiền:</b></Col>
                            <Col sm='6' className=" d-flex justify-content-center"><b>{item.total}</b></Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-around">
                    <Col sm='3'>
                        <b>Thu ngân</b>
                    </Col>
                    <Col sm='3'>
                        <b>Khách</b>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PrintForm;
