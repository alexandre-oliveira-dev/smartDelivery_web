import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";

export default function RouterApp() {
  return (
    <Switch>
      <Route exact path={"/"} component={Home}></Route>
    </Switch>
  );
}
