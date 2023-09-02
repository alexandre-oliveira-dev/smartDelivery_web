import { useContext } from 'react';
import { Route } from 'react-router-dom';
import { DashContext } from '../context/dashboard.context';

export default function RouteWrapper({
  //componente a ser renderizado
  component: Component,
  //flag para indentificar rota privada
  isPrivate,
  // indica as outras props do Router
  ...rest
}: any) {
  const { dataCompany, asUser } = useContext(DashContext);

  if (!asUser && isPrivate) {
    window.location.href = '/';
  }
  if (dataCompany?.isSubiscriber === false && isPrivate) {
    window.location.href = `/dashboard/${dataCompany?.name_company}/meuPlano`;
  }
  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
