import { Card, Col, Row, Typography } from 'antd';
import React, { useContext, useMemo, useState } from 'react';
import { dataCompanyContext } from '../../../../contexts/dataCompany.context';
import { createUseStyles } from 'react-jss';
import { PriceFormater } from '../../../../../helpers/priceFormater';
import BtnAddAmountItem from '../btn-addAmount-item.component';
import Tab from './tab.component';

const style = createUseStyles({
  card: {
    width: '100% !important',
    marginTop: '10px',
    transition: '0.3s ease',
  },
  contentCard: {
    width: '100% !important',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '50px',
  },
});

export default function TabCategoria() {
  const { dataCompany, dataCart, current, setCurrent } =
    useContext(dataCompanyContext);
  const { card, contentCard } = style();

  const format = new PriceFormater();

  useMemo(() => {
    setCurrent({
      index: 0,
      item: dataCompany?.Menu?.map((item) => item.categoria)[0],
    });
  }, [dataCompany]);

  return (
    <>
      <Tab></Tab>
      <Row
        style={{ width: '100%', alignItems: 'center', transition: '0.3s ease' }}
      >
        {dataCompany?.Menu?.filter((item) => {
          return item.categoria === current.item;
        }).map((item, index) => {
          return (
            <>
              <Card className={card} key={index}>
                <Row className={contentCard}>
                  <Col
                    style={{
                      flex: 1,
                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Typography.Title
                      level={5}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {item.title}
                    </Typography.Title>
                  </Col>
                  <Col
                    style={{
                      flex: 1,

                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <Row style={{ gap: 10 }}>
                      <Typography.Text style={{ color: '#121212' }}>
                        {' '}
                        Acompanhamentos:{' '}
                      </Typography.Text>
                      <Typography.Text style={{ color: 'silver' }}>
                        {item.description}
                      </Typography.Text>
                    </Row>
                  </Col>
                  <Col
                    style={{
                      flex: 1,

                      display: 'flex',
                      justifyContent: 'flex-start',
                    }}
                  >
                    <BtnAddAmountItem
                      companyId={dataCompany.id}
                      index={}
                      item={item}
                    ></BtnAddAmountItem>
                  </Col>
                  <Row style={{ flex: '1', gap: '30px' }}>
                    <Col
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Typography.Link
                        style={{
                          color: dataCompany.backgroundColor,
                          textDecoration: 'underline',
                        }}
                      >
                        Detalhes
                      </Typography.Link>
                    </Col>
                    <Col
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                      }}
                    >
                      <Typography.Title level={5} style={{ color: '#04B400' }}>
                        {!dataCart.map((item) => item.order[0].qtd)[
                          dataCart.findIndex((i) => i.id === item.id)
                        ]
                          ? format.formater({ price: item.price })
                          : format.formater({
                              price: dataCart.map((item) => item.amoutMoney)[
                                dataCart.findIndex((i) => i.id === item.id)
                              ],
                            })}
                      </Typography.Title>
                    </Col>
                  </Row>
                </Row>
              </Card>
            </>
          );
        })}
      </Row>
    </>
  );
}
