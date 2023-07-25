import React from 'react';
import MyPlain from './myplain.component';
import { DashProvider } from '../../../context/dashboard.context';

export default function MyPlaincomponent() {
  return (
    <DashProvider>
      <MyPlain></MyPlain>
    </DashProvider>
  );
}
