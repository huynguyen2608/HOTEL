import React from "react";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";

import Homepage from "../../../Modules/HomePage/HomePage";
import AppFooter from "../AppFooter/AppFooter";
import Booking from "../../../Modules/Booking/Booking";
import Login from "../Login/Login";
import Sigup from "../Sigup/Sigup";
import Contact from "../Contact/Contact";
import MyProfile from "../../../Modules/MyProfile/MyProfile";
import HistoryOrder from "../HistoryOrder/HistoryOrder";
import SetPassWord from "../../../Modules/MyProfile/components/SetPassWord/SetPassWord";
import News from "../../../Modules/News/News";

class App extends React.Component {
    render() {
        const { path } = this.props.match;
        return (
            <div className="App background-web">
                <AppHeader></AppHeader>
                <Switch>
                    <Route exact path={`${path}`} render={()=>{
                        return <Redirect to="/app/home" ></Redirect>
                    }}/>
                    <Route path={`${path}/home`} component={Homepage} />
                    <Route path={`${path}/booking`} component={Booking} />
                    <Route path={`${path}/news`} component={News} />
                    <Route path={`${path}/login`} component={Login} />
                    <Route path={`${path}/sigup`} component={Sigup} />
                    <Route path={`${path}/contact`} component={Contact} />
                    <Route path={`${path}/myprofile`} component={MyProfile} />
                    <Route path={`${path}/myorder`} component={HistoryOrder} />
                    <Route path={`${path}/setPassword`} component={SetPassWord} />
                </Switch>
                <AppFooter></AppFooter>
            </div>
        );
    }
}

export default withRouter(App);
