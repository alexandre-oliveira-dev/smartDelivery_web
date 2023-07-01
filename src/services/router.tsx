import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import AboutUs from "../pages/aboutUs";
import ConfigComponent from "../pages/Dashboard/Configs";
import FaturamentoComponent from "../pages/Dashboard/Faturamento";
import DashboardComponent from "../pages/Dashboard/orders";


export default function RouterApp() {
  return (
    <Switch>
      <Route exact path={"/"} component={Home}></Route>
      <Route exact path={"/dashboard/:company"} component={DashboardComponent}></Route>
      <Route exact path={"/dashboard/:company/config"} component={ConfigComponent}></Route>
      <Route exact path={"/dashboard/:company/faturamento"} component={FaturamentoComponent}></Route>
      <Route exact path={"/cadastro"} component={Register}></Route>
      <Route exact path={"/sobrenos"} component={AboutUs}></Route>
    </Switch>
  );
}
