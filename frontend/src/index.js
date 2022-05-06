import React, { Suspense, Fragment } from "react";
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./Shared/Components/App/App";
// import Login from "./Shared/Components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/index.scss";
import instance from "./Shared/Services/AuthService";
// import { Row } from "reactstrap";
import AdminPage from "./Shared/Components/AdminPage/AdminPage";

const isLogged = instance.userInfo;
const Root = (
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Suspense>
        <Route exact path="/" render={() => {
            return (
              <Redirect to="/app" ></Redirect> 
            )
          }} ></Route>
          <Route path="/app" render={() => {
            return  (
              <App></App>
            )
          }} ></Route>
          <Route path="/admin" render={() => {
            return (isLogged === null ? 
              <Redirect to="/app/login" ></Redirect> :
              isLogged?.customer?.role !== 'customer' ?
              <AdminPage></AdminPage>
              : <Redirect to="/app" ></Redirect>
            )
          }} ></Route>
        </Suspense>
      </Switch>
    </Fragment>
  </BrowserRouter>
);
ReactDOM.render(Root, document.getElementById("root"));

export default Root;
