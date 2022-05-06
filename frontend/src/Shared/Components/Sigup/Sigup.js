import React, { useState } from "react";
import { Form as FormRender, Input, Button, Row, Col } from "reactstrap";
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ModalNoti from "../ModalNoti/ModalNoti";
import SignUpService from "../../Services/SigupService";
import { goTo } from "../../../Constances/Util";

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
      .string()
      .required("Căn cước công dân không được bỏ trống")
      .test('len', 'Sai định dạng cmt hoặc cccd', cccd =>cccd.toString().length == 10 || cccd.toString().length == 12)
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
      .min(6, "Tối thiểu 8 ký tự")
      .max(30, "Tối đa 30 ký tự")
      .required("Tên đăng nhập không được bỏ trống")
    ,


  })
  .required();

function SigupForm(props) {
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

  const submitClick = (data) => {
    const customer = {
      name: data.fullname,
      username: data.username,
      role: "customer",
      birthday: data.birthday.toLocaleString('en-CA', { timeZone: 'UTC' }).slice(0, 10),
      cccd: data.cccd.toString(),
      phone: data.numberPhone,
   
    }
    console.log(customer);
    SignUpService.Create_Customer(customer).then(res => {
      const setPassword = {
        customer_id: res.data.id,
        password: data.password
      }
      SignUpService.Set_Password(setPassword).then(res => {
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

  const checkMessageNoti = () => {
    setMassage('')
    if (signUpStatus) {
      goTo('app/login')
    }
  }

  return (
    <div className="container-sigin">
      <Row>
        <Col xs={{ size: 6, offset: 3 }} className='form-container'>
        <h3 className="title">Đăng ký</h3>
          <form onSubmit={handleSubmit(submitClick)}>
            <Row>
              <Col xs={6}>
                <Controller
                  control={control}
                  name="fullname"
                  defaultValue={''}
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
                  defaultValue={''}
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
              <Col xs={6}>
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

            <Row className='d-flex justify-content-center'>
              <Col className='d-flex justify-content-center' xs='4'>
                <button className='button-main' type='submit' >Đăng ký</button>
              </Col>

            </Row>
          </form>
          <ModalNoti
            message={message}
            done={() => (checkMessageNoti())}
          ></ModalNoti>
        </Col>
      </Row>
    </div>
  );
}


export default SigupForm;
