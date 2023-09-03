import { Card, Col, Typography } from 'antd';
import { ChartOptions } from 'chart.js';
import { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { DashContext } from '../../../../context/dashboard.context';

export default function CardSalesWeeksComponent() {
  const { dataOrdersFinished: datafat, corNavPrev } = useContext(DashContext);
  const options: ChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <Col style={{ width: '100%', display: 'grid', placeItems: 'center' }}>
      <Card
        style={{
          width: '70%',
        }}
      >
        <Typography.Title level={4}>Vendas na Semana</Typography.Title>
        <Line
          options={options as any}
          data={{
            datasets: [
              {
                data: datafat.map((item: any) => item?.amountvalue),
                backgroundColor: !corNavPrev ? '#5B72F2' : corNavPrev,
                hoverBackgroundColor: !corNavPrev ? '#5B72F2' : corNavPrev,
              },
            ],

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
