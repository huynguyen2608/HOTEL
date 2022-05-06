import React, { useState, useEffect } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import defaultImg from '../../../Assets/defaultImg.jpg';
import Profile from "./Prolife";
import MyHistory from "./History";

const MyProfileView = (props) => {

    const [activeTab, setTab] = useState('1')
    const user = JSON.parse(sessionStorage.getItem('user'));
    const customer = user?.customer;

    return (
        <Row>
            <Row className="MyProfileView">
                <Row className="MyProfileView-card">
                    <img alt="" className="MyProfileView-img" src={defaultImg}></img>
                    <div className="MyProfileView-content">
                        <div className="name"><h3>{customer?.name}</h3></div>
                        <div className="role">{customer?.role}</div>
                    </div>
                    <Nav tabs className="nav-tab-title">
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '1' })}
                                onClick={() => { setTab('1'); }}
                            >
                                Hồ sơ
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '2' })}
                                onClick={() => { setTab('2'); }}>
                                Phòng đang đặt
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '3' })}
                                onClick={() => { setTab('3'); }}>
                                Phòng đã thanh toán
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: activeTab === '4' })}
                                onClick={() => { setTab('4'); }}>
                                Phòng đã trả
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Profile profile={customer} ></Profile>
                        </TabPane>
                        <TabPane tabId="2">
                            <Row>
                                <MyHistory id={customer.id} status={'book'}></MyHistory>
                            </Row>
                        </TabPane>
                        <TabPane tabId="3">
                            <Row>
                                <MyHistory id={customer.id} status={'payment'}></MyHistory>
                            </Row>
                        </TabPane>
                        <TabPane tabId="4">
                            <Row>
                                <MyHistory id={customer.id} status={'done'}></MyHistory>
                            </Row>
                        </TabPane>
                    </TabContent>
                </Row>
            </Row>
        </Row>



    )
}

export default MyProfileView