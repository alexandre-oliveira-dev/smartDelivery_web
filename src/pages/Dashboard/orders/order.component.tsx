import React, { useContext, useState } from "react";
import NavBarComponent from "../components/navbarComponent";
import Title from "../components/Title";
import "./style.css";
import "../styleGlobalDash.css";
import { Table, Button, Typography, Col, Row, Spin } from "antd";
import { ColumnsType } from "antd/es/table";
import ModalOrders from "./modalOrders.component";
import { DashContext } from "../../../context/dashboard.context";

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

export type DataType = (typeof data)[0];

export default function Dashboard() {
  const { corNavPrev, load } = useContext(DashContext);
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
            style={{ color: "#fff", background: corNavPrev }}
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
    <>
      <NavBarComponent btn1={true}></NavBarComponent>
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
            <Title align="center" color="#fff" size="25px" text="Meus Pedidos"></Title>

            <div style={{ marginTop: "100px" }}>
              <Typography.Title level={2}>Pedidos</Typography.Title>
              <Table size="large" tableLayout="auto" dataSource={data} columns={coluns}></Table>

              <Typography.Title level={2}>Pedidos finalizados</Typography.Title>

              <Table size="large" tableLayout="auto" columns={colunsOrdersFinished}></Table>

              <Row style={{ marginTop: "50px" }}>
                <Col>
                  <Typography.Title level={2}>Realizar Fechamento de expediente</Typography.Title>
                  <Button style={{ background: corNavPrev }} type="primary">
                    Fechar expediente
                  </Button>
                </Col>
              </Row>
            </div>
          </div>
          <div className="box-modalOrders">
            <ModalOrders data={dataOrder}></ModalOrders>
          </div>
        </div>
      )}
    </>
  );
}
