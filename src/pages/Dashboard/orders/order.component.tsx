import React, { useContext, useState } from "react";
import NavBarComponent from "../components/navbarComponent";
import Title from "../components/Title";
import "./style.css";
import "../styleGlobalDash.css";
import { Table, Button, Typography, Col, Row, Spin, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import ModalOrders from "./modalOrders.component";
import { DashContext } from "../../../context/dashboard.context";
import dayjs from "dayjs";
import ModalCloseOfficeHour from "./modal-close-officeHour.component";

export default function Dashboard() {
  const { corNavPrev, load, dataOrders,loadTables,setOpenModal,asUser } = useContext(DashContext);
  const [dataOrder, setDataOrder] = useState<any>();

  const orders = dataOrders.map((item: any) => item.order);
  const coluns: ColumnsType<any> = [
    {
      title: "Ordem",
      align: "left",
      dataIndex: "index",
      key: "index",
      render(item, index: number) {
        return <p># {orders.findIndex((i: number) => i === index) + 2}</p>;
      },
    },
    {
      title: "cliente",
      dataIndex: "client",
      key: "name",
      render(text, rec, indexx) {
        return <p>{rec?.client?.name}</p>;
      },
    },
    {
      title: "Pedido",
      dataIndex: "orders",
      render(text, rec, indexx) {
        return orders
          .filter((item, index) => index === indexx)
          .map((item) => item.map((i: string) => <p>{i}</p>));
      },
    },
    {
      title: "Endereço",
      dataIndex: "address",
      key: "address",
      render(rec) {
        return <Typography.Text copyable>{rec}</Typography.Text>;
      },
    },
    {
      title: "Telefone",
      dataIndex: "client",
      key: "client",
      render(text, rec, indexx) {
        return <Typography.Text copyable>{rec?.client?.phone}</Typography.Text>;
      },
    },
    {
      title: "Modo de pagamento",
      dataIndex: "payment_method",
      key: "payment_method",
      render(item) {
        return <Tag color="green">{item}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render(item) {
        return (
          <>
            {item === "preparando" ? (
              <Tag color="green">{item}</Tag>
            ) : item === "entrega" ? (
              <Tag color="blue">{item}</Tag>
            ) : item === "cancelado" ? (
              <Tag color="red">{item}</Tag>
            ) : (
              item === "finalizado" && <Tag color="purple">{item}</Tag>
            )}
          </>
        );
      },
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
      title: "cliente",
      dataIndex: "client",
      key: "client",
      render(text, rec, indexx) {
        return <Typography.Text>{rec?.client?.name}</Typography.Text>;
      },
    },
    {
      title: "Pedido",
      dataIndex: "orders",
      render(text, rec, indexx) {
        return orders
          .filter((item, index) => index === indexx)
          .map((item) => item.map((i: string) => <p>{i}</p>));
      },
    },
    {
      title: "Telefone",
      dataIndex: "client",
      key: "client",
      render(text, rec, indexx) {
        return <Typography.Text copyable>{rec?.client?.phone}</Typography.Text>;
      },
    },
    {
      title: "Valor pago",
      dataIndex: "amoutMoney",
      key: "amoutMoney",
      render(item) {
        return (
          <Tag color="green">
            {parseFloat(item).toLocaleString("pt-br", { style: "currency", currency: "BRL" })}
          </Tag>
        );
      },
    },
    {
      title: "Modo de pagamento",
      dataIndex: "payment_method",
      key: "payment_method",
      render(item) {
        return <Tag color="green">{item}</Tag>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render(item) {
        return (
          <>
            {item === "preparando" ? (
              <Tag color="green">{item}</Tag>
            ) : item === "entrega" ? (
              <Tag color="blue">{item}</Tag>
            ) : item === "cancelado" ? (
              <Tag color="red">{item}</Tag>
            ) : (
              item === "finalizado" && <Tag color="purple">{item}</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Data",
      dataIndex: "created_at",
      key: "created_at",
      render(item) {
        return dayjs(item).format("DD/MM/YYYY");
      },
    },
  ];


  let soma = 0;
  const ordersFinishedValue:string[] = dataOrders.filter((item:any) => item.status === 'finalizado').map((item:any) => (item?.amoutMoney))
  for(let i = 0; i < 2; i ++){
    soma += parseFloat(ordersFinishedValue[i])
  }
  const amountOrders = dataOrders.filter((item:any) => item.status === 'finalizado').length
  const amountvalue = soma
  const date = (dayjs(new Date()).format('DD/MM/YYYY'))
  const companyId:string = asUser?.companyId


  return (
    <>
    <ModalCloseOfficeHour data={{amountOrders,amountvalue,date,companyId}}></ModalCloseOfficeHour>
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
              <Table
                size="large"
                tableLayout="auto"
                dataSource={dataOrders?.filter((status:any) => status?.status === "preparando" || status?.status === 'cancelado' )}
                columns={coluns}
                loading={loadTables}
              ></Table>

              <Typography.Title level={2}>Pedidos finalizados</Typography.Title>

              <Table
                size="large"
                tableLayout="auto"
                columns={colunsOrdersFinished}
                dataSource={dataOrders.filter((status: any) => status?.status === "finalizado" || status?.status === 'entrega')}
                loading={loadTables}
              ></Table>

              <Row style={{ marginTop: "50px" }}>
                <Col>
                  <Typography.Title level={2}>Realizar Fechamento de expediente</Typography.Title>
                  <Button style={{ background: corNavPrev }} type="primary" onClick={()=>setOpenModal(true)}>
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
