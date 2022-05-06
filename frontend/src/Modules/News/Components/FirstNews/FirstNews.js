import { Row, Col } from 'reactstrap'
const FirsNews = () => {
    return(
        <>
            <Row className='news'>
                <Row>
                    <Col className='title-text-news'>
                        <p>NEWS</p>
                        <h1>Tin tức</h1>
                    </Col>
                </Row>
                <Row className='news-box'>
                    <Col className='tip-news' xs={6}>
                        <h1>Ưu đãi lớn</h1>
                        <Col className='news-desc'>
                            <div className='news-icon'>
                                <i className="fa fa-newspaper-o"></i>
                            </div>
                            <Col className='news-text'>
                                <span>Chúng tôi đang có rất nhiều chương trình ưu đãi lớn cực lớn dành cho tất cả mọi người!</span>
                            </Col>
                        </Col>
                        <Col className='news-desc'>
                            <div className='news-icon'>
                                <i className="fa fa-credit-card" aria-hidden="true"></i>
                            </div>
                            <Col className='news-text'>
                                <span>Chấp nhận thanh toán dưới mọi hình thức!</span>
                            </Col>
                        </Col>
                        <Col className='news-desc'>
                            <div className='news-icon'>
                                <i className="fa fa-gratipay" aria-hidden="true"></i>
                            </div>
                            <Col className='news-text'>
                                <span>Nhiều dịch vụ miễn phí và những ưu đãi đặc biệt cho khách hàng đầu tiên!</span>
                            </Col>
                        </Col>
                    </Col>
                    <Col className='img-news' >
                        <img src="https://www.redrockresort.com/wp-content/uploads/2020/12/RR-Standard-2-Queen.jpg" alt="News Img"/>
                    </Col>
                </Row>
            </Row>
        </>
    )
}
export default FirsNews