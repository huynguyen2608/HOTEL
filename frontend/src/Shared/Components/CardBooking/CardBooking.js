import React, { Component } from 'react';
import { CardImg, Col, Row } from 'reactstrap';
import Star from '../../../Assets/Star.svg';
import LocationOnIcon from '@mui/icons-material/LocationOn';

class CardBooking extends Component {


    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    checkQuality(quality) {

        switch (quality) {
            case 'basic':
                return <>
                    <img src={Star} alt="star"></img>
                </>


            case 'medium':
                return <>
                    {[1, 2].map((el, i) => {
                        return <img src={Star} alt="star"></img>
                    })}
                </>

            case 'good':
                return <>
                    {[1, 2, 3].map((el, i) => {
                        return <img src={Star} alt="star"></img>
                    })}
                </>

            case 'luxury':
                return <>
                    {[1, 2, 3, 4].map((el, i) => {
                        return <img src={Star} alt="star"></img>
                    })}
                </>

            default:
                break;
        }

    }


    render() {
        const { name, image, quality } = this.props.room;
        return (
            <Row className='CardBooking'>
                <Col lg={2} xs={4} className='img-booking-room' >
                    <CardImg src={image} alt="img-booking-room" ></CardImg>
                </Col>
                <Col className='booking-card-detail'>
                    <p><b><h3 className='booking-name'>1x {name}</h3></b></p>
                    <p className='booking-rate'>
                        {this.checkQuality(quality)}
                    </p>
                    <p className='booking-address'>
                        <LocationOnIcon></LocationOnIcon> <span>Hồng Châu - Yên Lạc - Vĩnh phúc</span>
                    </p>
                </Col>

            </Row>
        );
    }

}


export default CardBooking