import React, { useState, useEffect } from "react";
import { Row, Col, Input } from 'reactstrap';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomerService from '../Shared/Service';
import { Button } from "@mui/material";
import { goTo } from "../../../Constances/Util";
import { ModalConfirm, ModalNoti } from "../../../Shared";
import { reformatDate, removeVietnameseTones } from "../../../Constances/const";
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { Loading } from "../../../Shared/Components/Loading/Loading";

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


const CustomerView = (props) => {
  const [listCusInit, setListCusInit] = useState([]);
  const [listCus, setListCus] = useState([]);
  const [checkAPI, setCheckAPI] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const data = JSON.parse(sessionStorage.getItem('user'));
  const { customer } = data;

  useEffect(() => {
    CustomerService.Get_List_Cus().then(res => {
      setListCus(res.data);
      setListCusInit(res.data);
      setIsLoading(false);
    }).catch(err => {
      console.log(err);
    })
  }, [checkAPI])

  const filterCustomer = (e) => {
    const result = listCusInit.filter((item) =>
      item.phone.includes(e.target.value) ||
      removeVietnameseTones(item.name).toUpperCase().includes(removeVietnameseTones(e.target.value).toUpperCase()));
    setListCus(result);
  };

  const updateCus = (id) => {
    goTo('admin/customer/' + id)
  }

  const [message, setMessage] = useState("")
  const [noti, setNoti] = useState("");
  const [idCus, setIdCus] = useState("")

  const DeleteCus = (id) => {
    setMessage("B???n c?? mu???n x??a ng?????i d??ng!");
    setIdCus(id);
  }

  const handleDelete = (value) => {
    if (value) {
      CustomerService.delete_Cus(idCus).then(res => {
        setNoti("???? x??a th??nh c??ng");
        setMessage("");
        setCheckAPI(!checkAPI);
      })
    } else {
      setMessage("");
    }
  }

  const closeFormEdit = () => {
    setNoti("");
  };


  const checkRole = (role) => {
    switch (role) {
      case 'admin':
        return 'Qu???n tr??? vi??n';
      case 'staff':
        return 'Nh??n vi??n';
      case 'customer':
        return 'Kh??ch h??ng';
      default:
        break;
    }
  }

  return (
    <>
      {isLoading ?
        <>
          <Loading />
        </> :
        <>
          <Row className="CustomerView">
            <Row><h3>Danh s??ch kh??ch h??ng</h3></Row>
            <Row className="Order-filter ">
              <Col className="search" xs="4" >
                <Input
                  className='filter-input'
                  type="text"
                  placeholder='T??m ki???m theo t??n, s??? ??i???n tho???i...'
                  // defaultValue={inputValue}
                  onChange={filterCustomer}
                ></Input>
              </Col>

              {/* <Col>
          <Button className="" variant="contained" onClick={() => { onClickSearch() }}>T??m ki???m</Button>
        </Col> */}
              <Col>
                <Button style={{ float: 'right' }} hidden={customer.role === 'staff'} variant="contained" onClick={() => { goTo('admin/customer/create') }}>Th??m m???i</Button>
              </Col>
            </Row>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Stt </StyledTableCell>
                    <StyledTableCell align="left">H??? t??n</StyledTableCell>
                    <StyledTableCell align="center">Ng??y sinh</StyledTableCell>
                    <StyledTableCell align="center">Vai tr??</StyledTableCell>
                    <StyledTableCell align="center">T??i kho???n</StyledTableCell>
                    <StyledTableCell align="center">CCCD</StyledTableCell>
                    <StyledTableCell align="center">S??? ??i???n tho???i</StyledTableCell>
                    <StyledTableCell hidden={customer.role === 'staff'} align="center">T??y ch???n</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listCus.filter(el => el.role === 'customer').map((row, index) => (
                    <StyledTableRow key={row.id}>
                    <StyledTableCell >{index + 1}</StyledTableCell>
                    <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                    <StyledTableCell align="center">{reformatDate(row.birthday)}</StyledTableCell>
                    <StyledTableCell align="center">{checkRole(row.role)}</StyledTableCell>
                    {data.customer.role === "admin" &&
                      <>
                       <StyledTableCell align="center">{row.username}</StyledTableCell> 
                       <StyledTableCell align="center">{row.cccd}</StyledTableCell>
                      <StyledTableCell align="center">{row.phone}</StyledTableCell>
                      </>
                    }
                    {data.customer.role !== "admin" &&
                      <>
                       <StyledTableCell align="center">*****</StyledTableCell> 
                       <StyledTableCell align="center">*****</StyledTableCell>
                      <StyledTableCell align="center">*****</StyledTableCell>
                      </>
                    }
                    <StyledTableCell hidden={customer.role === 'staff'} align="center">
                      <VisibilityIcon style={{ marginRight: "6px" }} onClick={() => updateCus(row.id)} />
                      <DeleteIcon style={{ marginLeft: "6px" }} onClick={() => DeleteCus(row.id)} />
                    </StyledTableCell>
                  </StyledTableRow>
                  ))}
                </TableBody>  
              </Table>
            </TableContainer>
            <ModalNoti message={noti} done={closeFormEdit} />
            <ModalConfirm message={message} answer={handleDelete} />
          </Row>
        </>
      }
    </>
  )
}

export default CustomerView;