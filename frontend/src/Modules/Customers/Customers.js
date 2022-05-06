import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import CraeteUpdate from './Components/CreateUpdate';
import CustomerView from './Components/CustomerView';

class Customers extends Component {

    render() {
        const { path } = this.props.match;
        const data = JSON.parse(sessionStorage.getItem('user'));

        const { customer } = data;
        console.log(customer);
        return (
            <div className="Customers">
                <Switch>
                    <Route exact path={`${path}`} component={CustomerView} />
                    {customer?.role === 'admin' ?
                     <Route exact path={`${path}/create`} component={CraeteUpdate} /> :
                     <Route exact path={`${path}/create`} component={CustomerView} />}
                    {customer?.role === 'admin' ? 
                    <Route exact path={`${path}/:id`} component={CraeteUpdate} /> 
                    : <Route exact path={`${path}/create`} component={CustomerView} />}
                </Switch>
            </div>
        )
    }
}

export default Customers