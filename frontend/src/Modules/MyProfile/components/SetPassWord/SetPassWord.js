import React, { useState } from 'react';
import { Button, Col, Input, Row } from "reactstrap";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import MyProfileService from "../../shared/Service";
import { ModalNoti } from '../../../../Shared';
import { LOCALSTORAGE } from '../../../../Constances/const';
import { goTo } from '../../../../Constances/Util';
import { Collapse } from '@mui/material';

const schema = yup
    .object({
        oldPass: yup
            .string()
            .min(6, "Tối thiểu 6 ký tự")
            .required("Họ Tên không được bỏ trống")
        ,
        newPass: yup
        .string()
        .min(6, "Tối thiểu 6 ký tự")
        .required("Họ Tên không được bỏ trống")
        .test('passwords-match', 'Mật khẩu mới Khác mật khẩu cũ', function(value){
            return this.parent.oldPass !== value
          })
        ,

    })
    .required();

export default function SetPassWord(props) {

    const customer = JSON.parse(window.sessionStorage.getItem('user'));
    const id = customer.customer.id

    const [message, setMassage] = useState('');


    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const submitClick = (data) => {
        console.log(data);
        const param = {
            customer_id: id,
            password: data.newPass
        }
        MyProfileService.Set_PassWord(param).then(res => {
            setMassage('Đổi mật khẩu thành công')
        }).catch(res => {
            console.log(res);
            setMassage('Có lỗi xảy ra!!!!')
        })
    }

    return (
        <Row className='Profile'>
            <Col xs={6} className='change-pass-container'>
                <h1 className='middle upper'>Đổi Mật Khẩu</h1>
                <form onSubmit={handleSubmit(submitClick)}>
                        <Col>
                            <Controller
                                control={control}
                                name="oldPass"

                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <h6>Mật khẩu cũ</h6>
                                        <Input
                                            className="form-control"
                                            inputRef={ref}
                                            placeholder="mật khẩu cũ"
                                            {...field}
                                            type='password'
                                        />
                                        {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                    </>
                                )}
                            />
                        </Col>
                        <Col >
                            <Controller
                                control={control}
                                name="newPass"

                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <h6>Mật khẩu mới</h6>
                                        <Input
                                            className="form-control"
                                            inputRef={ref}
                                            {...field}
                                            placeholder='mật khẩu mới'
                                            type='password'
                                        />
                                        {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                    </>
                                )}
                            />
                        </Col>
                    <Row className='d-flex justify-content-center'>
                        <Col className='d-flex justify-content-around' xs='4'>
                            <button className='button-main' type='submit' >Đổi mật khẩu</button>
                        </Col>
                    </Row>
                </form>
            </Col>
            <ModalNoti
                message={message}
                done={() => (setMassage(''))}
            ></ModalNoti>
        </Row>
    );
}