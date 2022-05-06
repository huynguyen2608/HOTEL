import React, { useState, useEffect } from 'react';
import { Button, Col, Input, Row } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import BookingService from '../../../Shared/Services';
import { AuthService, ModalNoti } from '../../../../../Shared';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

const schema = yup
    .object({
        fullname: yup
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

        startDate: yup.date()
            .min(new Date(Date.now() - 86400000), "Ngày nhận phòng không nhỏ hơn ngày hiện tại")
            .required("Ngày nhận phòng không được bỏ trống"),
        endDate: yup.date().min(
            yup.ref('startDate'),
            "Ngày kết thúc không thể nhỏ hơn ngày bắt đầu")
            .required("Ngày trả phòng không được bỏ trống"),
        payment: yup.string()
            .required("Phương thức thanh toán không được bỏ trống"),

    })
    .required();

function BookingRoom(props) {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const dataSession = JSON.parse(sessionStorage.getItem('user'))



    const [message, setMassage] = useState('')


    useEffect(() => {
        if (dataSession?.customer) {
            reset({
                fullname: '123456',
                numberPhone: '097654321',
                cccd: '09876543212',
                birthday: '2000-11-28',
            })
         
        }

    }, [])


    const sendMail = (data, id) => {
        const param = {
            name: data.fullname,
            to: data.email,
            title: `BẠN ĐÃ ĐẶT PHÒNG THÀNH CÔNG`,
            content: `Cảm ơn quý khách đã đặt phòng tại hệ thống của chúng tối,
                        Mã đơn hàng của quý khách là: ${id} `
        }
        AuthService.Send_Mail_To_My_Gmail(param).then(
            res => {
                console.log('Gửi mail thành công')
            }
        ).catch(err => {
            console.log(err);
        })

    }


    const submitClick = (data) => {

        if (dataSession?.customer) {
            const amount = (data.endDate.valueOf() - data.startDate.valueOf()) / 86400000;
            const params = {
                customer_id: dataSession?.customer.id,
                itemParams: {
                    room_id: props.room.id,
                    start: data.startDate.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10),
                    end: data.endDate.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10),
                    amount: (amount === 0 ? 1 : amount)
                }
            }

            BookingService.Create_Order(params).then(res => {

                if (data.payment === 'paypal') {
                    const param = {
                        status: 'payment'
                    }
                    BookingService.Update_Order(res.data.id, param).then(res => {
                        setMassage(`Đặt phòng thành công`)
                    }).catch(err => {
                        setMassage('Có lỗi xảy ra!!!')
                    })
                }
                else {
                    setMassage(`Đặt phòng thành công`)
                }
            }).catch(err => {
                setMassage('Có lỗi xảy ra!!!')
            })
        }
        else {
            const params = {
                name: data.fullname,
                role: "customer",
                birthday: data.birthday.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10),
                cccd: data.cccd.toString(),
                phone: data.numberPhone
            }
            BookingService.Create_Cumstomer(params).then(res => {
                const amount = (data.endDate.valueOf() - data.startDate.valueOf()) / 86400000;
                const params = {
                    customer_id: res.data?.id,
                    itemParams: {
                        room_id: props.room.id,
                        start: data.startDate.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10),
                        end: data.endDate.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10),
                        amount: (amount === 0 ? 1 : amount)
                    }
                }
                BookingService.Create_Order(params).then(res => {
                    if (data.payment === 'paypal') {
                        const param = {
                            status: 'payment'
                        }
                        BookingService.Update_Order(res.data.id, param).then(res => {
                            setMassage(`Đặt phòng thành công, mã đơn là ${res.data.id} `)
                            // sendMail(data, res.data.id)
                        }).catch(err => {
                            setMassage('Có lỗi xảy ra!!!')
                        })
                    }
                    else {
                        // sendMail(data, res.data.id)
                        setMassage(`Đặt phòng thành công, mã đơn là ${res.data.id} `)
                    }
                }).catch(err => {
                    setMassage('Có lỗi xảy ra!!!')
                })
            }).catch(err => {
                setMassage('Có lỗi xảy ra!!!')
                console.log(err);
            })
        }


    }

    return (
        <Row className='Info-booking'>
            <p><b><h3 className='Info-booking-name middle upper'>Thông tin liên hệ</h3></b></p>
            <form onSubmit={handleSubmit(submitClick)}>
                {!dataSession?.customer ?
                    <>
                        <Row>
                            <Col xs={6}>
                                <Controller
                                    control={control}
                                    name="fullname"

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
                        </Row>
                        <Row>
                            <Col xs={6}>
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
                    </>
                    :
                    null
                }

                <Row>
                    <Col xs={6}>
                        <Controller
                            control={control}
                            name="startDate"
                            render={({
                                field: { ref, ...field },
                                fieldState: { error },
                            }) => (
                                <>
                                    <h6>Ngày nhận phòng</h6>
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
                {/* </Row>
                <Row> */}
                    <Col>
                        <Controller
                            control={control}
                            name="endDate"
                            render={({
                                field: { ref, ...field },
                                fieldState: { error },
                            }) => (
                                <>
                                    <h6>Ngày trả phòng</h6>
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
                </Row>
                <Row >
                    <h6>Phương thức thanh toán</h6>
                    <Col >
                        <Controller
                            control={control}
                            name="payment"
                            defaultValue={'default'}
                            render={({
                                field: { ref, ...field },
                                fieldState: { error },
                            }) => (
                                <RadioGroup row aria-label="role" {...field}>
                                    <FormControlLabel
                                        value="default"
                                        control={<Radio />}
                                        label="Thanh toán tại quầy"
                                    />
                                    <FormControlLabel
                                        value="paypal"
                                        control={<Radio />}
                                        label="Thanh toán ngay"
                                    />
                                </RadioGroup>
                            )}
                        />
                    </Col>

                </Row>

                <Row className='d-flex justify-content-center'>
                    <Col className='d-flex justify-content-center' xs='4'>
                        <button className='button-main' type='submit' >Đặt phòng</button>
                    </Col>

                </Row>
            </form>
            <ModalNoti
                message={message}
                done={() => setMassage('')}
            ></ModalNoti>
        </Row>
    );

}

export default BookingRoom