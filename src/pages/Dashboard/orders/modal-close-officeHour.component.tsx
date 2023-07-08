import { Modal, Row, Typography } from "antd";
import React, { useContext } from "react";
import { DashContext } from "../../../context/dashboard.context";
import { api } from "../../../services/api";
import { toast } from "react-toastify";
import { AiFillWarning } from 'react-icons/ai';

interface PropsCreateOrderFinished {
  data: {
    amountOrders: number;
    amountvalue: number;
    date: string;
    companyId: string;
  };
}

export default function ModalCloseOfficeHour({
  data: { amountOrders, amountvalue, companyId, date },
}: PropsCreateOrderFinished) {
  const { setOpenModal, openModal, dataOrders } = useContext(DashContext);

  async function handleCreateOrdersFinished() {
    if (
      dataOrders.filter((item: any) => item.status !== 'finalizado').length < 1
    ) {
      toast.error('Não existe pedidos em preparação ou em entrega no momento!');
      return;
    }
    await api
      .post(`/ordersFinished`, {
        amountOrders: amountOrders,
        amountvalue: amountvalue,
        date: date,
        companyId: companyId,
      })
      .then(() => {
        toast.success('Expediente fechado com sucesso!');
      });
  }

  return (
    <>
      <Modal
        closable={false}
        onCancel={() => setOpenModal(false)}
        cancelText="cancelar"
        okText="Confirmar"
        onOk={handleCreateOrdersFinished}
        open={openModal}
        centered
      >
        <Row>
          <Typography.Title
            level={2}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <AiFillWarning color="red"></AiFillWarning>
            Atenção!
          </Typography.Title>
        </Row>
        <Row>
          <Typography.Text>
            Ao clicar em confirmar, será gerado os dados do dia de hoje.
          </Typography.Text>
        </Row>
        <Row>
          <Typography.Text>
            Certiifique-se de que não tem mais nenhum pedido em preparação, se
            não o mesmo não será contabilizado.
          </Typography.Text>
        </Row>
      </Modal>
    </>
  );
}
