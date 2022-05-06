import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import CreateUpdateRoom from './Components/CreateUpdateRoom';
import RoomView from './Components/RoomView';

class Rooms extends Component {

    render() {
        const { path } = this.props.match;
        const data = JSON.parse(sessionStorage.getItem('user'));


        const { customer } = data;
        return (
            <div className="Rooms">
                <Switch>
                    <Route exact path={`${path}`} component={RoomView} />
                    {customer?.role === 'admin' ?
                        <Route exact path={`${path}/create`} component={CreateUpdateRoom} /> :
                        <Route exact path={`${path}/create`} component={RoomView} />}
                    {customer?.role === 'admin' ?
                        <Route exact path={`${path}/:id`} component={CreateUpdateRoom} />
                        : <Route exact path={`${path}/create`} component={RoomView} />}
                </Switch>
            </div>
        )
    }
}

export default Rooms