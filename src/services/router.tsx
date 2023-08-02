import React from "react";
import { Switch } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5';
import { DashProvider } from '../context/dashboard.context';
import Route from '../services/middleware';

//Pages
import Home from '../pages/Home';
import Register from '../pages/Register';
import AboutUs from '../pages/aboutUs';
import ConfigComponent from '../pages/Dashboard/Configs';
import FaturamentoComponent from '../pages/Dashboard/Faturamento';
import DashboardComponent from '../pages/Dashboard/orders';
import MyPlaincomponent from '../pages/Dashboard/MyPlain';
import MainPageComponentIndex from '../ClientVersion_web/src/pages/main';
import Cart from '../ClientVersion_web/src/pages/cart';

export default function RouterApp() {
  return (
    <QueryParamProvider adapter={ReactRouter5Adapter}>
      <DashProvider>
        <Switch>
          <Route exact path={'/'} component={Home}></Route>
          <Route
            exact
            path={'/dashboard/:company'}
            component={DashboardComponent}
            isPrivate
          ></Route>
          <Route
            exact
            path={'/dashboard/:company/config'}
            component={ConfigComponent}
            isPrivate
          ></Route>
          <Route
            exact
            path={'/dashboard/:company/faturamento'}
            component={FaturamentoComponent}
            isPrivate
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
          <Route
            exact
            path={'/:name_company/meu carrinho'}
            component={Cart}
          ></Route>
        </Switch>
      </DashProvider>
    </QueryParamProvider>
  );
}
