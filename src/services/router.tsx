import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard/orders";


export default function RouterApp() {
  return (
    <Switch>
      <Route exact path={"/"} component={Home}></Route>
      <Route exact path={"/dashboard/:company"} component={Dashboard}></Route>
    </Switch>
  );
}
