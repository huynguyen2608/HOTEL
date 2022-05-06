import React, { useState, useEffect } from "react";
import { Row, Col, Input, Label } from 'reactstrap';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import OrderService from '../shared/Service';
import { Button } from "@mui/material";
import ModalDetail from "./OrderDetail/OrderDetail";
import { QualityRoom, reformatDate, removeVietnameseTones } from "../../../Constances/const";
import { goTo } from "../../../Constances/Util";
import { ModalConfirm, ModalNoti, ShareService } from "../../../Shared";
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Loading } from "../../../Shared/Components/Loading/Loading";
import PrintForm from "../../../Shared/Components/PrintForm/PrintForm";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  cursor: 'default',
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1976d2',
    color: '#ffffff'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'default',
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const OrderView = () => {
  const [listOrderInit, setListOrderInit] = useState([]);
  const [listOrder, setListOrder] = useState([]);
  const [detailData, setDetailData] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [infor, setInfor] = useState('');
  const [CheckAPI, setCheckAPI] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [notiMessage, setNotiMess] = useState("")

  const closeFormEdit = () => {
    setNotiMess("");
  };


  useEffect(() => {
    OrderService.GetListOrder().then(res => {
      const result = res.data.map((data) => {
        return {
          ...data,
          quality: QualityRoom.map((quality) => {
            if (quality.value === data.items[0].room.quality) return quality.label
          })
        }
      });
      setListOrder(result);
      setListOrderInit(result);
      setIsLoading(false);
    }).catch(e => console.log(e))
  }, [CheckAPI])

  const getDataOrder = (id) => {

    OrderService.GetOrder(id).then(res => {
      const result = {
        ...res.data,
        quality: QualityRoom.map((quality) => {
          if (quality.value === res.data.items[0].room.quality) return quality.label
        })

      };
      setDetailData(result);
      setInfor(res.data.customer.name)
    }).catch(e => console.log(e))
  };

  const filterOrder = (e) => {
    const result = listOrderInit.filter((item) => item.code.toUpperCase().includes(e.target.value.toUpperCase()) ||
      removeVietnameseTones(item.customer.name).toUpperCase().includes(removeVietnameseTones(e.target.value).toUpperCase()));
    setListOrder(result);
  };

  const filterRoomStatus = (e) => {
    const result = listOrderInit.filter((item) => item.status.includes(e.target.value));
    setListOrder(result);
  };

  const StatusOrder = [
    { status: 'payment' },
    { status: 'done' },
    { status: 'cancel' }
  ];
  const HandleOrder = (value) => {
    setMessage("")
    if (value) {
      if (checkHandle === "payment") {
        OrderService.UpdateOrder(detailData.id, StatusOrder[0]).then(res => {
          setCheckAPI(!CheckAPI);
          getDataOrder(detailData.id);
          ShareService.printhorizontal('PrintForm')
          setNotiMess('Thanh toán thành công!')
        }).catch(e => {
          console.log(e)
          setNotiMess('Có lỗi xảy ra!')
        })
      }
      if (checkHandle === "update") {
        OrderService.UpdateOrder(detailData.id, StatusOrder[1]).then(res => {
          setCheckAPI(!CheckAPI);
          getDataOrder(detailData.id);
          setNotiMess('Trả phòng thành công!')
        }).catch(e => {
          console.log(e)
          setNotiMess('Có lỗi xảy ra!')
        })
      }
      if (checkHandle === "cancel") {
        OrderService.UpdateOrder(detailData.id, StatusOrder[2]).then(res => {
          setCheckAPI(!CheckAPI);
          getDataOrder(detailData.id);
          setIsOpen(false)
          setNotiMess('Hủy thành công!')
        }).catch(e => {
          console.log(e)
          setNotiMess('Có lỗi xảy ra!')
        })
      }
    } else {
      setMessage("");
    }

  };

  const [checkHandle, setCheckHandle] = useState("");

  const CheckRoomPayment = () => {
    setCheckHandle("payment")
    setMessage("Bạn muốn thanh toán phòng!");
  }

  const CheckRoom = () => {
    setCheckHandle("update")
    setMessage("Bạn muốn trả phòng!");
  }

  const cancelOrder = () => {
    setCheckHandle("cancel")
    setMessage("Bạn muốn hủy phòng!");
  }

  const OpenModal = (id) => {
    setIsOpen(true);
    getDataOrder(id);
  }

  const CloseModal = () => {
    setIsOpen(false);
  }

  const updateOrder = (id) => {
    goTo('admin/order/' + id)
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

  const rePrintForm = () => {
    ShareService.printhorizontal('PrintForm')
  }

  return (
    <>
      {isLoading ?
        <>
          <Loading />
        </> :
        <>
          <Row className="OrderView">
            <Row><h3>Danh sách đơn hàng</h3></Row>
            <Row className="Order-filter ">
              <Col className="search" xs="4" >
                <Input
                  className='filter-input'
                  type="text"
                  placeholder='Tìm theo tên khách hàng, mã đơn hàng...'
                  onChange={filterOrder}
                ></Input>
              </Col>

              <Col xs="2">

                <Input
                  name="customer_id"
                  onChange={(el) => filterRoomStatus(el)}
                  type='select'>
                  <option value=''>Tất cả</option>
                  <option value='book'>Chờ thanh toán</option>
                  <option value='payment'>Đã thanh toán</option>
                  <option value='done'>Đã trả phòng</option>
                  <option value='cancel'>Đã hủy phòng</option>
                </Input>
              </Col>

              <Col>
                <Button
                  style={{ float: 'right' }}
                  className="btn-search"
                  variant="contained"
                  onClick={() => { goTo('admin/order/create') }}
                >Thêm mới</Button>
              </Col>

            </Row>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell >STT</StyledTableCell>
                    <StyledTableCell align="center">Mã đơn hàng </StyledTableCell>
                    <StyledTableCell align="center">Tên khách hàng</StyledTableCell>
                    <StyledTableCell align="center">Tên phòng</StyledTableCell>
                    <StyledTableCell align="center">Loại phòng</StyledTableCell>
                    <StyledTableCell align="center">Giá</StyledTableCell>
                    <StyledTableCell align="center">Từ</StyledTableCell>
                    <StyledTableCell align="center">Đến</StyledTableCell>
                    <StyledTableCell align="center">Tổng</StyledTableCell>
                    <StyledTableCell align="center">trạng thái</StyledTableCell>
                    <StyledTableCell align="center">Tùy chọn</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listOrder.map((row, index) => (
                    <StyledTableRow key={row.code}>
                      <StyledTableCell >{index + 1}</StyledTableCell>
                      <StyledTableCell component="th" scope="row" align="left">{row.code}</StyledTableCell>
                      <StyledTableCell align="center">{row.customer.name}</StyledTableCell>
                      <StyledTableCell align="center">{row.items[0].room.name}</StyledTableCell>
                      <StyledTableCell align="center">{row.quality}</StyledTableCell>
                      <StyledTableCell align="center">{row.items[0].room.price}</StyledTableCell>
                      <StyledTableCell align="center">{reformatDate(row.items[0].start)}</StyledTableCell>
                      <StyledTableCell align="center">{reformatDate(row.items[0].end)}</StyledTableCell>
                      <StyledTableCell align="center">{row.total}</StyledTableCell>
                      <StyledTableCell align="center">
                        {checkStatus(row.status)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <VisibilityIcon
                          onClick={() => OpenModal(row.id)}
                        />
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <ModalConfirm
              message={message}
              answer={HandleOrder}
            />

            <ModalNoti message={notiMessage} done={closeFormEdit} />

            <ModalDetail
              detailData={detailData}
              isOpen={isOpen}
              CloseModal={CloseModal}
              infor={infor}
              PaymentOrder={CheckRoomPayment}
              doneOrder={CheckRoom}
              updateOrder={updateOrder}
              cancelOrder={cancelOrder}
              rePrintForm={rePrintForm}
            />
            <div hidden>
              <PrintForm data={detailData} ></PrintForm>
            </div>
          </Row>
        </>
      }
    </>
  )
}

export default OrderView;