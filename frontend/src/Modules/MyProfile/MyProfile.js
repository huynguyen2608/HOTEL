import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import MyProfileView from './components';



class MyProfile extends Component {

    render() {
        const { path } = this.props.match;
        return (
            <div >
                <Switch>
                    <Route path={`${path}`}  component={MyProfileView} />
                </Switch>
            </div>
        )
    }
}

export default MyProfile