import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import BookingView from './Components';
import Detail from './Components/BookingDetail/Detail';


class Booking extends Component {

    render() {
        const { path } = this.props.match;
        return (
            <div className="RoomList">
                <Switch>
                    <Route exact path={`${path}`}  component={BookingView} />
                    <Route exact path={`${path}/:id`}  component={Detail} />
                </Switch>
            </div>
        )
    }
}

export default Booking