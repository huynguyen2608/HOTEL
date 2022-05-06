import { Table, Button, Row, Col, TabContent, TabPane, Nav, NavItem, NavLink, Input } from "reactstrap";
import React, { useState, useEffect } from "react";
import CardService from "../../../../Shared/Components/CardService/CardService";
import { goTo } from "../../../../Constances/Util";
import BookingService from "../../../Booking/Shared/Services"
import { Divider } from "@mui/material";
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup
    .object({
        from: yup
            .number()
            .min(0, 'phải là số dương')
            .required("Trường này không được bỏ trống")

        ,
        to: yup
            .number()
            .required("Trường này không được bỏ trống")
            .min(
                yup.ref('from'),
                "giá kết thúc không thể nhỏ hơn giá bắt đầu")
        ,
    })
    .required();


const ListLocactionHome = (props) => {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [list, setList] = useState([]);

    const [listdefault, setListFeault] = useState([]);

    const [quality, setQuality] = useState('');

    const [type, setType] = useState('');

    const [dropdownOpen, setDropdownOpen] = useState(true)
    const toggle = () => {
        setDropdownOpen(!dropdownOpen)
    }

    const [reRender, setRender] = useState(false)
    const [search, setSearch] = useState({
        from: '',
        to: ''
    })

    // const [filter]

    const fetchApi = async () => {
        await BookingService.Get_List_Room().then(res => {
            res.data.map((el,index) => {
                if(index <12){
                    list.push(el)
                    listdefault.push(el)
                }
              
            })
            setRender(true)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchApi()
    }, [])

    useEffect(() => {
    }, [reRender])

    useEffect(() => {
        if (type !== "") {
            const result = listdefault.filter(el => el.type === type);
            setList(result)
        }
        else {
            setList(listdefault)
        }
    }, [type])

    useEffect(() => {
        if (quality !== "") {
            const result = listdefault.filter(el => el.quality === quality);
            setList(result)
        }
        else {
            setList(listdefault)
        }
    }, [quality])

    const submitClick = (data) => {
        const result = list.filter(el => data.from <= el.price && el.price <= data.to);
        setList(result)
        setDropdownOpen(!dropdownOpen)
    }


    return (
        <>
            <Row className=" d-flex justify-content-center" >
                <Row className="FilterRoom">

                    <Col className="sort" xs="3">
                        <Input type="select" name="quality" value={type} onChange={(el) => setType(el.target.value)}>
                            <option value=''>Tất cả</option>
                            <option value='single'>Giường đơn</option>
                            <option value='couple'>Giường đôi</option>
                            <option value='king'>Giường King</option>
                            <option value='queen'>Giường Queen</option>
                        </Input>
                    </Col>
                    <Col className="sort" xs="3">
                        <Input type="select" value={ quality} onChange={(el) => setQuality(el.target.value)}>
                            <option value=''>Tất cả</option>
                            <option value='basic'>Cơ bản</option>
                            <option value='medium'>Thường</option>
                            <option value='good'>Tốt</option>
                            <option value='luxury'>V.I.P</option>
                        </Input>
                    </Col>
                    <Col className="filter" xs="3">
                        <Row className="filter_button">
                            <Button onClick={toggle}>
                                Tìm kiếm
                            </Button>
                        </Row>
                        <Row hidden={dropdownOpen} className={'filter_dropdown'}>
                            <form onSubmit={handleSubmit(submitClick)}>
                                <Row>
                                    <Col>
                                        <Controller
                                            control={control}
                                            name="from"

                                            render={({
                                                field: { ref, ...field },
                                                fieldState: { error },
                                            }) => (
                                                <>
                                                    <h6>Từ</h6>
                                                    <Input
                                                        className="form-control"
                                                        inputRef={ref}
                                                        placeholder="10.000Đ"
                                                        {...field}
                                                        type='number'
                                                    />
                                                    {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                                </>
                                            )}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Controller
                                            control={control}
                                            name="to"
                                            render={({
                                                field: { ref, ...field },
                                                fieldState: { error },
                                            }) => (
                                                <>
                                                    <h6>Đến</h6>
                                                    <Input
                                                        className="form-control"
                                                        inputRef={ref}
                                                        {...field}
                                                        type='number'
                                                        placeholder="1.000.000Đ"
                                                    />
                                                    {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                                </>
                                            )}
                                        />
                                    </Col>
                                </Row>
                                <Row className='d-flex justify-content-center'>
                                    <Col className='d-flex justify-content-center' xs='12'>
                                        <Button className='btn-signin' type='submit' >Tìm kiếm</Button>
                                    </Col>
                                </Row>
                            </form>
                        </Row>


                    </Col>

                </Row>

            </Row>

            <Row className="listLocation d-flex justify-content-center">
                {
                    list.map((el, i) => {
                        return (
                            <Col key={i} className="Card d-flex justify-content-center" xs="12" sm={6} md={4} lg={3} onClick={() => goTo(`app/booking/${el.id}`)} >
                                <CardService room={el}></CardService>
                            </Col>
                        )
                    })
                }
            </Row>
        </>
    )
}

export default ListLocactionHome