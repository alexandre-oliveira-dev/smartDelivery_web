import { Card, Col, Typography } from 'antd';
import { ChartOptions } from 'chart.js';
import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { DashContext } from '../../../../context/dashboard.context';
import dayjs from 'dayjs';

export default function CardSalesMonthComponent() {
  const { dataOrdersFinished: datafat, corNavPrev } = useContext(DashContext);

  const card: React.CSSProperties = {};
  const options: ChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const arrayMonts: any[] = [];
  const amountMonths = 7;
  for (let i = 0; i < amountMonths; i++) {
    arrayMonts.push(dayjs(new Date()).set('month', i).format('MMMM'));
  }
  return (
    <Col>
      <Card style={card}>
        <Typography.Title level={4}>Vendas no mês</Typography.Title>
        <Bar
          options={options as any}
          data={{
            datasets: [
              {
                data: [12, 19, 3, 5, 2, 50, 65],
                backgroundColor: !corNavPrev ? '#5B72F2' : corNavPrev,
              },
            ],
            yLabels: [],
            labels: arrayMonts,
          }}
        ></Bar>
      </Card>
    </Col>
  );
}
