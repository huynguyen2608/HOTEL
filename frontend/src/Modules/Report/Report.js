import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import { ViewReport } from "./ViewReport";

class Report extends Component {
    render() {
        const { path } = this.props.match;
        return (
            <div className="Rooms">
                <Switch>
                    <Route exact path={`${path}`}  component={ViewReport} />
                </Switch>
            </div>
        )
    }
}

export default Report