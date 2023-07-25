import React from 'react';
import Title from '../components/Title';
import NavBarComponent from '../components/navbarComponent';

export default function MyPlain() {
  return (
    <>
      <NavBarComponent btn4={true}></NavBarComponent>
      <div className="box-global-dash">
        <div className="content-dasboard-pages">
          <Title
            align="center"
            text="Meu Plano"
            size="25px"
            color="#fff"
          ></Title>
        </div>
      </div>
    </>
  );
}
