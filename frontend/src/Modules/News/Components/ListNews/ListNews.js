import { useState, UseEffect } from "react";
import { Row, Col } from "reactstrap";
const ListNews = () => {
    const [listNews, setListNews] = useState([
        {
            title: "Giá phòng giảm tới 50%!",
            description: "Trong đợt lễ 30/04 - 01/05, chúng tôi có các chương trình ưu đãi lớn...",
            img: "https://media.timeout.com/images/105859033/image.jpg",
            twitter: "owner@booking.com"
        },
        {
            title: "Giá phòng giảm tới 50%!",
            description: "Trong đợt lễ 30/04 - 01/05, chúng tôi có các chương trình ưu đãi lớn...",
            img: "https://www.lottehotel.com/content/dam/lotte-hotel/lotte/hanoi/accommodation/standard/deluxeroom/180921-4-2000-roo-LTHA.jpg.thumb.768.768.jpg",
            twitter: "owner@booking.com"
        },
        {
            title: "Giá phòng giảm tới 50%!",
            description: "Trong đợt lễ 30/04 - 01/05, chúng tôi có các chương trình ưu đãi lớn...",
            img: "https://i2-prod.mylondon.news/incoming/article23105130.ece/ALTERNATES/s615/168289_WHotel-203000-London_IMG_05_0000jpeg.jpg",
            twitter: "owner@booking.com"
        },
        {
            title: "Giá phòng giảm tới 50%!",
            description: "Trong đợt lễ 30/04 - 01/05, chúng tôi có các chương trình ưu đãi lớn...",
            img: "https://images.grandsierraresort.com/image/upload/q_auto,f_auto,w_350,c_scale/c_limit,w_1280/v1549085944/Summit-and-Concierge-King-Room-main-room_16to9.png",
            twitter: "owner@booking.com"
        },
        {
            title: "Giá phòng giảm tới 50%!",
            description: "Trong đợt lễ 30/04 - 01/05, chúng tôi có các chương trình ưu đãi lớn...",
            img: "https://dayuse.twic.pics/hotels/9907/85e8345a918ce6bba631bccb78b78b6b-hilton-newark-airport.jpeg?twic=v1/cover=740x416",
            twitter: "owner@booking.com"
        },
        {
            title: "Giá phòng giảm tới 50%!",
            description: "Trong đợt lễ 30/04 - 01/05, chúng tôi có các chương trình ưu đãi lớn...",
            img: "https://dynaimage.cdn.cnn.com/cnn/q_auto,w_829,c_fill,g_auto,h_466,ar_16:9/http%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F171109145517-06-cozy-hotels-redefining-luxury.jpg",
            twitter: "owner@booking.com"
        },
        {
            title: "Giá phòng giảm tới 50%!",
            description: "Trong đợt lễ 30/04 - 01/05, chúng tôi có các chương trình ưu đãi lớn...",
            img: "https://www.kimptonoverlandhotel.com/images/1700-960/atl-gr-013-163df7b3.jpg",
            twitter: "owner@booking.com"
        },
        {
            title: "Giá phòng giảm tới 50%!",
            description: "Trong đợt lễ 30/04 - 01/05, chúng tôi có các chương trình ưu đãi lớn...",
            img: "https://cdn.dayrooms.com/image_cache/A1000/1783/King-d16ae5df94d1ffadec0a2eb6ffa86c97-hotel-homepage.jpg",
            twitter: "owner@booking.com"
        },
        {
            title: "Giá phòng giảm tới 50%!",
            description: "Trong đợt lễ 30/04 - 01/05, chúng tôi có các chương trình ưu đãi lớn...",
            img: "https://static.ffx.io/images/$width_800%2C$height_450/t_crop_auto/q_86%2Cf_auto/f14b6d47b25f7f9045c530639f175d10b1c030ae",
            twitter: "owner@booking.com"
        }
    ])
    return(
        <>
            <div className="list-news-row">
                    {listNews.map((news, i) => {
                        return(
                            <div className="list-news-col">
                                <div className="owner">
                                    <img src={news.img} alt="image" />
                                    <div className="owner-info">
                                        <h4>
                                        {news.title} <i className="fa fa-twitter"></i>
                                            <small>{news.twitter}</small>
                                        </h4>
                                    </div>
                                </div>
                                <p>{news.description}</p>
                            </div>
                        )
                    })}
            </div>
        </>
    )
}

export default ListNews