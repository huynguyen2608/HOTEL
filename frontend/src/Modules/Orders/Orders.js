import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import CreateUpdateOrder from './Components/CreateUpdateOrder';
import OrderView from './Components/OrderView';

class Orders extends Component {

    render() {
        const { path } = this.props.match;
        return (
            <div className="Orders">
                <Switch>
                    <Route exact path={`${path}`}  component={OrderView} />
                    <Route exact path={`${path}/create`}  component={CreateUpdateOrder} />
                    <Route exact path={`${path}/:id`}  component={CreateUpdateOrder} />
                </Switch>
            </div>
        )
    }
}

export default Orders