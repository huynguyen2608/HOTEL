import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import NewsPage from './Components/NewsPage';


class News extends Component {

    render() {
        const { path } = this.props.match;
        return (
            <div className="NewPage">
                <Switch>
                    <Route path={`${path}`}  component={NewsPage} />
                </Switch>
            </div>
        )
    }
}

export default News