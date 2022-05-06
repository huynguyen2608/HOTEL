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
import { Divider } from "@mui/material";

import AuthService from '../../Services/AuthService';
import FacebookIcon from '@mui/icons-material/Facebook';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import HomeIcon from '@mui/icons-material/Home';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import InputIcon from '@mui/icons-material/Input';
import LoginIcon from '@mui/icons-material/Login';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import CreditScoreIcon from '@mui/icons-material/CreditScore';

class AppFooter extends React.Component {
    state = {
        dropdownUserOpen: false,
        dropdownMasterDataOpen: false,
        dropdownInventoryOpen: false,
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
        return (
            <>
            <Divider className="line-footer" />
            <Row className="AppFooter">
                    {/* <p><FacebookIcon></FacebookIcon> Facebook: <a href="https://www.facebook.com/DHCNHN.DCN.HaUI" target={'_blank'}>https://www.facebook.com/DHCNHN.HaUI</a></p> */}
                <Col xs={6} className="footer-left">
                    <h1>Khách sạn Phương Đông</h1>
                    <p><HomeIcon className="icon-f" /> Địa chỉ: số 7, ngõ 20/14, Mai Dịch, Quận Cầu Giấy, Hà Nội, Việt Nam</p>
                    <p><MarkunreadIcon className="icon-f" /> Email: admin.phuongdong@gmail.com</p>
                    <p><PhoneForwardedIcon className="icon-f" /> Số điện thoại: 0987.654.321</p>
                    <p><LoginIcon className="icon-f" /> Đặng nhập</p>
                    <p><InputIcon className="icon-f" ></InputIcon> Đăng ký</p>
                </Col> 
                <Col className="footer-right">
                    <h1>Chính sách quyền lợi và nghĩa vụ</h1>
                    <p> Chính sách đăng kí phòng <BorderColorIcon className="icon-f" /></p>
                    <p> Quyền lợi và nghĩa vụ <ContentPasteSearchIcon className="icon-f" /></p>
                    <p> Quy định về nhận thông tin phòng <CreditScoreIcon className="icon-f" /></p>
                    <p> Chính sách về đặt phòng và hủy phòng <CancelScheduleSendIcon className="icon-f" /></p>
                    <p> Chính sách bảo mật thông tin <LocalPoliceIcon className="icon-f" /></p>
                </Col>
                <Row className="social-links">
                    <i className="fa fa-facebook"></i>
                    <i className="fa fa-instagram"></i>
                    <i className="fa fa-twitter"></i>
                    <i className="fa fa-youtube-play"></i>
                    <p>Social Links To Contact</p>
                </Row>
            </Row>
            
            </>
        );
    }
}

export default withRouter(AppFooter);
