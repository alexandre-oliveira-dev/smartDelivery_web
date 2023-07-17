import React from 'react';
import MainPageComponent from './components/mainPageComoponent';
import { DataCompanyContextProvider } from '../../contexts/dataCompany.context';

export default function MainPageComponentIndex() {
  return (
    <DataCompanyContextProvider>
      <MainPageComponent></MainPageComponent>
    </DataCompanyContextProvider>
  );
}
