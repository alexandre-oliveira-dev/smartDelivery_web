import React, { useContext } from 'react';
import Title from '../components/Title';
import NavBarComponent from '../components/navbarComponent';
import { Button, Card, Col, Row, Skeleton, Tag, Typography } from 'antd';
import { DashContext } from '../../../context/dashboard.context';
import { RegisterValues } from '../../Register';

interface PropsTypes {
  dataCompany: RegisterValues;
}

const ContentCard = ({ dataCompany }: PropsTypes) => {
  return (
    <>
      {dataCompany?.isSubiscriber ? (
        <Col>
          <Row style={{ alignItems: 'center', gap: '20px' }}>
            <Row>
              <Typography.Title level={3}>
                Parabéns seu plano está ativo 🎉🥳
              </Typography.Title>
            </Row>
            <Row>
              <Typography.Title level={5}>
                Próxima cobrança: <Tag color="silver">05/08/2023</Tag>
              </Typography.Title>
            </Row>
          </Row>
          <Row>
            <Button type="primary" style={{ background: 'red' }}>
              Cancelar meu plano
            </Button>
          </Row>
        </Col>
      ) : (
        <Col>
          <Row>
            <Typography.Title level={3}>
              Seu plano não está ativo! 😕
            </Typography.Title>
          </Row>
          <Row>
            <Typography.Paragraph>
              Assine o plano para liberar o sistema!
            </Typography.Paragraph>
          </Row>
          <Row>
            <Button type="primary">Assinar agora!</Button>
          </Row>
        </Col>
      )}
    </>
  );
};

export default function MyPlain() {
  const { dataCompany, loadTables } = useContext(DashContext);

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

          {loadTables ? (
            <Skeleton
              style={{ width: '80%' }}
              active
              paragraph={{
                //rows: 3,
                width: '70%',
              }}
            ></Skeleton>
          ) : (
            <Card
              style={{
                width: '80%',
              }}
              title={
                <Row style={{ alignItems: 'center', gap: '20px' }}>
                  <Col>
                    <Typography.Title level={3}>Status:</Typography.Title>
                  </Col>
                  <Col>
                    {dataCompany?.isSubiscriber ? (
                      <Tag
                        style={{
                          height: 'min-content',
                          fontSize: '20px',
                          padding: '4px',
                        }}
                        color="green"
                      >
                        Ativo
                      </Tag>
                    ) : (
                      <Tag
                        style={{
                          height: 'min-content',
                          fontSize: '20px',
                          padding: '4px',
                        }}
                        color="red"
                      >
                        Inativo
                      </Tag>
                    )}
                  </Col>
                </Row>
              }
            >
              <ContentCard dataCompany={dataCompany}></ContentCard>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
