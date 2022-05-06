import React, { Component } from 'react';
import { Button, Col, Input, Row } from 'reactstrap';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Checkbox, FormControlLabel } from '@mui/material';


const schema = yup
    .object({
        fullname: yup
            .string(),
        numberPhone: yup
            .number(),
        email: yup
            .string()
    })
    .required();

function InfoBooking() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const submitClick = (data) => {
        console.log(data)
    }

    return (
        <Row className='base-form-controller Info-booking'>
            <p><b><h3 className='Info-booking-name'>Thông tin liên hệ</h3></b></p>
            <form onSubmit={handleSubmit(submitClick)}>
                <Row>
                    <Col>
                        <Controller
                            control={control}
                            name="fullname"
                            render={({
                                field: { ref, ...field },
                                fieldState: { error },
                            }) => (
                                <>
                                    <Input
                                        className="form-control"
                                        inputRef={ref}
                                        placeholder="Họ và Tên"
                                        {...field}
                                        label="Họ Tên"
                                    />
                                </>
                            )}
                        />
                    </Col>
                </Row>
                <Row >
                    <Col >
                        <Controller
                            control={control}
                            name="numberPhone"
                            render={({
                                field: { ref, ...field },
                                fieldState: { error },
                            }) => (
                                <>
                                    <Input
                                        className="form-control"
                                        inputRef={ref}
                                        placeholder="+09........"
                                        {...field}
                                        label="Họ Tên"

                                    />

                                </>
                            )}
                        />
                    </Col>
                    <Col>
                        <Controller
                            control={control}
                            name="email"
                            render={({
                                field: { ref, ...field },
                                fieldState: { error },
                            }) => (
                                <>
                                    <Input
                                        className="form-control"
                                        inputRef={ref}
                                        placeholder="Họ và Tên"
                                        {...field}
                                        label="Họ Tên"

                                    />

                                </>
                            )}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormControlLabel control={<Checkbox />} label="Giường Queen" />
                    </Col>
                    <Col>
                        <FormControlLabel control={<Checkbox />} label="2 giường đôi" />
                    </Col>
                </Row>
                <Row className='d-flex justify-content-center'>
                    <Col className='d-flex justify-content-center' xs='4'>
                        <button className='button-main' type='submit'>Đặt phòng</button>
                    </Col>
               
                </Row>
              
            </form>
        </Row>
    );

}

export default InfoBooking