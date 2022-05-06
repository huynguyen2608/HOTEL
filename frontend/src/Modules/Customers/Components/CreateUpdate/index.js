import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Row, Col, Input } from 'reactstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import CustomerService from "../../Shared/Service";
import { ModalNoti } from "../../../../Shared";
import { goTo } from "../../../../Constances/Util";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { SetDefaultValueBirthday } from "../../../../Constances/const";

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
            .test('len', 'Số điện thoại không đúng đị dạng', cccd => cccd?.toString().length == 10)
            .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                "Số điện thoại không đúng đị dạng"
            )
        ,
        cccd: yup
            .string()
            .required("Căn cước công dân không được bỏ trống")
            .test('len', 'Sai định dạng cmt hoặc cccd', cccd => cccd?.toString().length == 10 || cccd?.toString().length == 12)
        ,
        birthday: yup
            .date()
            .max(new Date(Date.now() - 567648000000), "Bạn chưa đủ 18 tuổi")
            .required("Ngày sinh không được bỏ trống")
        ,
        username: yup.string()
            .min(6, "Tối thiểu 6 ký tự")
            .max(30, "Tối đa 30 ký tự")
            .required("Tên đăng nhập không được bỏ trống")
        ,
        password: yup.string()
            .min(6, "Tối thiểu 6 ký tự")
            .max(30, "Tối đa 30 ký tự")
            .required("Tên đăng nhập không được bỏ trống")
        ,
        role: yup.string()
            .required("Tên đăng nhập không được bỏ trống")
    })
    .required();

const CreateUpdate = (props) => {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [message, setMassage] = useState('');
    const [signUpStatus, setStatus] = useState(false);
    const [customer, setCus] = useState({})
    const [statusUpdate, setStatusUpdate] = useState(false);
    const [checkUpdate, setCheckUpdate] = useState(false);

    useEffect(() => {
        const id = props.match.params.id
        if (id) {
            setStatusUpdate(true)
            CustomerService.Get_Id_Cus(id).then(res => {
                setCus(res.data)
                const data = res.data
                reset({
                    fullname: data.name,
                    numberPhone: data.phone,
                    username: '111111',
                    password: '123456',
                    cccd: data.cccd,
                    birthday: data.birthday,
                    role: data.role
                })

            }).catch(err => console.log(err))
        }
    }, [])

    const submitClick = (data) => {
        setCheckUpdate(!checkUpdate);

        if (!statusUpdate) {
            const customer = {
                name: data.fullname,
                username: data.username,
                role: data.role,
                birthday: data.birthday.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10),
                cccd: data.cccd.toString(),
                phone: data.numberPhone,
            }
            CustomerService.Create_Cus(customer).then(res => {
                const setPassword = {
                    customer_id: res.data.id,
                    password: data.password
                }
                CustomerService.Set_Password(setPassword).then(res => {
                    setStatus(true)
                    setMassage(`Tạo tài khoản thành công`)
                }).catch(err => {
                    console.log(err);
                    setMassage('Có lỗi xảy ra!!!')
                })
            }).catch(err => {
                console.log(err);
                setMassage('Có lỗi xảy ra!!!')
            })
        }
        else {
            const param = {
                name: data.fullname,
                role: data.role,
                birthday: data.birthday.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10),
                cccd: data.cccd.toString(),
                phone: data.numberPhone,
            }
            CustomerService.Update_Cus(customer.id, param).then(res => {
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
            goTo('admin/customer')
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
            }} onClick={() => goTo('admin/customer')}>   <ArrowBackIosRoundedIcon ></ArrowBackIosRoundedIcon> Back</Typography>
            <Col xs={{ size: 6, offset: 3 }} className='form-container'>
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
                    {
                        !statusUpdate ? <Row>
                            <Col>
                                <Controller
                                    control={control}
                                    name="username"
                                    render={({
                                        field: { ref, ...field },
                                        fieldState: { error },
                                    }) => (
                                        <>
                                            <h6>Tên đăng nhập</h6>
                                            <Input
                                                className="form-control"
                                                inputRef={ref}
                                                {...field}
                                                defaultValue=''
                                                placeholder="username"
                                            />
                                            {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                        </>
                                    )}
                                />
                            </Col>
                        </Row>
                            : null
                    }
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
                                            {...field}
                                        />
                                        {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                    </>
                                )}
                            />
                        </Col>
                    </Row>
                    {!statusUpdate ?
                        <>
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
                                                    type='string'
                                                />
                                                {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                            </>
                                        )}
                                    />
                                </Col>
                            </Row>
                            <Row >
                                <h6>Vai trò</h6>
                                <Col >
                                    <Controller
                                        control={control}
                                        name="role"
                                        defaultValue={customer.role ? customer.role : 'customer'}
                                        render={({
                                            field: { ref, ...field },
                                            fieldState: { error },
                                        }) => (
                                            <RadioGroup row aria-label="role" {...field}>
                                                <FormControlLabel
                                                    value="customer"
                                                    control={<Radio />}
                                                    label="Khách hàng"
                                                />
                                            </RadioGroup>
                                        )}
                                    />
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    <Controller
                                        control={control}
                                        name="password"
                                        render={({
                                            field: { ref, ...field },
                                            fieldState: { error },
                                        }) => (
                                            <>
                                                <h6>Password</h6>
                                                <Input
                                                    className="form-control"
                                                    inputRef={ref}
                                                    {...field}
                                                    defaultValue=''
                                                    type="password"
                                                    placeholder="password"
                                                />
                                                {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                            </>
                                        )}
                                    />
                                </Col>
                            </Row>
                        </> : null}

                    <Row className='d-flex justify-content-center'>
                        <Col className='d-flex justify-content-center' xs='4'>
                            <Button className='btn-signin' variant="contained" type='submit' >{!statusUpdate ? 'Tạo tài khoản' : 'Cập nhật'}</Button>
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

export default CreateUpdate;