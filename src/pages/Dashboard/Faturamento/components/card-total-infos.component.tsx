import { Card, Col, Row, Typography } from 'antd';
import React, { useContext } from 'react';
import { DashContext } from '../../../../context/dashboard.context';

export default function CardTotalInfosComponent() {
  const { dataOrdersFinished: datafat } = useContext(DashContext);
  const card: React.CSSProperties = {};

  //soma do total de pedidos
  let soma = 0;
  const amountOrdersArray: string[] = datafat.map(
    (item: any) => item?.amountOrders
  );
  for (let i = 0; i < amountOrdersArray.length; i++) {
    soma += parseFloat(amountOrdersArray[i]);
  }
  const amountOrders: number = soma;

  //soma do total faturado
  let somavalue = 0;
  const amountValueArray: number[] = datafat.map(
    (item: { amountvalue: number }) => item?.amountvalue
  );
  for (let i = 0; i < amountValueArray.length; i++) {
    somavalue += amountValueArray[i];
  }
  const amountValue = somavalue;
  return (
    <Row gutter={[22, 22]} style={{ marginTop: '20px' }}>
      <Col>
        <Card style={card}>
          <Typography.Title level={4}>Total de pedidos</Typography.Title>
          <Typography.Text>{amountOrders}</Typography.Text>
        </Card>
      </Col>
      <Col>
        <Card style={card}>
          <Typography.Title level={4}>Faturamento total</Typography.Title>
          <Typography.Text>
            {parseFloat(amountValue.toString()).toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Typography.Text>
        </Card>
      </Col>
    </Row>
  );
}
