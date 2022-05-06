import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import HomePageView from './Components';


class Homepage extends Component {

    render() {
        const { path } = this.props.match;
        return (
            <div className="HomePage">
                <Switch>
                    <Route path={`${path}`}  component={HomePageView} />
                </Switch>
            </div>
        )
    }
}

export default Homepage