import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Row, Col, Input } from 'reactstrap';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { ModalNoti } from "../../../../Shared";
import { goTo } from "../../../../Constances/Util";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import RoomService from '../../shared/Service';

const schema = yup
    .object({
        name: yup
            .string()
            .min(2, "Tối thiểu 2 ký tự")
            .max(50, "Tối đa 50 ký tự")
            .required("Tên không được bỏ trống")
        ,
        origin_price: yup
            .number()
            .required("Giá gốc không được bỏ trống")
        ,
        price: yup
            .number()
            .required("Giá phòng không được bỏ trống")

        ,
        quality: yup.string()
            .required("Chất lượng không được bỏ trống")
        ,
        type: yup.string()
            .required("Loại phòng không được bỏ trống"),

        image: yup.string()
            .required("Hình ảnh không được bỏ trống"),

        amount: yup.number()
            .required("Số lượng không được bỏ trống"),

        description: yup.string()
            .required("Mô tả không được bỏ trống")

    })
    .required();

const CreateUpdateRoom = (props) => {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [dataRoom, setDataRoom] = useState({})
    const [message, setMessage] = useState('');
    const [signUpStatus, setStatus] = useState(false);
    const [statusUpdate, setStatusUpdate] = useState(false);
    const [checkUpdate, setCheckUpdate] = useState(false);

    useEffect(() => {
        const id = props.match.params.id
        if (id) {
            setStatusUpdate(true);
            RoomService.Get_Room(id).then(res => {
                setDataRoom(res.data)
                const data = res.data
                reset({
                    name: data.name,
                    origin_price: data.origin_price,
                    price: data.price,
                    quality: data.quality,
                    type: data.type,
                    status: data.status,
                    image: data.image,
                    description: data.description ?data.description :"",
                    amount:data.amount ? data.amount: 1
                })

            }).catch(err => console.log(err))
        }
    }, [])

    const submitClick = (data) => {
        setCheckUpdate(!checkUpdate);

        if (!statusUpdate) {
            const dataRooms = {
                name: data.name,
                origin_price: data.origin_price,
                price: data.price,
                quality: data.quality,
                type: data.type,
                status: data.status,
                image: data.image,
                description: data.description,
                amount:data.amount
            }
            RoomService.Create_Room(dataRooms).then(res => {
                setStatus(true)
                setMessage(`Tạo phòng thành công`)
            }).catch(err => {
                console.log(err);
                setMessage('Tên phòng đã tồn tại!!!')
            })
        }
        else {
            const param = {
                name: data.name,
                price: data.price,
                quality: data.quality,
                type: data.type,
                status: data.status,
                image: data.image,
                description:data.description
            }
            RoomService.Update_Room(dataRoom.id, param).then(res => {
                setCheckUpdate(!checkUpdate);
                setStatus(true)
                setMessage(`Cập nhật thông tin thành công`)
            }).catch(err => {
                console.log(err);
                setMessage('Có lỗi xảy ra!!!')
            })
        }
    }

    const checkMessageNoti = () => {
        setMessage('')
        if (signUpStatus) {
            goTo('admin/room')
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
            }} onClick={() => goTo('admin/room')}>   <ArrowBackIosRoundedIcon ></ArrowBackIosRoundedIcon> Back</Typography>
            <Col xs={{ size: 6, offset: 3 }} className='form-container'>
                <form onSubmit={handleSubmit(submitClick)}>
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
                                        <h6>Tên phòng</h6>
                                        <Input
                                            className="form-control"
                                            inputRef={ref}
                                            placeholder="Tên phòng"
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
                                    name="origin_price"
                                    render={({
                                        field: { ref, ...field },
                                        fieldState: { error },
                                    }) => (
                                        <>
                                            <h6>Giá gốc</h6>
                                            <Input
                                                className="form-control"
                                                inputRef={ref}
                                                {...field}
                                                defaultValue=''
                                                placeholder="giá gốc"
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
                                name="price"
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <h6>Giá phòng</h6>
                                        <Input
                                            className="form-control"
                                            inputRef={ref}
                                            {...field}
                                            placeholder="Giá phòng"
                                            type='string'
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
                                name="amount"
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <h6>Số lượng</h6>
                                        <Input
                                            className="form-control"
                                            
                                            inputRef={ref}
                                            {...field}
                                            placeholder="Số lượng"
                                        />
                                        {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                    </>
                                )}
                            />
                        </Col>
                    </Row>
                    <Row >
                        <h6>Chất lượng</h6>
                        <Col >
                            <Controller
                                control={control}
                                defaultValue={dataRoom.quality ? dataRoom.quality : "basic"}
                                name="quality"
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error },
                                }) => (
                                    <RadioGroup row aria-label="role" {...field}>
                                        <FormControlLabel
                                            value="basic"
                                            control={<Radio />}
                                            label="Phòng bình dân"
                                        />
                                        <FormControlLabel
                                            value="medium"
                                            control={<Radio />}
                                            label="Phòng tiêu chuẩn"
                                        />
                                        <FormControlLabel
                                            value="good"
                                            control={<Radio />}
                                            label="Phòng chất lượng cao"
                                        />
                                        <FormControlLabel
                                            value="luxury"
                                            control={<Radio />}
                                            label="Phòng hạng sang"
                                        />
                                    </RadioGroup>
                                )}
                            />
                        </Col>
                    </Row>
                    <Row >
                        <h6>Loại phòng</h6>
                        <Col >
                            <Controller
                                control={control}
                                defaultValue={dataRoom.type ? dataRoom.type : "single"}
                                name="type"
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error },
                                }) => (
                                    <RadioGroup row aria-label="role" {...field}>
                                        <FormControlLabel
                                            value="single"
                                            control={<Radio />}
                                            label="Phòng đơn "
                                        />
                                        <FormControlLabel
                                            value="couple"
                                            control={<Radio />}
                                            label="Phòng đôi"
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
                                name="description"
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <h6>Mô tả</h6>
                                        <Input
                                            className="form-control"
                                            inputRef={ref}
                                            placeholder="Mô tả"
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
                                name="image"
                                render={({
                                    field: { ref, ...field },
                                    fieldState: { error },
                                }) => (
                                    <>
                                        <h6>Link ảnh</h6>
                                        
                                            <Input
                                                inputRef={ref}
                                                placeholder="Link ảnh"
                                                {...field}
                                            /> 
                                        {Boolean(error) ? <p className='error_text'>{error.message}</p> : <p className='error_text'> </p>}
                                    </>
                                )}
                            />
                        </Col>
                    </Row>

                    <Row className='d-flex justify-content-center'>
                        <Col className='d-flex justify-content-center' xs='4'>
                            <Button className='btn-signin' variant="contained" type='submit' >{!statusUpdate ? 'Tạo phòng' : 'Cập nhật'}</Button>
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

export default CreateUpdateRoom;