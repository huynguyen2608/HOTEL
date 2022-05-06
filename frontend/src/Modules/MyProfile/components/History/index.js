import { Typography } from "@mui/material";
import React from "react";
import { Form as FormRender, Input, Button, Label, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import CardHistroty from "../../../../Shared/Components/CardHistory/CardHistory";
import DetailOrder from "../../../../Shared/Components/DetailOrder/DetailOrder";
import MyProfileService from "../../shared/Service";

class MyHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listRoom: [],
      modal: false,
      customer: {}
    };
  }

  fetchApi() {
    const id = this.props.id;
    const status = this.props.status;
    MyProfileService.Get_List_Order(id, status).then(res => {
      console.log(res.data, 12);
      this.setState({
        listRoom: res.data
      })
    }).catch(err => {
      console.log(err);
    })
  }

  componentDidMount() {
    this.fetchApi()
  }



  cancelOrder = (id) => {

    const param = {
      status: 'cancel'
    }
    MyProfileService.Update_order(id, param).then(res => {
      this.setState({
        modal: !this.state.modal
      });
      this.fetchApi()
    }).catch(err => {
      console.log(err);
    })
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  detailPopup = (el) => {

    this.setState({
      modal: !this.state.modal,
      customer: el
    });
  }

  render() {
    const { listRoom, customer } = this.state;
    const status = this.props.status;
    return (
      <div className="MyHistory">
        {listRoom.map(el => {
          return (
            <Row>
              <Col className="text-card" key={el.id} onClick={() => this.detailPopup(el)}>
                <CardHistroty room111={el}></CardHistroty>
              </Col>
            </Row>
          )
        })}
        <Modal className="mt-40 styled_modal" isOpen={this.state.modal} toggle={() => this.toggle()}>
          <ModalHeader toggle={() => this.toggle()}>Danh sách phòng</ModalHeader>
          <ModalBody style={{height: "450px"}}>
            <DetailOrder listOrder={customer} ></DetailOrder>
          </ModalBody>
          {status === 'book' ? <ModalFooter className="footer_style">
            <button className="button-cancel" onClick={() => this.cancelOrder(customer.id)}>Hủy đơn</button>
          </ModalFooter> : null}

        </Modal>
      </div>
    );
  }
}

export default MyHistory;
