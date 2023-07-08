import React, { useContext } from "react";
import NavBarComponent from "../components/navbarComponent";
import "../styleGlobalDash.css";
import { Card, Col, Row, Spin, Typography } from "antd";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title as title,
  Tooltip,
  BarElement,
  ChartOptions,
} from "chart.js";
import dayjs from "dayjs";
import Title from "../components/Title";
import { DashContext } from "../../../context/dashboard.context";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, title, Tooltip, BarElement);

export default function Faturamento() {
  const {
    corNavPrev,
    load,
    dataOrdersFinished: datafat,
  } = useContext(DashContext);

  let soma = 0;
  const amountOrdersArray: string[] = datafat.map((item: any) => item?.amountOrders);
  for (let i = 0; i < amountOrdersArray.length; i++) {
    soma += parseFloat(amountOrdersArray[i]);
  }
  const amountOrders: number = soma;

  const options: ChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
      
    },
  };

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

  const card: React.CSSProperties = {};

  return (
    <>
      <NavBarComponent btn2={true}></NavBarComponent>
      {load ? (
        <Spin
          size="large"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        ></Spin>
      ) : (
        <div className="box-global-dash">
          <div className="content-dasboard-pages">
            <Title align="center" color="#fff" size="25px" text="Faturamento"></Title>
            <Typography.Title level={2}>Dashboard</Typography.Title>

            <Row gutter={20}>
              <Col>
                <Card style={card}>
                  <Typography.Title level={4}>Vendas no mês</Typography.Title>
                  <Bar
                    options={options as any}
                    data={{
                      datasets: [
                        {
                          data: [12, 19, 3, 5, 2, 3],
                          backgroundColor: corNavPrev,
                        },
                      ],
                      yLabels: ["R$"],
                      labels: months,
                    }}
                  ></Bar>
                </Card>
              </Col>
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
                      yLabels: ["R$"],
                      labels: datafat
                        .map((item: any) => item.date)
                        .slice(datafat.length > 8 ? datafat.length - 8 : 0, datafat.length),
                    }}
                  ></Line>
                </Card>
              </Col>
              <Col>
                <Card style={card}>
                  <Typography.Title level={4}>Vendas no mês</Typography.Title>
                  <Bar
                    options={options as any}
                    data={{
                      datasets: [
                        {
                          data: [12, 19, 3, 5, 2, 3],
                          backgroundColor: corNavPrev,
                        },
                      ],
                      yLabels: ["R$"],
                      labels: months,
                    }}
                  ></Bar>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card style={card}>
                  <Typography.Title level={4}>Total de pedidos</Typography.Title>
                  <Typography.Text>{amountOrders}</Typography.Text>
                </Card>
              </Col>
              <Col>
                <Card style={card}>
                  <Typography.Title level={4}>Faturamento total</Typography.Title>
                  <Typography.Text>{'R$25000,00'}</Typography.Text>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </>
  );
}
