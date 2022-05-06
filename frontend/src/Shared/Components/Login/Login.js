import React from "react";
import { Form as FormRender, Input, Button, Label, Row, Col } from "reactstrap";
import "./Login.scss";
import { LOCALSTORAGE } from "../../../Constances/const";
import AuthService from "../../Services/AuthService";
import Form from "../Form/Form";
import ModalNoti from "../ModalNoti/ModalNoti";
import { ButtonForAll } from "../Button/ButtonForAll";

class Login extends Form {
  constructor(props) {
    super(props);
    this.state = {
      locationList: [],
      notiMessage: "",
      form: this._getInitFormData({ username: "", password: "" }),
    };
  }

  login() {
    const { username, password } = this.state.form;
    AuthService.login(username.value, password.value)
      .then((res) => {
        window.sessionStorage.setItem(LOCALSTORAGE.TOKEN, res.id);
        AuthService.getUserInfo()
          .then((_res) => {
            let user = _res;
            window.sessionStorage.setItem(LOCALSTORAGE.USER, JSON.stringify(user));
            window.location.href = "/app";
          })
          .catch((err) => {
            console.log("Err", err);
            this.setState({
              notiMessage: "Đăng nhập thất bại kiểm tra lại tài khoản",
            });
          });
      })
      .catch((err) => {
        console.log("Err", err);
        this.setState({
          notiMessage: "Có lỗi xảy ra trong lúc đăng nhập, xin thử lại sau!",
        });
      });
  }

  goTo(url = "") {
    url = window.location.origin + "/" + url;
    window.location.replace(url);
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className="container ">
        <Row>
          <Col xs={{ size: 6, offset: 3 }}>
            <div className="form-container">
              <div className="form-icon">
                <i className="fa fa-user"></i>
              </div>
              <h3 className="title">Đăng nhập</h3>
              <FormRender className="form-horizontal">
                <div className="form-group">
                  <Label color="white">Tên đăng nhập</Label>
                  <Input
                    className="form-control"
                    defaultValue={username}
                    onChange={(ev) => this._setValue(ev, "username")}
                    type="email"
                    placeholder="Tên đăng nhập"
                  />
                </div>
                <div className="form-group">
                  <Label color="white">Mật khẩu</Label>
                  <Input
                    className="form-control"
                    defaultValue={password}
                    onChange={(ev) => this._setValue(ev, "password")}
                    type="password"
                    placeholder="Mật khẩu ít nhất 6 kí tự"
                  />
                </div>
                <Col className="middle" xs={{size: 6, offset: 3}}>
                  <button
                    type="button"
                    className="button-main"
                    onClick={() => this.login()}
                  >
                    Đăng nhập
                  </button>
                </Col>
              </FormRender>
            </div>
            <ModalNoti
              message={this.state.notiMessage}
              done={() => this.setState({ notiMessage: "" })}
            ></ModalNoti>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
