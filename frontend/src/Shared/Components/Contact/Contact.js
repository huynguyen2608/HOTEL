import React, { Component } from 'react';
import { Button, Col, Input, Row } from 'reactstrap';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ButtonForAll } from "../Button/ButtonForAll";
import AuthService from '../../Services/AuthService';
import ModalNoti from '../ModalNoti/ModalNoti';
const schema = yup
    .object({
        fullname: yup
            .string()
            .required("Họ tên không được bỏ trống"),
        numberPhone: yup
            .number()
            .required("Só điện thoại không được bỏ trống"),
        email: yup
            .string()
            .required("Email không được bỏ trống"),
        title: yup
            .string()
            .required("Tiêu đề sinh không được bỏ trống"),
        content: yup
            .string()
            .required("Nội dung không được bỏ trống")
    })
    .required();


function Contact(props) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [message, setMessage] = React.useState('');

    const checkTitle = (type) => {
        switch (type) {
            case 'feedback':
                return 'Thư góp ý từ';
            case 'advertisement':
                return 'Thư quảng cáo từ';
            case 'enterprise':
                return 'Thư mời hợp tác từ';
            default:
                break;
        }
    }


    const submitClick = (data) => {


        const param = {
            name: data.fullname,
            to: 'lethicham1512@gmail.com',
            title: checkTitle(data.title) + data.email,
            content:`Nội dung là: ${data.content}`
        }

        AuthService.Send_Mail_To_My_Gmail(param).then(
            res => {
                setMessage('Gửi mail thành công')
            }
        ).catch(err => {
            console.log(err);
            setMessage('Gửi mail thất bại')
        })

    }

    const checkMessageNoti = () => {
        setMessage('')
    }

    return (
        <Row className='contact'>
            <Col className='contact-hot'>
                <p className='contact-hot-title'>CHÚNG TÔI</p>
                <p className='contact-hot-content'> </p>
            </Col>
            <Col className='contact-main' xs={9}>
                <p className='contact-main-title'>PHẢN HỒI</p>
                <p className='contact-main-form'>
                    <form onSubmit={handleSubmit(submitClick)}>
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
                                    name="numberPhone"
                                    render={({
                                        field: { ref, ...field },
                                        fieldState: { error },
                                    }) => (
                                        <>
                                            <Input
                                                className="form-control"
                                                inputRef={ref}
                                                placeholder="Số điện thoại: 09........"
                                                {...field}


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
                                    name="email"
                                    render={({
                                        field: { ref, ...field },
                                        fieldState: { error },
                                    }) => (
                                        <>
                                            <Input
                                                className="form-control"
                                                inputRef={ref}
                                                placeholder="you@gmail.com"
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
                                    name="title"
                                    defaultValue={'feedback'}
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
                                                type='select'
                                            >
                                                <option value={'feedback'}>Góp ý</option>
                                                <option value={'advertisement'}>Quảng cáo</option>
                                                <option value={'enterprise'}>Doanh nghiệp</option>
                                            </Input>
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
                                    name="content"
                                    render={({
                                        field: { ref, ...field },
                                        fieldState: { error },
                                    }) => (
                                        <>
                                            <Input
                                                className="form-control"
                                                inputRef={ref}
                                                style={{
                                                    minHeight: '150px',
                                                    maxHeight: '150px'
                                                }}
                                                placeholder="Nội dung"
                                                {...field}
                                                type='textarea'
                                            />
                                            {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                        </>
                                    )}
                                />
                            </Col>
                        </Row>
                        <Row className='d-flex justify-content-center'>
                            <Col className='d-flex justify-content-center' xs={2}>
                                <button className='button-main' type='submit'>Gửi</button>

                            </Col>

                        </Row>

                    </form>
                    <div className="info-company">
                        <p className="fontsz-25"><b>Công ty cổ phần du lịch Việt Nam</b></p>
                        <p><b>Địa chỉ</b></p>
                        <p><LocationOnIcon></LocationOnIcon> <span>Tầng 11, Tòa Peakview, 36 Hoàng Cầu, Đống Đa.</span></p>
                        <p><LocalPhoneIcon></LocalPhoneIcon> <span>Điện thoại: 024 7109 9999.</span></p>
                        <p><EmailIcon></EmailIcon> <span>Email: info@mytour.vn</span></p>
                    </div>
                </p>
            </Col>
            <ModalNoti
                message={message}
                done={() => (checkMessageNoti())}
            ></ModalNoti>
        </Row>
    );

}

export default Contact