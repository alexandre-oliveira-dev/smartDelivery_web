import { Card, Col, Row, Skeleton, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { dataCompanyContext } from '../../../contexts/dataCompany.context';

const styles = createUseStyles({
  container: {
    width: '100%',
    gap: '40px',
    flexWrap: 'nowrap',
  },
  card: {
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  btnamount: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    color: '#fff',
  },
});

export default function ProductInEmphasisComponent() {
  const { container, card, btnamount } = styles();
  const { dataCompany, load } = useContext(dataCompanyContext);
  if (!dataCompany) return <Skeleton></Skeleton>;
  return (
    <>
      {load ? (
        <Skeleton
          active
          paragraph={{
            rows: 3,
            className: card,
          }}
        ></Skeleton>
      ) : (
        <Row className={container}>
          {dataCompany.Menu?.slice(0, 4).map(
            (item: (typeof dataCompany.Menu)[0], index: number) => {
              return (
                <Card bordered key={index} className={card}>
                  <Col>
                    <Row style={{ minHeight: '60px' }}>
                      <Typography.Title level={4}>
                        {item.title}
                      </Typography.Title>
                    </Row>
                    <Row>
                      <Typography.Text style={{ color: 'silver' }}>
                        {item.amount}
                      </Typography.Text>
                    </Row>
                    <Row>
                      <Typography.Text style={{ color: 'silver' }}>
                        serve até {item.weight} pessoa(s)
                      </Typography.Text>
                    </Row>
                    <Row>
                      <Typography.Text
                        style={{
                          color: 'green',
                          fontWeight: '600',
                          fontSize: '20px',
                        }}
                      >
                        {parseFloat(item.price)?.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'brl',
                        })}
                      </Typography.Text>
                    </Row>
                    <Row
                      style={{
                        gap: '5px',
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '10px',
                      }}
                    >
                      <button
                        className={btnamount}
                        style={{ background: dataCompany?.backgroundColor }}
                      >
                        -
                      </button>
                      0
                      <button
                        className={btnamount}
                        style={{ background: dataCompany?.backgroundColor }}
                      >
                        +
                      </button>
                    </Row>
                    <Row
                      style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '10px',
                      }}
                    >
                      <Typography.Link href="">ver detalhes</Typography.Link>
                    </Row>
                  </Col>
                </Card>
              );
            }
          )}
        </Row>
      )}
    </>
  );
}
