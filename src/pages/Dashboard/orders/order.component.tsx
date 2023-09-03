import { useContext, useState } from 'react';
import NavBarComponent from '../components/navbarComponent';
import Title from '../components/Title';
import './style.css';
import '../styleGlobalDash.css';
import { Table, Button, Typography, Col, Row, Spin, Tag, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import ModalOrders from './modalOrders.component';
import { DashContext } from '../../../context/dashboard.context';
import dayjs from 'dayjs';
import ModalCloseOfficeHour from './modal-close-officeHour.component';
import ModalWarnigsOrderFinished from './modal-warning-orderFinished.component';
import SumaryStatusOrdersComponent from './sumary-status-orders.component';
import OrderCancelComponent from './orderCancel.component';
import { TbListDetails } from 'react-icons/tb';
import ModalDetailsOrders from './modal-details-order.component';
import { Orders, OrdersStatus } from '../../../types';
import { PriceFormater } from '../../../helpers/priceFormater';

export default function Dashboard() {
  const {
    corNavPrev,
    load,
    dataOrders,
    loadTables,
    setOpenModal,
    asUser,
    setWarnigsOrderFinished,
    setOpenModalDetailsOrders,
  } = useContext(DashContext);
  const [dataOrder, setDataOrder] = useState<Orders>({} as Orders);
  const [orderid, setOrderid] = useState<string>('');

  const orders = dataOrders
    .filter((item: any) => item.status !== OrdersStatus.Finalizado)
    .map((item: any) => item.order);
  const ordersFinished = dataOrders.map((item: any) => item.order);

  const coluns: ColumnsType<Orders> = [
    {
      title: 'Ordem',
      align: 'left',
      key: 'index',
      render(_item, _rec, index: number) {
        return <p># {index + 1}</p>;
      },
    },
    {
      title: 'cliente',
      dataIndex: 'client',
      key: 'client',
      render(_text, rec, _indexx) {
        return <p>{rec?.client?.name}</p>;
      },
    },
    {
      title: 'Valor',
      dataIndex: 'amoutMoney',
      render(rec) {
        return (
          <Tag color="green">
            {new PriceFormater().formater({ price: rec })}
          </Tag>
        );
      },
    },
    {
      title: 'Endereço',
      dataIndex: 'address',
      key: 'address',
      render(rec) {
        return <Typography.Text copyable>{rec}</Typography.Text>;
      },
    },
    {
      title: 'Telefone',
      dataIndex: 'client',
      key: 'client',
      render(_text, rec, _indexx) {
        return <Typography.Text copyable>{rec?.client?.phone}</Typography.Text>;
      },
    },
    {
      title: 'Modo de pagamento',
      dataIndex: 'payment_method',
      key: 'payment_method',
      render(item) {
        return <Tag color="green">{item}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render(item) {
        return (
          <>
            {item === OrdersStatus.Preparando ? (
              <Tag color="green">
                {item} <Spin size="small"></Spin>
              </Tag>
            ) : item === OrdersStatus.Entrega ? (
              <Tag color="blue">{item}</Tag>
            ) : item === OrdersStatus.Cancelado ? (
              <Tag color="red">{item}</Tag>
            ) : (
              item === OrdersStatus.Finalizado && (
                <Tag color="purple">{item}</Tag>
              )
            )}
          </>
        );
      },
    },
    {
      title: 'Ações',
      render: (_text, rec, _index) => {
        return (
          rec.status !== OrdersStatus.Cancelado && (
            <Row style={{ gap: '10px', flexWrap: 'nowrap' }}>
              <Button
                onClick={() => {
                  document
                    .querySelector('.box-modalOrders')
                    ?.setAttribute('style', 'display:flex');
                  setDataOrder(rec);
                }}
                type="primary"
                style={{ color: '#fff', background: corNavPrev }}
              >
                Atualizar pedido
              </Button>
              <Button
                type="text"
                onClick={() => setOpenModalDetailsOrders(true)}
              >
                <TbListDetails></TbListDetails>
              </Button>
              <ModalDetailsOrders data={orders[0]}></ModalDetailsOrders>
            </Row>
          )
        );
      },
    },
  ];
  const colunsOrdersFinished: ColumnsType<Orders> = [
    {
      title: 'cliente',
      key: 'client',
      render(_text, rec, _indexx) {
        return (
          <Typography.Text
            style={{ display: 'flex', width: 'max-content', maxWidth: '200px' }}
          >
            {rec?.client?.name}
          </Typography.Text>
        );
      },
    },
    {
      title: 'Pedido',
      width: '200px',
      render(_text, _rec, indexx) {
        return ordersFinished
          .filter((_item, index) => index === indexx)
          .map((item) =>
            item.map((i: { item: string; qtd: number }) => (
              <Row key={indexx} style={{ gap: '10px' }}>
                <Tag color="purple">
                  <Row
                    style={{ gap: '10px', flexWrap: 'nowrap', width: '100%' }}
                  >
                    <p>{i.qtd}x</p>

                    <p style={{ width: 'max-content' }}>{i.item}</p>
                  </Row>
                </Tag>
              </Row>
            ))
          );
      },
    },
    {
      title: 'Telefone',
      key: 'phone',
      render(_text, rec, _indexx) {
        return (
          <Typography.Text
            style={{ display: 'flex', width: 'max-content' }}
            copyable
          >
            {rec?.client?.phone}
          </Typography.Text>
        );
      },
    },
    {
      title: 'Valor pago / à pagar',
      dataIndex: 'amoutMoney',
      key: 'amoutMoney',
      render(item) {
        return (
          <Tag color="green">
            {parseFloat(item).toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </Tag>
        );
      },
    },
    {
      title: 'Modo de pagamento',
      dataIndex: 'payment_method',
      key: 'payment_method',
      render(item) {
        return <Tag color="green">{item}</Tag>;
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render(item) {
        return (
          <>
            {item === OrdersStatus.Preparando ? (
              <Tag color="green">{item}</Tag>
            ) : item === OrdersStatus.Entrega ? (
              <Tag color="blue">
                Pedido em rota de entrga <Spin size="small"></Spin>
              </Tag>
            ) : item === OrdersStatus.Cancelado ? (
              <Tag color="red">{item}</Tag>
            ) : (
              item === OrdersStatus.Finalizado && (
                <Tag color="purple">{item}</Tag>
              )
            )}
          </>
        );
      },
    },
    {
      title: 'Data',
      key: 'created_at',
      render(_item, rec, _index) {
        return dayjs(rec.created_at).format('DD/MM/YYYY');
      },
    },
    {
      title: 'Ações',
      render(_item, rec, _index) {
        return (
          <>
            <Row style={{ gap: '10px', flexWrap: 'nowrap' }}>
              {rec.status !== OrdersStatus.Finalizado && (
                <Button
                  onClick={() => {
                    setOrderid(rec.id);
                    setWarnigsOrderFinished(true);
                  }}
                >
                  {load ? <Spin></Spin> : 'Finalizar'}
                </Button>
              )}
              {rec.status === OrdersStatus.Entrega && (
                <OrderCancelComponent
                  status={rec.status}
                  orderId={rec.id}
                ></OrderCancelComponent>
              )}
            </Row>
          </>
        );
      },
    },
  ];

  let soma = 0;
  const ordersFinishedValue: string[] = dataOrders
    .filter(
      (item: any) =>
        item.status === OrdersStatus.Finalizado &&
        dayjs(item.created_at).format('DD/MM/YYYY') ===
          dayjs(new Date()).format('DD/MM/YYYY')
    )
    .map((item: any) => item?.amoutMoney);
  for (let i = 0; i < ordersFinishedValue.length; i++) {
    soma += parseFloat(ordersFinishedValue[i]);
  }
  const amountOrders = dataOrders.filter(
    (item: { status: string }) => item.status === OrdersStatus.Finalizado
  ).length;
  const amountvalue = soma;
  const date = dayjs(new Date()).format('DD/MM/YYYY');
  const companyId: string = asUser?.companyId;

  const dataTableOrdersFinished = dataOrders.filter(
    (item: { status: string }) =>
      item?.status === OrdersStatus.Entrega ||
      item?.status === OrdersStatus.Finalizado
  );

  return (
    <>
      <ModalWarnigsOrderFinished id={orderid}></ModalWarnigsOrderFinished>
      <ModalCloseOfficeHour
        data={{ amountOrders, amountvalue, date, companyId }}
      ></ModalCloseOfficeHour>
      <NavBarComponent btn1={true}></NavBarComponent>
      {load ? (
        <Spin
          size="large"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
          }}
        ></Spin>
      ) : (
        <div className="box-global-dash">
          <div className="content-dasboard-pages">
            <Title
              align="center"
              color="#fff"
              size="25px"
              text="Meus Pedidos"
            ></Title>

            <SumaryStatusOrdersComponent></SumaryStatusOrdersComponent>
            <div
              style={{
                display: 'grid',
                placeItems: 'center',
                gap: '20px',
              }}
            >
              <Row style={{ alignItems: 'center', gap: '20px' }}>
                <Col>
                  <Typography.Title level={2}>Pedidos</Typography.Title>
                </Col>
                <Col>
                  <Typography.Title level={4}>
                    {dayjs(new Date()).format('DD/MM/YYYY')}
                  </Typography.Title>
                </Col>
              </Row>
              <Table
                style={{ width: '90%' }}
                size="small"
                dataSource={dataOrders?.filter(
                  (status: any) =>
                    status?.status === OrdersStatus.Preparando ||
                    status?.status === OrdersStatus.Cancelado
                )}
                columns={coluns}
                loading={loadTables}
              ></Table>

              <Row style={{ alignItems: 'center', gap: '20px' }}>
                <Col>
                  <Typography.Title level={2}>
                    Pedidos finalizados / em rota de entrega
                  </Typography.Title>
                </Col>
                <Col>
                  <Typography.Title level={4}>
                    {dayjs(new Date()).format('DD/MM/YYYY')}
                  </Typography.Title>
                </Col>
              </Row>

              <Table
                style={{ width: '90%' }}
                size="small"
                tableLayout="auto"
                columns={colunsOrdersFinished}
                dataSource={dataTableOrdersFinished.filter(
                  (item: any) =>
                    dayjs(item?.created_at).format('DD/MM/YYYY') === date
                )}
                loading={loadTables}
              ></Table>

              <Row style={{ marginTop: '50px' }}>
                <Col style={{ display: 'grid', placeItems: 'center' }}>
                  <Col>
                    <Row>
                      <Typography.Title level={2}>
                        Realizar Fechamento de expediente
                      </Typography.Title>
                    </Row>
                    <Row>
                      <Typography.Text>
                        O fechamento de expediente só pode ser realizado 1x ao
                        dia.
                      </Typography.Text>
                    </Row>
                  </Col>
                  <Button
                    style={{ background: corNavPrev, marginTop: '20px' }}
                    type="primary"
                    onClick={() => setOpenModal(true)}
                  >
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
