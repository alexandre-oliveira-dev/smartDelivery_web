import React, { useContext } from 'react';
import '../style.css';
import '../../styleGlobalDash.css';
import NavBarComponent from '../../components/navbarComponent';
import { Row, Spin, Typography } from 'antd';
import { DashContext } from '../../../../context/dashboard.context';
import Title from '../../components/Title';
import ContainerEditMyPage from './container-edit-page.component';
import TableForListItems from './table-list-items.component';
import ContainerEditDataCompany from './container-edit-dataComany.component';
import FormCreateCardapio from './form-create-cardapio.component';

export default function Config() {
  const { load } = useContext(DashContext);

  return (
    <>
      <NavBarComponent btn3={true}></NavBarComponent>
      {load ? (
        <Spin
          size="large"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        ></Spin>
      ) : (
        <div className="box-global-dash">
          <div className="content-dasboard-pages">
            <Title
              text="Configurações"
              size="25px"
              align="center"
              color="#fff"
            ></Title>
            <TableForListItems></TableForListItems>

            <Row
              style={{
                justifyContent: 'center',
                width: '100%',
                marginBottom: '3rem',
              }}
            >
              <Typography.Title level={3}>
                Adicionar itens no cardápio
              </Typography.Title>
            </Row>
            <FormCreateCardapio></FormCreateCardapio>
            <br></br>
            <br></br>
            <Typography.Title level={3}>
              Personalizar meu espaço online
            </Typography.Title>
            <Typography.Paragraph>
              Aqui você pode personalizar a cor e a logo do seu estabelecimento!
            </Typography.Paragraph>
            <br></br>
            <ContainerEditMyPage></ContainerEditMyPage>
            <br />
            <br />
            <Typography.Title level={3}>Editar meus Dados</Typography.Title>
            <ContainerEditDataCompany></ContainerEditDataCompany>
          </div>
        </div>
      )}
    </>
  );
}
