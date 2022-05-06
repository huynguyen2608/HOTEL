import React, { useState } from 'react';
import { Button, Col, Input, Row } from "reactstrap";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import MyProfileService from "../../shared/Service";
import { ModalNoti } from '../../../../Shared';
import { LOCALSTORAGE } from '../../../../Constances/const';

const schema = yup
    .object({
        fullname: yup
            .string()
            .min(2, "Tối thiểu 2 ký tự")
            .max(50, "Tối đa 50 ký tự")
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
            .test('len', 'Sai định dạng cmt hoặc cccd', (cccd) => cccd?.toString().length !== 12 || cccd?.toString().length !== 10)

        ,
        birthday: yup
            .date()
            .max(new Date(Date.now() - 567648000000), "Bạn chưa đủ 18 tuổi")
            .required("Ngày sinh không được bỏ trống")
        ,

    })
    .required();

export default function Profile(props) {

    const profile = props.profile;

    const [message, setMassage] = useState('');

    const [showEdit, setShow] = useState(false);

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
        console.log(data.birthday.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10));
        const param = {
            name: data.fullname,
            birthday: data.birthday.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10),
            cccd: data.cccd.toString(),
            phone: data.numberPhone,
        }

        MyProfileService.Update_Customer(profile.id, param).then(res => {
            setMassage('Update thành công')
        }).catch(res => {
            console.log(res);
            setMassage('Có lỗi xảy ra!!!!')
        })
    }

    return (
        <Row className='Profile'>

            {
                showEdit ?
                    <>
                        <form onSubmit={handleSubmit(submitClick)}>
                            <Row>
                                <Col xs={6}>
                                    <Controller
                                        control={control}
                                        name="fullname"
                                        defaultValue={profile.name}
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
                                        defaultValue={profile.birthday}
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
                                    <Col xs={6}>
                                        <Controller
                                            control={control}
                                            defaultValue={profile.phone}
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
                                            defaultValue={profile.cccd}
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
                            <Row className='d-flex justify-content-center'>
                                <Col className='d-flex justify-content-around' xs='4'>
                                    <Col xs={6}>
                                    <button className='button-main'  type='submit' >Cập nhật</button>
                                    </Col>
                                    <button className='button-cancel' onClick={() => { setShow(false)}} color='secondary' >Huỷ</button>
                                </Col>
                            </Row>
                        </form>

                    </>
                    :
                    <>
                        <p className='name'>Họ tên : <h5> {profile.name}</h5></p>
                        <p>Tên đăng nhập : {profile.username}</p>
                        <p>Vai trò : {profile.role}</p>
                        <p>căn cước công dân : {profile.cccd}</p>
                        <p>Ngày sinh : {profile.birthday}</p>
                        <p>Số điện thoại : {profile.phone}</p>
                        <Col xs={2}>
                            <button className='button-main' onClick={() => { setShow(true) }}>chỉnh sửa thông tin</button>
                        </Col>
                    </>
            }

            <ModalNoti
                message={message}
                done={() => (setMassage(''), setShow(false))}
            ></ModalNoti>
        </Row>
    );
}