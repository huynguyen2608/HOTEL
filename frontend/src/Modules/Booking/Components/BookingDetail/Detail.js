import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import CardBooking from '../../../../Shared/Components/CardBooking/CardBooking';
import BookingRoom from './components/Booking';
import { useParams } from 'react-router-dom';
import Description from './components/Description';
import BookingService from '../../Shared/Services';

class Detail extends Component {


    constructor(props) {
        super(props);
        this.state = {
            detail: {}
        };
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        BookingService.Get_Id_Room(id).then(res => {
            this.setState({
                detail: res.data
            })
        }).catch(err => {
            console.log(err);
        })
    }

    componentDidUpdate() {

    }

    render() {
        const { detail } = this.state;

        return (
            <Row>
                <Col xs="4">
                    <Description room={detail}></Description>
                </Col>
                <Col xs="8">
                    <Row><CardBooking room={detail}></CardBooking></Row>
                    <Row><BookingRoom room={detail}></BookingRoom></Row>
                </Col>
            </Row>
        );
    }

}


export default Detail