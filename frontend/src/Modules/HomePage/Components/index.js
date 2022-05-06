import Banner from "./Banner/Banner";
import ListLocactionHome from "./ListLocation/Location";
import { Col, Row } from "reactstrap";
import { goTo } from "../../../Constances/Util";
import AutoSlide from "../../../Shared/Components/AutoSlide/AutoSlide";
import { Divider } from "@mui/material";
import { margin } from "@mui/system";

const HomePageView = () => {

    return (
        <>
            <Banner></Banner>
            {/* <AutoSlide></AutoSlide> */}
            {/* <Row className="text-center m-0"><h2 className="title_room"><b>Danh sách phòng</b></h2></Row>
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                <Col xs="9" style={{ background: 'black' }}>
                    <Divider></Divider>
                </Col>
            </Row>
            <ListLocactionHome></ListLocactionHome>
            <Row className="seeMore">
                <Col className="d-flex justify-content-center"><p onClick={() => goTo('app/booking')}>Xem thêm</p></Col>
            </Row> */}
        </>
    )
}

export default HomePageView