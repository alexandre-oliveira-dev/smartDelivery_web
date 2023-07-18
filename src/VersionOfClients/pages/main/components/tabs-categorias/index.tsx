import { Button, Card, Col, Row, Tabs, Typography } from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import React, { useContext, useEffect, useState } from 'react';
import { dataCompanyContext } from '../../../../contexts/dataCompany.context';
import { createUseStyles } from 'react-jss';

const style = createUseStyles({
  tab: {
    width: '100%',
    height: '60px',
    background: '#fff',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '10px 0 10px 0',
  },
  btntab: {
    background: 'transparent',
    border: '0',
    fontWeight: '600',
    fontSize: '17px',
    boxShadow: 'none',
  },
  card: {
    width: '100% !important',
    height: '50px',
    marginTop: '10px',
  },
  contentCard: {
    width: '100% !important',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default function TabCategoria() {
  const { dataCompany, load } = useContext(dataCompanyContext);
  const { tab, btntab, card, contentCard } = style();
  const [current, setCurrent] = useState<{
    item: string;
    index: number | null;
  }>({
    item: ' ',
    index: 0,
  });

  const cat = dataCompany?.Menu?.map(
    (item: { categoria: string }) => item.categoria
  ) as [];

  return (
    <>
      <Row className={tab}>
        {cat
          ?.filter((item, index) => {
            return cat.indexOf(item) === index;
          })
          .map((item: any, index) => {
            return (
              <>
                <Col key={index}>
                  <Button
                    className={btntab}
                    onClick={() => setCurrent({ item: item, index: index })}
                  >
                    {item}
                  </Button>
                </Col>
              </>
            );
          })}
      </Row>
      <Row style={{ width: '100%', alignItems: 'center' }}>
        {dataCompany?.Menu?.filter((item) => {
          return item.categoria === current.item;
        }).map((item) => {
          return (
            <>
              <Card className={card}>
                <Row className={contentCard}>
                  <Col
                    style={{
                      flex: 1,

                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    {item.title}
                  </Col>
                  <Col
                    style={{
                      flex: 1,

                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Row style={{ gap: 10 }}>
                      <Typography.Text style={{ color: 'silver' }}>
                        {' '}
                        Acompanhamentos:{' '}
                      </Typography.Text>
                      {item.description}
                    </Row>
                  </Col>

                  <Col
                    style={{
                      flex: 1,

                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Typography.Title level={5} style={{ color: 'green' }}>
                      {' '}
                      {parseFloat(item.price).toLocaleString('bt-br', {
                        style: 'currency',
                        currency: 'brl',
                      })}
                    </Typography.Title>
                  </Col>
                </Row>
              </Card>
            </>
          );
        })}
      </Row>
    </>
  );
}
