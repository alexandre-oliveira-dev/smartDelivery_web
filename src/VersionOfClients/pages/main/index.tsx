import React from 'react';
import MainPageComponent from './components/mainPageComoponent';
import { DataCompanyContextProvider } from '../../contexts/dataCompany.context';
import store from '../../store';
const { Provider } = require('react-redux');

export default function MainPageComponentIndex() {
  return (
    <>
      <Provider store={store}>
        <DataCompanyContextProvider>
          <MainPageComponent></MainPageComponent>
        </DataCompanyContextProvider>
      </Provider>
    </>
  );
}
