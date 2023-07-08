import { Modal, Row, Spin, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import { api } from '../../../services/api';
import { DashContext } from '../../../context/dashboard.context';

interface OrderProps {
  id: string;
}

export default function ModalWarnigsOrderFinished({ id }: OrderProps) {
  const { openModalWarnigsOrderFinished, setWarnigsOrderFinished } =
    useContext(DashContext);
  const [load, setLoad] = useState(false);
  return (
    <>
      <Modal
        closable={false}
        okText={load ? <Spin></Spin> : 'Confirmar'}
        open={openModalWarnigsOrderFinished}
        centered
        onCancel={() => setWarnigsOrderFinished(false)}
        onOk={async () => {
          setLoad(true);
          await api
            .put(`/orders/${id}`, {
              status: 'finalizado',
            })
            .then(() => {
              setLoad(false);
              setWarnigsOrderFinished(false);
              window.location.reload();
            });
        }}
      >
        <Row>
          <Typography.Title level={2}>Atenção</Typography.Title>
        </Row>
        <Row>
          <Typography.Text>
            Certifique-se que esse pedido foi entregue!
          </Typography.Text>
        </Row>
      </Modal>
    </>
  );
}
