import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { DashContext } from '../context/dashboard.context';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}: any) {
  const { dataCompany } = useContext(DashContext);
  if (dataCompany?.isSubiscriber === false && isPrivate) {
    window.location.href = `/dashboard/${dataCompany?.name_company}/meuPlano`;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
