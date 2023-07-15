import { Card, Col, Typography } from 'antd';
import { ChartOptions } from 'chart.js';
import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { DashContext } from '../../../../context/dashboard.context';

export default function CardSalesWeeksComponent() {
  const { dataOrdersFinished: datafat, corNavPrev } = useContext(DashContext);
  const card: React.CSSProperties = {};
  const options: ChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <Col>
      <Card style={card}>
        <Typography.Title level={4}>Vendas na Semana</Typography.Title>
        <Line
          options={options as any}
          data={{
            datasets: [
              {
                data: datafat.map((item: any) => item?.amountvalue),
                backgroundColor: corNavPrev,
              },
            ],
            yLabels: ['R$'],
            labels: datafat
              .map((item: any) => item.date)
              .slice(
                datafat.length > 7 ? datafat.length - 7 : 0,
                datafat.length
              ),
          }}
        ></Line>
      </Card>
    </Col>
  );
}
