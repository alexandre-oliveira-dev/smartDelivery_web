import React from "react";
import NavBarComponent from "../components/navbarComponent";
import "../styleGlobalDash.css";
import { Card, Col, Row, Typography } from "antd";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  BarElement,
} from "chart.js";
import dayjs from "dayjs";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, BarElement);

export default function Faturamento() {
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const datafat = [
    {
      id: 1,
      date: "01/06/2023",
      amountOrders: 4,
      amountvalue: 200,
    },
    {
      id: 2,
      date: "02/06/2023",
      amountOrders: 4,
      amountvalue: 300,
    },
    {
      id: 3,
      date: "03/06/2023",
      amountOrders: 4,
      amountvalue: 600,
    },
    {
      id: 3,
      date: "04/06/2023",
      amountOrders: 4,
      amountvalue: 3500,
    },
    {
      id: 3,
      date: "05/06/2023",
      amountOrders: 4,
      amountvalue: 1000,
    },
    {
      id: 3,
      date: "06/06/2023",
      amountOrders: 4,
      amountvalue:2000,
    },
  
  ];

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const nowdate = dayjs(new Date());
  const daysofmonth = [""];
  const totaldays = nowdate.daysInMonth();

  for (let dia = 1; dia <= totaldays; dia++) {
    daysofmonth.push(nowdate.date(dia).format("DD/MM/YYYY"));
  }

console.log(Number(datafat.findIndex(item => item.date === dayjs(new Date()).format('DD/MM/YYYY'))))
  return (
    <>
      <NavBarComponent btn2={true}></NavBarComponent>
      <div className="box-global-dash">
        <div className="content-dasboard-pages">
          <Typography.Title level={1}>Faturamento</Typography.Title>
          <Row>
            <Col id="myChart">
              <Card>
                <Typography.Title level={4}>Vendas no mês</Typography.Title>
                <Bar
                  options={options}
                  data={{
                    datasets: [
                      {
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: "#612F74",
                      },
                    ],
                    yLabels: ["R$"],
                    labels: months,
                  }}
                ></Bar>
              </Card>
            </Col>
            <Col>
              <Card>
                <Typography.Title level={4}>Vendas na Semana</Typography.Title>
                <Line
                  options={options}
                  data={{
                    datasets: [
                      {
                        data: datafat.map(item => item.amountvalue),
                        backgroundColor: "#612F74",
                      },
                    ],
                    yLabels: ["R$"],
                    labels: datafat.map(item => item.date).concat(daysofmonth.slice(daysofmonth.findIndex(item => item === datafat[datafat.length -1].date))),
                  }}
                ></Line>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
