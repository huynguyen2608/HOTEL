
import React from "react";

import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { Col, Row } from "reactstrap";
// 4 image




const slideImages = [
    {
        img: [
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
            'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
        ]

    },
    {
        img: [
            'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
            'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
            'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
        ]
    }
];

function SlideImage(props) {

    return (
        <div className="AutoSlide">
            <div className="slide-container">
                <Slide>
                    {slideImages.map((el, index) => {
                        return (
                            <Row key={index} className="each-slide" style={{ justifyContent: 'space-around', display: "flex",  }}>
                                {el.img.map((img, key) => {
                                    return (
                                        <Col key={key} sx="4" >
                                            <img src={img} className="imgSlide" alt="slide1" />
                                        </Col>
                                    )
                                })}
                            </Row>
                        )
                    }
                    )}
                </Slide>
            </div >
        </div >
    );
}

export default SlideImage;
