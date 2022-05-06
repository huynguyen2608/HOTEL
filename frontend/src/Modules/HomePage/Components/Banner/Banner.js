import { Row } from "reactstrap";
import { goTo } from "../../../../Constances/Util";
import { ButtonForAll } from "../../../../Shared/Components/Button/ButtonForAll";
const Banner = () => {
    const goToRoomList = () => {
        goTo('app/booking')
    }
    const goToNews = () => {
        goTo('app/news')
    }
    return (
        <>
            <Row className="content">
                <h1>BOOKING AND RELAX</h1>
                <p>Nâng tầm trải nghiệm cho chuyến đi của bạn! <br/>Tham khảo thêm nhé!</p>
                <Row className="row-btn-banner">
                    <ButtonForAll title="XEM PHÒNG" functionCallBack={goToRoomList} />
                    <ButtonForAll title="TIN TỨC"  functionCallBack={goToNews}/>
                </Row>
            </Row>
        </>
    )
}

export default Banner