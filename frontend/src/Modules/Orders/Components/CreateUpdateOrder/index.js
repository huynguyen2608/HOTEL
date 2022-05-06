import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Row, Col, Input } from 'reactstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from "@mui/material";
import { ModalNoti } from "../../../../Shared";
import { checkQualityRoom, checkTypeRoom, goTo } from "../../../../Constances/Util";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import OrderService from '../../shared/Service';

const schema = yup
    .object({
        name: yup
            .string()
            .min(2, "Tối thiểu 2 chữ cái")
            .max(50, "Tối đa 50 chữ cái")
            .required("Họ Tên không được bỏ trống")
        ,
        numberPhone: yup
            .string()
            .required("Số điện thoại không được bỏ trống")
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                "Số điện thoại không đúng đị dạng"
            )
        ,
        cccd: yup
            .number()
            .required("Căn cước công dân không được bỏ trống")
            .test('len', 'Sai định dạng cmt hoặc cccd', cccd => cccd.toString().length == 10 || cccd.toString().length == 12)
        ,
        birthday: yup
            .date()
            .max(new Date(Date.now() - 567648000000), "Bạn chưa đủ 18 tuổi")
            .required("Ngày sinh không được bỏ trống")
        ,

        start: yup.date()
            .min(new Date(Date.now() - 86400000), "Ngày nhận phòng không nhỏ hơn ngày hiện tại")
            .required("Ngày nhận phòng không được bỏ trống"),
        end: yup.date().min(
            yup.ref('start'),
            "Ngày kết thúc không thể nhỏ hơn ngày bắt đầu")
            .required("Ngày trả phòng không được bỏ trống")

        ,
        room_id: yup
            .string()
            .required("ID phòng không được bỏ trống")
        ,
    })


const CreateUpdateOrder = (props) => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [dataOrder, setDataOrder] = useState({})
    const [message, setMassage] = useState('');
    const [signUpStatus, setStatus] = useState(false);
    const [statusUpdate, setStatusUpdate] = useState(false);
    const [idRoom, setIdRoom] = useState([])

    useEffect(() => {
        const id = props.match.params.id
        if (id) {
            setStatusUpdate(true);
            OrderService.GetOrder(id).then(res => {
                setDataOrder(res.data)
                const data = res.data;
                const items = res.data.items[0];
                
                reset({
                    name: data.name? data.name :'huy',
                    status: data.status,
                    birthday: data.customer.birthday,
                    cccd:data.customer.cccd,
                    numberPhone:data.customer.numberPhone ? data.customer.numberPhone:'0987654321',
                    room_id: items.room_id,
                    start: items.start,
                    end: items.end,
                    amount: items.amount
                })
            }).catch(err => console.log(err))
        }
    }, [statusUpdate])

    useEffect(() => {
        OrderService.Get_List_ID_ROOM("empty").then(res => {
            const result = res.data.filter(el => el.status === 'empty').map(data => {
                return {
                    value: data.id,
                    label: data.name,
                    type:data.type,
                    quality: data.quality
                }
            })
            console.log(result)
            setIdRoom(result)
        })
    }, [])

    const submitClick = (data) => {
        console.log(data)

        if (!statusUpdate) {
            const params = {
                name: data.name,
                role: "customer",
                birthday: data.birthday.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10),
                cccd: data.cccd.toString(),
                phone: data.numberPhone
            }
            OrderService.CreateCustomer(params).then(res => {
                const amount = (data.end.valueOf() - data.start.valueOf()) / 86400000;
                const params = {
                    customer_id: res.data?.id,
                    itemParams: {
                        room_id: data.room_id,
                        start: data.start.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10),
                        end: data.end.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10),
                        amount: amount === 0 ? 1 : amount 
                    }
                }
                OrderService.CreateOrder(params).then(res => {
                     setStatus(true)
                    setMassage(`Đặt phòng thành công, mã đơn là ${res.data.id} `)
                }).catch(err => {
                    setMassage('Có lỗi xảy ra!!!')
                })
            }).catch(err => {
                setMassage('Có lỗi xảy ra!!!')
                console.log(err);
            })
        }
        else {
            const amount = (data.end.valueOf() - data.start.valueOf()) / 86400000;

            const param = {
                status: data.status,
                itemParams: {
                    start: data.start.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10),
                    end: data.end.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10),
                    amount: amount === 0 ? 1 : amount 
                }
            }
            OrderService.UpdateOrder(dataOrder.id, param).then(res => {
                setStatus(true)
                setMassage(`Cập nhật thông tin thành công`)
            }).catch(err => {
                console.log(err);
                setMassage('Có lỗi xảy ra!!!')
            })
        }
    }

    const checkMessageNoti = () => {
        setMassage('')
        if (signUpStatus) {
            goTo('admin/order')
        }
    }

    return (
        <Row className="CustomerView">
            <Typography sx={{
                cursor: 'pointer',
                color: 'blue',
                ':hover': {
                    textDecorationLine: 'underline'
                }
            }} onClick={() => goTo('admin/order')}>   <ArrowBackIosRoundedIcon ></ArrowBackIosRoundedIcon> Back</Typography>
            <Col xs={{ size: 6, offset: 3 }} className='form-container'>
                <form onSubmit={handleSubmit(submitClick)}>
                    {!statusUpdate ?
                        <>
                            <Row>
                                <Col>
                                    <Controller
                                        control={control}
                                        name="name"

                                        render={({
                                            field: { ref, ...field },
                                            fieldState: { error },
                                        }) => (
                                            <>
                                                <h6>Họ và Tên</h6>
                                                <Input
                                                    className="form-control"
                                                    inputRef={ref}
                                                    placeholder="Họ và Tên"
                                                    {...field}

                                                />
                                                {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                            </>
                                        )}
                                    />
                                </Col>
                            </Row>
                            <Row >
                                <Col >
                                    <Controller
                                        control={control}
                                        name="birthday"
                                        render={({
                                            field: { ref, ...field },
                                            fieldState: { error },
                                        }) => (
                                            <>
                                                <h6>Ngày sinh</h6>
                                                <Input
                                                    className="form-control"
                                                    inputRef={ref}
                                                    {...field}
                                                    type='date'
                                                />
                                                {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                            </>
                                        )}
                                    />
                                </Col>
                                <Col>
                                    <Controller
                                        control={control}

                                        name="numberPhone"
                                        render={({
                                            field: { ref, ...field },
                                            fieldState: { error },
                                        }) => (
                                            <>
                                                <h6>Số điện thoại</h6>
                                                <Input
                                                    className="form-control"
                                                    inputRef={ref}
                                                    placeholder="0987654321"
                                                    {...field}

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
                                        name="cccd"
                                        render={({
                                            field: { ref, ...field },
                                            fieldState: { error },
                                        }) => (
                                            <>
                                                <h6>Căn cước công dân ( Chứng minh thư )</h6>
                                                <Input
                                                    className="form-control"
                                                    inputRef={ref}
                                                    placeholder="022200001927"
                                                    {...field}
                                                    type='number'
                                                />
                                                {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                            </>
                                        )}
                                    />
                                </Col>
                            </Row>
                            <Row >
                                <Col >
                                    <Controller
                                        control={control}
                                        name="room_id"
                                        render={({
                                            field: { ref, ...field },
                                            fieldState: { error },
                                        }) => (
                                            <>
                                                <h6>Mã phòng</h6>
                                                <Input
                                                    placeholder=""
                                                    type="select"
                                                    inputRef={ref}
                                                    {...field}
                                                >
                                                    {idRoom ? idRoom.map(data => {
                                                        return (
                                                            <option value={data.value}>
                                                            {data.label} - {checkTypeRoom(data.type)} - {checkQualityRoom(data.quality)}
                                                            </option>
                                                        );
                                                    }) : ""}
                                                </Input>
                                                {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                            </>
                                        )}
                                    />
                                </Col>
                            </Row>
                        </>
                        : null
                    }
                    <Row >
                        <Col >
                            <Controller
                                control={control}
                                name="start"
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <h6>Từ ngày</h6>
                                        <Input
                                            className="form-control"
                                            // defaultValue={}
                                            inputRef={ref}
                                            {...field}
                                            type='date'
                                        />
                                        {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                    </>
                                )}
                            />
                        </Col>
                        <Col>
                            <Controller
                                control={control}
                                name="end"
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <h6>Đến ngày</h6>
                                        <Input
                                            className="form-control"
                                            inputRef={ref}
                                            {...field}
                                            type="date"

                                        />
                                        {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                    </>
                                )}
                            />
                        </Col>
                    </Row>

                    <Row className='d-flex justify-content-center'>
                        <Col className='d-flex justify-content-center' xs='4'>
                            <Button className='btn-signin' variant="contained" type='submit' >{!statusUpdate ? 'Tạo đơn hàng' : 'Cập nhật'}</Button>
                        </Col>
                    </Row>
                </form>
            </Col>
            <ModalNoti
                message={message}
                done={() => (checkMessageNoti())}
            ></ModalNoti>
        </Row>
    )
}

export default CreateUpdateOrder;