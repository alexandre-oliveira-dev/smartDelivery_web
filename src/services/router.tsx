import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard/orders";
import Faturamento from "../pages/Dashboard/Faturamento";


export default function RouterApp() {
  return (
    <Switch>
      <Route exact path={"/"} component={Home}></Route>
      <Route exact path={"/dashboard/:company"} component={Dashboard}></Route>
      <Route exact path={"/dashboard/:company/faturamento"} component={Faturamento}></Route>
    </Switch>
  );
}
