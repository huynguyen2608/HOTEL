import { Divider } from "@mui/material";
import React from "react";
import { Col, Row } from "reactstrap";
import Star from '../../../Assets/Star.svg'
import { convertToPercent, goTo } from "../../../Constances/Util";

class CardService extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
        const { name, code, id, description, image, price, origin_price, quality, status, type } = this.props.room;
        return (
            <>
                <Col xs={6} className="img-service" onClick={() => goTo(`app/booking/${id}`)} >
                    <img src={image} className="Card_img" alt="Card_img"></img>
                    <Col className="overlay"></Col>
                    <Col  className="room-desc">
                        <h3  className="name_service">{name}</h3>
                        <Divider className="line-hr" />
                        <span className="rarity-img">
                            {this.checkQuality(quality)}
                        </span>

                        <p className="originPrice_service text-right">{origin_price}</p>
                        <Row className="total_price">
                            <Col className="sale_service text-left" xs="6">
                                Sale off: {convertToPercent(price, origin_price)}%
                            </Col>
                            <Col className="price_service text-right">
                                <b> {price}</b>
                            </Col>
                        </Row>
                    </Col>
                </Col>
            </>
        );
    }
}

export default CardService;
