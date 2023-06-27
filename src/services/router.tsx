import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard/orders";
import Faturamento from "../pages/Dashboard/Faturamento";
import Config from "../pages/Dashboard/Configs";
import Register from "../pages/Register";
import AboutUs from "../pages/aboutUs";


export default function RouterApp() {
  return (
    <Switch>
      <Route exact path={"/"} component={Home}></Route>
      <Route exact path={"/dashboard/:company"} component={Dashboard}></Route>
      <Route exact path={"/dashboard/:company/config"} component={Config}></Route>
      <Route exact path={"/dashboard/:company/faturamento"} component={Faturamento}></Route>
      <Route exact path={"/cadastro"} component={Register}></Route>
      <Route exact path={"/sobrenos"} component={AboutUs}></Route>
    </Switch>
  );
}
