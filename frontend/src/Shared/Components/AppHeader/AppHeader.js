import React from "react";
// { Fragment }
import { withRouter } from "react-router-dom";
import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink,
  Col,
  Row,
} from "reactstrap";

import AuthService from '../../Services/AuthService';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
class AppHeader extends React.Component {
  state = {
    dropdownUserOpen: false,
    dropdownMasterDataOpen: false,
    dropdownInventoryOpen: false,
    dropdownOpen: false
  };

  goTo(url = "") {
    url = window.location.origin + "/" + url;
    window.location.replace(url);
  }

  toggleUser = () => {
    this.setState({
      dropdownUserOpen: !this.state.dropdownUserOpen,
    });
  };

  toggleMasterData = () => {
    this.setState({
      dropdownMasterDataOpen: !this.state.dropdownMasterDataOpen,
    });
  };

  toggleWareHouse = () => {
    this.setState({
      dropdownInventoryOpen: !this.state.dropdownInventoryOpen,
    });
  };

  logout() {
    AuthService.userInfo = null;
    window.sessionStorage.clear();
    window.location.replace("login");
  }



  render() {

    const customer = JSON.parse(window.sessionStorage.getItem('user'));
    console.log(customer);
    return (
      <div>
        <Nav className="navbar" pills>
          <Row className="appHeaderContainer mb-0">
            <Col xs="2">
              <div className="forLogo" onClick={() => this.goTo('app')}>
                  Phương Đông
              </div>
            </Col>
            <Col xs="8" className="option">
              <NavItem >
                <NavLink className="optionItem" onClick={() => this.goTo('app/home')}>
                  Trang chủ
                </NavLink>
              </NavItem>
              <NavItem >
                <NavLink className="optionItem" onClick={() => this.goTo('app/booking')}>
                  Phòng trống
                </NavLink>
              </NavItem>
              <NavItem >
                <NavLink className="optionItem" onClick={() => this.goTo('app/news')}>
                  Tin tức
                </NavLink>
              </NavItem>
              <NavItem >
                <NavLink className="optionItem" onClick={() => this.goTo('app/contact')}>
                  Liên hệ
                </NavLink>
              </NavItem>
            </Col>
            <Col xs="2" className="forUser">
              <Dropdown className="dropdown" isOpen={this.state.dropdownUserOpen} toggle={this.toggleUser}>
                <DropdownToggle caret className="dropdown-toggle" >
                  <AccountCircleIcon></AccountCircleIcon> Tài khoản
                </DropdownToggle>
                {
                  customer ? <DropdownMenu className="dropdown-menu">
                    {
                      customer.customer.role !== 'customer' ? <>
                        <DropdownItem onClick={() => this.goTo('admin/order')}>Trang quản lí</DropdownItem>
                        <DropdownItem divider></DropdownItem>
                      </>
                        :
                        null
                    }

                    <DropdownItem onClick={() => this.goTo('app/myprofile')}>Hồ sơ</DropdownItem>
                    <DropdownItem onClick={() => this.goTo('app/myorder')}>Tra cứu đặt phòng</DropdownItem>
                    <DropdownItem onClick={() => this.goTo('app/setPassword')}>Đổi mật khẩu</DropdownItem>
                    <DropdownItem divider></DropdownItem>
                    <DropdownItem onClick={() => this.logout()}>Đăng xuất</DropdownItem>
                  </DropdownMenu> :
                    <DropdownMenu className="dropdown-menu">
                      <DropdownItem onClick={() => this.goTo('app/myorder')}>Tra cứu đặt phòng</DropdownItem>
                      <DropdownItem onClick={() => this.goTo('app/login')}>Đăng Nhập</DropdownItem>
                      <DropdownItem onClick={() => this.goTo('app/sigup')}>Đăng ký</DropdownItem>
                    </DropdownMenu>
                }


              </Dropdown>
            </Col>
          </Row>
        </Nav>
      </div>
    );
  }
}

export default withRouter(AppHeader);
