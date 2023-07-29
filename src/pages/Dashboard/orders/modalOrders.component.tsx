import { Button, Card, Col, Row, Spin, Tag, Typography } from "antd";
import React, { useContext, useState } from "react";
import "./style.css";
import { DashContext } from "../../../context/dashboard.context";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import OrderCancelComponent from './orderCancel.component';

type Datamodal = {
  data?: any;
};

export default function ModalOrders({ data }: Datamodal) {
  const { corNavPrev } = useContext(DashContext);
  const [load, setLoad] = useState(false);

  async function handleUpdateStatusOrder(id: string) {
    setLoad(true);
    await api
      .put(`/orders/${id}`, {
        status: 'entrega',
      })
      .then(() => {
        setLoad(false);
        toast.success('Pedido atualizado com sucesso!');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(() => {
        setLoad(false);
        toast.error('ops, tente novamente!');
      });
  }

  return (
    <>
      <Card className="ModalOrders">
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Typography.Title level={3}>Detalhes do pedido</Typography.Title>{' '}
          <Button
            onClick={() =>
              document
                .querySelector('.box-modalOrders')
                ?.setAttribute('style', 'display:none')
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
            <Typography.Paragraph>{data?.client.name}</Typography.Paragraph>
            <Typography.Title level={5}>Endereço:</Typography.Title>
            <Typography.Paragraph copyable={true}>
              {data?.address}
            </Typography.Paragraph>
            <Typography.Title level={5}>Telefone:</Typography.Title>
            <Typography.Paragraph copyable={true}>
              {data?.client?.phone}
            </Typography.Paragraph>
          </Col>
          <Col>
            <Typography.Title level={5}>Metodo de pagamento:</Typography.Title>
            <Typography.Paragraph>{data?.payment_method}</Typography.Paragraph>
            <Typography.Title level={5}>Pedido:</Typography.Title>
            {data?.order.map((item: { item: string; qtd: number }) => (
              <Tag color="purple">
                {
                  <Row style={{ gap: '10px' }}>
                    <p>{item.item}</p>
                    <p>{item.qtd}</p>
                  </Row>
                }
              </Tag>
            ))}
          </Col>
        </Row>

        <Row style={{ gap: '20px' }}>
          <Button
            style={{ background: corNavPrev, width: '150px' }}
            type="primary"
            onClick={() => handleUpdateStatusOrder(data?.id)}
          >
            {load ? <Spin></Spin> : 'Finalizar Pedido'}
          </Button>

          <OrderCancelComponent
            orderId={data?.id}
            status={data?.status}
          ></OrderCancelComponent>
        </Row>
      </Card>
    </>
  );
}
