import React from 'react';
import Header from './headerComponent';
import FilterComponent from './filter.component';
import ContainerMain from './containerMain.component';

export default function MainPageComponent() {
  return (
    <>
      <Header></Header>
      <FilterComponent></FilterComponent>
      <ContainerMain></ContainerMain>
    </>
  );
}
