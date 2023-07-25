import React from "react";
import { Switch, Route } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import { ReactRouter5Adapter } from "use-query-params/adapters/react-router-5";
import Home from "../pages/Home";
import Register from "../pages/Register";
import AboutUs from "../pages/aboutUs";
import ConfigComponent from "../pages/Dashboard/Configs";
import FaturamentoComponent from "../pages/Dashboard/Faturamento";
import DashboardComponent from "../pages/Dashboard/orders";
import MainPageComponentIndex from '../VersionOfClients/pages/main';
import MyPlaincomponent from '../pages/Dashboard/MyPlain';

export default function RouterApp() {
  return (
    <QueryParamProvider adapter={ReactRouter5Adapter}>
      <Switch>
        <Route exact path={'/'} component={Home}></Route>
        <Route
          exact
          path={'/dashboard/:company'}
          component={DashboardComponent}
        ></Route>
        <Route
          exact
          path={'/dashboard/:company/config'}
          component={ConfigComponent}
        ></Route>
        <Route
          exact
          path={'/dashboard/:company/faturamento'}
          component={FaturamentoComponent}
        ></Route>
        <Route
          exact
          path={'/dashboard/:company/meuPlano'}
          component={MyPlaincomponent}
        ></Route>
        <Route exact path={'/cadastro'} component={Register}></Route>
        <Route exact path={'/sobrenos'} component={AboutUs}></Route>
        <Route
          exact
          path={'/:name_company'}
          component={MainPageComponentIndex}
        ></Route>
      </Switch>
    </QueryParamProvider>
  );
}
