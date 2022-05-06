import { Button, Row, Col, Input, Popover, PopoverBody, PopoverHeader, UncontrolledPopover } from "reactstrap";
import CardService from "../../../../Shared/Components/CardService/CardService";
import React, { useState, useEffect } from "react";
import { goTo } from "../../../../Constances/Util";
import BookingService from '../../Shared/Services';
import { Divider } from "@mui/material";
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonForAll } from "../../../../Shared/Components/Button/ButtonForAll";
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


function ListLocactionRoom(props) {

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

    const [dropdownOpen, setDropdownOpen] = useState(true);


    const [typeSearch, setTypeSearch] = useState(false);

    

    const toggle = () => {
        setDropdownOpen(!dropdownOpen);
        setList(listdefault);
        setTypeSearch(!typeSearch)
    }

    const [reRender, setRender] = useState(false)
    const [search, setSearch] = useState({
        from: '',
        to: ''
    })


    const fetchApi = async () => {
        await BookingService.Get_List_Room().then(res => {
            res.data.map(el => {
                if (el.status === 'empty') {
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
        console.log(result);
        
        setList(result)
        setDropdownOpen(!dropdownOpen)
    }


    // const cancelSearch = () => {
    //     setList(listdefault)
    //     setTypeSearch(false)
    //     setDropdownOpen(!dropdownOpen)
    // }

    return (
        <>
            <Row className="listLocation" >
                <Row className="title-text-room  mb-0">
                    <p>ROOM</p>
                    <h1>Danh sách phòng</h1>
                </Row>
                <Row className="justify-content-center  mb-0" >
                    <Row className="justify-content-center  mb-0">
                        <Col xs="3">
                            <Input className="filter-room-list" type="select" name="quality" value={type} onChange={(el) => setType(el.target.value)}>
                                <option value=''>Tất cả</option>
                                <option value='single'>Giường đơn</option>
                                <option value='couple'>Giường đôi</option>
                                <option value='king'>Giường King</option>
                                <option value='queen'>Giường Queen</option>
                            </Input>
                        </Col>
                        <Col xs="3">
                            <Input className="filter-room-list" type="select" value={quality} onChange={(el) => setQuality(el.target.value)}>
                                <option value=''>Tất cả</option>
                                <option value='basic'>Cơ bản</option>
                                <option value='medium'>Thường</option>
                                <option value='good'>Tốt</option>
                                <option value='luxury'>V.I.P</option>
                            </Input>
                        </Col>
                        <Col xs="3">
                            <Row>
                                <button id="PopoverClick" type="button" onClick={toggle} className="button-main">{typeSearch? 'hủy' : 'Tìm kiếm'}</button>
                            </Row>
                            <UncontrolledPopover placement="right"
                                target="PopoverClick"
                                trigger="click">
                                <PopoverHeader>Lọc theo giá</PopoverHeader>
                                <PopoverBody>
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
                                                    <button className='button-main' type='submit' >Tìm kiếm</button>
                                                </Col>
                                            </Row>
                                        </form>

                                    </Row>

                                </PopoverBody>
                            </UncontrolledPopover>
                        </Col>
                    </Row>
                </Row>
                <Row>
                    {
                        list.map((el, i) => {
                            return (

                                <CardService room={el} />
                            )
                        })
                    }
                </Row>
            </Row>

        </>

    )
}



export default ListLocactionRoom