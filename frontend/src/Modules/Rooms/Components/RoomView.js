import React, { useState, useEffect } from "react";
import { Row, Col, Input, Button, Label } from 'reactstrap';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import RoomService from '../shared/Service';
import { QualityRoom, removeVietnameseTones } from "../../../Constances/const";
import { ModalConfirm, ModalNoti } from "../../../Shared";
import { goTo } from "../../../Constances/Util";
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



const RoomView = (props) => {
  const [listRoomInit, setListRoomInit] = useState([]);
  const [listRoom, setListRoom] = useState([]);
  const [inputValue, setInputValue] = useState('')
  const [checkAPI, setCheckAPI] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const data = JSON.parse(sessionStorage.getItem('user'));
  const { customer } = data;

  useEffect(() => {
    RoomService.Get_List_Room().then(res => {
      const result = res.data.map((data) => {
        return {
          ...data,
          quality: QualityRoom.map((quality) => {
            if (quality.value === data.quality) return quality.label
          })
        }
      });
      setListRoom(result);
      setListRoomInit(result);
      setIsLoading(false);
    })
      .catch(err => console.log(err))
  }, [checkAPI])

  const filterRoom = (e) => {
    setInputValue(e.target.value);
    const result = listRoomInit.filter((item) =>
      (item.price + '').includes(e.target.value) ||
      removeVietnameseTones(item.name).toUpperCase().includes(removeVietnameseTones(e.target.value).toUpperCase()));
    setListRoom(result);
  };

  const filterRoomStatus = (e) => {
    const result = listRoomInit.filter((item) => item.status.includes(e.target.value));
    setListRoom(result);
  };

  const [message, setMessage] = useState("")
  const [noti, setNoti] = useState("");
  const [idRoom, setIdRoom] = useState("")

  const DeleteRoom = (id) => {
    setMessage("B???n c?? mu???n x??a ph??ng!");
    setIdRoom(id);
  }

  const handleDelete = (id) => {
    if (id) {
      RoomService.Delete_Room(idRoom).then(res => {
        setNoti("???? x??a th??nh c??ng");
        setMessage("");
        setCheckAPI(!checkAPI);
      })
    } else {
      setMessage("");
    }
  }

  const updateRoom = (id) => {
    goTo('admin/room/' + id)
  }

  const closeFormEdit = () => {
    setNoti("");
  };

  return (
    <>
      {isLoading ?
        <>
          <Loading />
        </> :
        <>
          <Row className="RoomView">
            <Row><h3>Danh s??ch ph??ng</h3></Row>
            <Row className="Order-filter ">

              <Col className="search" xs="4" >
                <Input
                  className='filter-input'
                  type="text"
                  placeholder='T??m ki???m theo t??n ph??ng, gi?? ph??ng...'
                  defaultValue={inputValue}
                  onChange={filterRoom}
                ></Input>
              </Col>

              <Col xs='2'>
                <Input
                  placeholder="Status"
                  name="customer_id"
                  onChange={(el) => filterRoomStatus(el)}
                  type='select'>
                  <option value=''>T???t c???</option>
                  <option value='empty'>??ang tr???ng</option>
                  <option value='rent'>???? ???????c thu??</option>
                </Input>
              </Col>

              <Col>
                <Col>
                  <Button
                    style={{ float: 'right' }}
                    className="btn-search"
                    variant="contained"
                    onClick={() => { goTo('admin/room/create') }}
                    hidden={customer.role === 'staff'}
                  >Th??m m???i</Button>
                </Col>
              </Col>
            </Row>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">STT </StyledTableCell>
                    <StyledTableCell align="left">T??n ph??ng </StyledTableCell>
                    <StyledTableCell align="center">Tr???ng th??i</StyledTableCell>
                    <StyledTableCell align="center">Lo???i ph??ng</StyledTableCell>
                    <StyledTableCell align="center">Ki???u ph??ng</StyledTableCell>
                    <StyledTableCell align="center">Gi??</StyledTableCell>
                    <StyledTableCell align="center">H??nh ???nh</StyledTableCell>
                    <StyledTableCell align="center" hidden={customer.role === 'staff'}>T??y ch???n</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listRoom.map((row, index) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell align="center">{index + 1}</StyledTableCell>
                      <StyledTableCell component="th" scope="row">{row.name}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row.status === "empty" ? "??ang tr???ng" : "???? ???????c thu??"}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.quality}</StyledTableCell>
                      <StyledTableCell align="center">
                        {row.type === "single" ? "Ph??ng ????n" : "Ph??ng ????i"}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.price}</StyledTableCell>
                      <StyledTableCell align="center">
                        <img
                          style={{ maxHeight: "70px", maxWidth: "100px" }}
                          src={row.image}
                          alt='text'
                        />
                      </StyledTableCell>
                      <StyledTableCell hidden={customer.role === 'staff'} align="center">
                        <VisibilityIcon style={{ marginRight: "6px" }} onClick={() => updateRoom(row.id)} />
                        <DeleteIcon style={{ marginLeft: "6px" }} onClick={() => DeleteRoom(row.id)} />
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

export default RoomView