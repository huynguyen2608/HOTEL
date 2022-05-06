import React, { Component } from 'react';
import { CardImg, Col, Input, Row } from "reactstrap";
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import ElectricBoltOutlinedIcon from '@mui/icons-material/ElectricBoltOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';
import { Tooltip, Button, Divider } from '@mui/material';
import { checkTypeRoom } from '../../../../../Constances/Util';

class Description extends Component {


    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    render() {
        const { name, image, type, amount } = this.props.room;

        return (
            <Row className='Description'>
                <CardImg src={image} alt='img' className='img-room'></CardImg>
                <p className='name-room'><h3>1x {name}</h3></p>
                <span className='detail-room'>
                    <p>
                        <Row className='p-0'>
                            <Col className='p-0'><PeopleAltOutlinedIcon></PeopleAltOutlinedIcon>

                                <span>{amount} người </span></Col>
                            <Col> <RemoveRedEyeOutlinedIcon></RemoveRedEyeOutlinedIcon>
                                <span>Hường biển </span></Col>
                        </Row>

                    </p>
                    <p>
                        <BedOutlinedIcon></BedOutlinedIcon>
                        <span>{checkTypeRoom(type)}</span>
                    </p>
                    <p>
                        <CurrencyExchangeRoundedIcon></CurrencyExchangeRoundedIcon>
                        <span>Hoàn 1 phần tiền nếu hủy</span>
                    </p>
                </span>
                <span className='attach-room'>
                    <p>
                        <RestaurantOutlinedIcon></RestaurantOutlinedIcon>
                        <span>Bữa sáng miễn phí</span>
                    </p>
                    <p>
                        <ElectricBoltOutlinedIcon></ElectricBoltOutlinedIcon>
                        <span>Xác nhận ngay 24/7</span>
                    </p>
                </span>
                <span className='gif-room-service'>
                    <span className='gif-room-service-icon'><CardGiftcardOutlinedIcon></CardGiftcardOutlinedIcon></span>
                    <Divider className='gif-room-service-divider' orientation="vertical" variant="middle" flexItem />
                    <span>
                        <p>- Miễn phí tối đa 2 trẻ em dưới 12 tuổi ngủ chung giường & bao gồm ăn sáng, thông báo khi đặt phòng.</p>
                        <p>- Đón tiễn sân bay theo lịch trình của Resort. Vui lòng đăng ký trước ít nhất 3 ngày để xác nhận tình trạng chỗ trống, không áp dụng cho nhóm khách trên 10 người.</p>
                        <p>- Áp dụng cho Khách Việt Nam.</p>
                        <p>- Đưa/đón khách sân bay.</p>
                    </span>
                </span>
            </Row>
        );
    }
}
export default Description