import React, { useState } from "react";
import NavBarComponent from "../components/navbarComponent";
import Title from "../components/Title";
import "./style.css";
import "../styleGlobalDash.css";
import { Table, Button, Typography, Card, Col, Row, Tag } from "antd";
import { ColumnsType } from "antd/es/table";

export default function Dashboard() {
  const data = [
    {
      id: 1,
      name: "ale",
      order: ["batata", "coca lata 300ml"],
      address: "tv dois de julho",
      phone: "11 994407328",
      amount: "R$25,00",
      payment: "credCard",
      created_at: "30/05/2023 as 20:20",
    },
    {
      id: 2,
      name: "bianca rocha dos santos",
      order: ["esfiha", "dolly lata 300ml"],
      address: "tv dois de julho",
      phone: "11 994407328",
      amount: "R$25,00",
      payment: "credCard",
      created_at: "30/05/2023 as 20:20",
    },
  ];

  type DataType = (typeof data)[0];

  const [dataOrder, setDataOrder] = useState<DataType>();

  const orders = data.map((item) => item.order);

  const coluns: ColumnsType<any> = [
    {
      title: "id",
      dataIndex: "id",
      align: "left",
      key: "id",
    },
    {
      title: "cliente",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Pedido",
      dataIndex: "orders",
      render(text, rec, indexx) {
        return orders
          .filter((item, index) => index === indexx)
          .map((item) => item.map((i) => <p>{i}</p>));
      },
    },
    {
      title: "Endereço",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Telefone",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Modo de pagamento",
      dataIndex: "payment",
      key: "payment",
    },
    {
      title: "Data",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "Ações",
      render: (text, rec, index) => {
        return (
          <Button
            onClick={() => {
              document.querySelector(".box-modalOrders")?.setAttribute("style", "display:flex");
              setDataOrder(rec);
            }}
            type="primary"
            style={{ color: "#fff" }}
          >
            Atualizar pedido
          </Button>
        );
      },
    },
  ];

  const colunsOrdersFinished: ColumnsType<any> = [
    {
      title: "id",
      dataIndex: "id",
      align: "left",
      key: "id",
    },
    {
      title: "cliente",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Pedido",
      dataIndex: "orders",
      render(text, rec, indexx) {
        return orders
          .filter((item, index) => index === indexx)
          .map((item) => item.map((i) => <p>{i}</p>));
      },
    },
    {
      title: "Telefone",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Data",
      dataIndex: "created_at",
      key: "created_at",
    },
  ];


  return (
    <div className="box-global-dash">
      <NavBarComponent btn1={true}></NavBarComponent>
      <div className="content-dasboard-pages">
        <Title align="center" color="#fff" size="20px" text="Meus Pedidos"></Title>

        <div style={{ marginTop: "100px" }}>
          <Typography.Title level={2}>Pedidos</Typography.Title>
          <Table size="large" tableLayout="auto" dataSource={data} columns={coluns}></Table>

          <Typography.Title level={2}>Pedidos finalizados</Typography.Title>

          <Table size="large" tableLayout="auto" columns={colunsOrdersFinished}></Table>
        </div>
      </div>
      <div className="box-modalOrders">
        <Card className="ModalOrders">
          <div style={{ display: "flex", width: "100%", justifyContent: "space-between" }}>
            <Typography.Title level={3}>Detalhes do pedido</Typography.Title>{" "}
            <Button
              onClick={() =>
                document.querySelector(".box-modalOrders")?.setAttribute("style", "display:none")
              }
              type="default"
            >
              X
            </Button>
          </div>
          <Row gutter={20}>
            <Col>
              <Typography.Title key={dataOrder?.id} level={5}>
                Nome:
              </Typography.Title>
              <Typography.Paragraph>{dataOrder?.name}</Typography.Paragraph>
              <Typography.Title level={5}>Endereço:</Typography.Title>
              <Typography.Paragraph copyable={true}>{dataOrder?.address}</Typography.Paragraph>
              <Typography.Title  level={5}>Telefone:</Typography.Title>
              <Typography.Paragraph copyable={true}>{dataOrder?.phone}</Typography.Paragraph>
            </Col>
            <Col>
              <Typography.Title level={5}>Metodo de pagamento:</Typography.Title>
              <Typography.Paragraph>{dataOrder?.payment}</Typography.Paragraph>
              <Typography.Title level={5}>Pedido:</Typography.Title>
              {dataOrder?.order.map((item) => (
                <Typography.Paragraph><Tag>{item}</Tag></Typography.Paragraph>
              ))}
            </Col>
          </Row>

          <Button type="primary">Finalizar Pedido</Button>
        </Card>
      </div>
    </div>
  );
}
