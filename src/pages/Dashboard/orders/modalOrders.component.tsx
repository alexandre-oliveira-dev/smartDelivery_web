import { Button, Card, Col, Row, Tag, Typography } from "antd";
import React, { useContext } from "react";
import { DataType } from ".";
import './style.css'
import { DashContext } from "../../../context/dashboard.context";


type Datamodal ={ 
    data?:DataType
}


export default function ModalOrders({data}:Datamodal) {
  const {corNavPrev} = useContext(DashContext)

  return (
    <>
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
            <Typography.Title key={data?.id} level={5}>
              Nome:
            </Typography.Title>
            <Typography.Paragraph>{data?.name}</Typography.Paragraph>
            <Typography.Title level={5}>Endereço:</Typography.Title>
            <Typography.Paragraph copyable={true}>{data?.address}</Typography.Paragraph>
            <Typography.Title level={5}>Telefone:</Typography.Title>
            <Typography.Paragraph copyable={true}>{data?.phone}</Typography.Paragraph>
          </Col>
          <Col>
            <Typography.Title level={5}>Metodo de pagamento:</Typography.Title>
            <Typography.Paragraph>{data?.payment}</Typography.Paragraph>
            <Typography.Title level={5}>Pedido:</Typography.Title>
            {data?.order.map((item) => (
              <Typography.Paragraph>
                <Tag>{item}</Tag>
              </Typography.Paragraph>
            ))}
          </Col>
        </Row>

        <Button style={{background:corNavPrev}} type="primary">Finalizar Pedido</Button>
      </Card>
    </>
  );
}
