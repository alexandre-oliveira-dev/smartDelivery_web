import { Button, Modal, Row, Typography } from 'antd';
import { useState } from 'react';
import { MdWarning } from 'react-icons/md';
import { api } from '../../../services/api';
import { OrdersStatus } from '../../../types';

interface OrdersParamsTytpe {
  orderId: string;
  status: string;
}
export default function OrderCancelComponent({
  orderId,
  status,
}: OrdersParamsTytpe) {
  const [open, setOpen] = useState(false);

  async function handleCancelOrder() {
    await api
      .put(`/orders/${orderId}`, {
        status: OrdersStatus.Cancelado,
      })
      .then(() => {
        window.location.reload();
      });
  }
  return (
    <>
      {status !== OrdersStatus.Cancelado && (
        <Button
          style={{ background: 'red', color: '#fff' }}
          onClick={() => setOpen(true)}
        >
          Cancelar pedido
        </Button>
      )}
      <Modal
        open={open}
        closable={false}
        centered
        okText="Sim"
        cancelText="não"
        onCancel={() => setOpen(false)}
        onOk={handleCancelOrder}
        title={
          <>
            <Row style={{ gap: '10px' }}>
              <MdWarning size={30} color="red"></MdWarning>{' '}
              <Typography.Title level={4}>
                Deseja realmente cancelar esse pedido?
              </Typography.Title>
            </Row>
          </>
        }
      ></Modal>
    </>
  );
}
