import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import * as React from 'react';
import { Button } from '@mui/material';
import { Col, Row } from 'reactstrap';
import { checkQualityRoom } from '../../../../Constances/Util';
import { reformatDate } from '../../../../Constances/const';

const style = {
  borderRadius: "10px",
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '700px',
  height: '630px',
  bgcolor: 'background.paper',
  border: '0.3px solid #000',
  boxShadow: 24,
  p: 4,
};

const CheckQualityRoom = (role) => {
  switch (role) {
    case 'basic':
      return 'Phòng bình dân';
      break;

    case 'medium':
      return 'Phòng tiêu chuẩn';
      break;

    case 'good':
      return 'Phòng chất lượng cao';
      break;

    case 'luxury':
      return 'Phòng hạng sang';
      break;

    default:
      break;
  }
}

const checkStatus = (status) => {
  switch (status) {
    case 'book':
      return 'Chờ thanh toán';
    case 'payment':
      return 'Đã thanh toán';
    case 'done':
      return 'Đã trả phòng';
    case 'cancel':
      return 'Đã hủy';
    default:
      break;
  }
}

export default function ModalDetail(props) {
  const { infor, isOpen, detailData, CloseModal, PaymentOrder, updateOrder, cancelOrder, doneOrder,rePrintForm  } = props;

  return (
    <div>
      <Modal open={isOpen} onClose={CloseModal} style={{ zIndex: 900 }}>
        <Box sx={style} className="box-detail-order">
          <Row className='row row-heaher'>
            <Col xs="2" className='order-deteil-col col-back '>
              <Typography sx={{
                cursor: 'pointer',
                color: 'blue',
                ':hover': {
                  textDecorationLine: 'underline'
                }
              }} onClick={CloseModal}>   <ArrowBackIosRoundedIcon ></ArrowBackIosRoundedIcon> Back</Typography>
            </Col>
            <Col className='order-deteil-col col-title'>
              <Typography className='title-header' variant="h6" component="h2">
                Chi tiết đơn hàng của : <strong>{infor}</strong>
              </Typography>
            </Col>
          </Row>
          <Typography className='body-detail' sx={{ mt: 2 }}>
            <Row className='row row-body'>
              <Col className="order-deteil-col">
                <strong>Mã đơn hàng : </strong><p> {detailData.code}</p>
              </Col>
              <Col className="order-deteil-col">
                <strong>Trạng thái : </strong>
                <p>
                  {
                    checkStatus(detailData.status)
                  }
                </p>
              </Col>
            </Row>

            <Row className='row row-body'>
              <Col className="order-deteil-col ">
                <strong>Tên khách hàng : </strong><p> {detailData.customer ? detailData.customer.name : ''}</p>
              </Col>
              <Col className="order-deteil-col">
                <strong>Ngày sinh : </strong><p> {detailData.customer ? reformatDate(detailData.customer.birthday) : ''}</p>
              </Col>
            </Row>

            <Row className='row row-body'>
              <Col className="order-deteil-col">
                <strong>Số điện thoại : </strong><p> {detailData.customer ? detailData.customer.phone : ""}</p>
              </Col>
              <Col className="order-deteil-col">
                <strong>CCCD : </strong><p> {detailData.customer ? detailData.customer.cccd : ""}</p>
              </Col>
            </Row>

            <Row className='row row-body'>
              <Col className="order-deteil-col" >
                <strong>Tên phòng : </strong><p> {detailData.items ? detailData.items[0].room.name : ''}</p>
              </Col>
              <Col className="order-deteil-col">
                <strong>Giá phòng: </strong><p> {detailData.items ? detailData.items[0].room.price : ''} vnđ</p>
              </Col>
            </Row>

            <Row className='row row-body'>
              <Col className="order-deteil-col">
                <strong> Chất lượng : </strong><p> {detailData.items ? checkQualityRoom(detailData.items[0].room.quality) : ''}</p>
              </Col>
              <Col className="order-deteil-col">
                <strong>Loại phòng : </strong>
                <p>
                  {
                    detailData.items ?
                      detailData.items[0].room.type === "single" ? "Phòng đơn" : "Phòng đôi"
                      : ""
                  }
                </p>
              </Col>
            </Row>

            <Row className='row row-body'>
              <Col className="order-deteil-col">
                <strong>Từ : </strong><p> {detailData.items ? reformatDate(detailData.items[0].start) : ''}</p>
              </Col>
              <Col className="order-deteil-col">
                <strong>Đến : </strong> <p> {detailData.items ? reformatDate(detailData.items[0].end) : ''}</p>
              </Col>
            </Row>

            <Row className='row row-body'>
              <Col className="order-deteil-col">
                <strong>Số lượng : </strong><p> {detailData.items ? detailData.items[0].amount : ''}</p>
              </Col>
              <Col className="order-deteil-col">
                <strong>Tổng: </strong><p> {detailData.total} vnđ</p>
              </Col>
            </Row>

            <Row className='row row-body'>
              <Col className="order-deteil-col">
                <strong>Hình ảnh : </strong>
                <img
                  className='room-image'
                  style={{ maxHeight: "120px", maxWidth: "200px", margin: "10px" }}
                  src={detailData.items ? detailData.items[0].room.image : ''}
                  alt='text'
                />
              </Col>
            </Row>

          </Typography>
          <Typography className='footer-detail-order'>
            {
              detailData.status === "book" ?
                <>
                  <Button style={{ float: "right", marginLeft: "10px" }} variant='contained' onClick={CloseModal}>Đóng</Button>
                  <Button style={{ float: "right", marginLeft: "10px" }} variant='contained' onClick={cancelOrder}>Hủy đơn</Button>
                  <Button style={{ float: "right", marginLeft: "10px" }} variant='contained' onClick={PaymentOrder}>Thanh toán</Button>
                  <Button style={{ float: "right" }} variant='contained' onClick={() => updateOrder(detailData.id)}>Sửa</Button>

                </>
                :


                detailData.status === "payment" ?
                  <>
                    <Button style={{ float: "right", marginLeft: "10px" }} variant='contained' onClick={CloseModal}>Đóng</Button>
                    <Button style={{ float: "right" }} variant='contained' onClick={doneOrder}>Trả phòng</Button>
                  </>
                  :
                  detailData.status === "done" ?
                    <>
                      <Button style={{ float: "right", marginLeft: "10px" }} variant='contained' onClick={CloseModal}>Đóng</Button>
                      <Button style={{ float: "right" }} variant='contained' onClick={rePrintForm}>In lại hóa đơn</Button>
                    </>
                    : 
                    null
            }
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
