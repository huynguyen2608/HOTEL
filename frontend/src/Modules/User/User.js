import React, { Component } from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import CraeteUpdate from './Components/CreateUpdate';
import UserView from './Components/UserView';

class Users extends Component {

    render() {
        const { path } = this.props.match;

        const data = JSON.parse(sessionStorage.getItem('user'));

        const { customer } = data;
        return (
            <div className="Customers">
                <Switch>
                    <Route exact path={`${path}`} component={UserView} />
                    {customer?.role === 'admin' ?
                     <Route exact path={`${path}/create`} component={CraeteUpdate} /> :
                     <Route exact path={`${path}/create`} component={UserView} />}
                    {customer?.role === 'admin' ? 
                    <Route exact path={`${path}/:id`} component={CraeteUpdate} /> 
                    : <Route exact path={`${path}/create`} component={UserView} />}

                    
                </Switch>
            </div>
        )
    }
}

export default Users