import { Modal, Row, Spin, Typography } from 'antd';
import { useContext, useState } from 'react';
import { DashContext } from '../../../context/dashboard.context';
import { api } from '../../../services/api';
import { toast } from 'react-toastify';
import { AiFillWarning } from 'react-icons/ai';
import dayjs from 'dayjs';

export interface PropsCreateOrderFinished {
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
  console.log(
    '🚀 ~ file: modal-close-officeHour.component.tsx:21 ~ amountOrders, amountvalue, companyId, date:',
    amountOrders,
    amountvalue,
    companyId,
    date
  );
  const { setOpenModal, openModal, dataOrders } = useContext(DashContext);
  const [load, setLoad] = useState(false);

  async function handleCreateOrdersFinished() {
    if (dataOrders.some((item: any) => item.status === 'preparando')) {
      toast.error('Existe pedidos em preparação no momento!');
      return;
    }
    if (
      dataOrders.filter(
        (item: any) =>
          item.status === 'finalizado' &&
          dayjs(item.created_at).format('DD/MM/YYYY') ===
            dayjs(new Date()).format('DD/MM/YYYY')
      ).length < 1
    ) {
      toast.error('Não existem pedidos finalizados no momento!');
      return;
    }

    setLoad(true);
    await api
      .post(`/ordersFinished`, {
        amountOrders: amountOrders,
        amountvalue: amountvalue,
        date: date,
        companyId: companyId,
      })
      .then(async () => {
        toast.success('Expediente fechado com sucesso!');
        setLoad(false);
        await api.put(`/allordersbystatus`).then(() => {
          setLoad(false);
          setOpenModal(false);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
      })
      .catch(() => {
        toast.error('Fechamento de expediente ja realizado!');
        setLoad(false);
      });
  }

  return (
    <>
      <Modal
        closable={false}
        onCancel={() => setOpenModal(false)}
        cancelText="cancelar"
        okText={load ? <Spin></Spin> : 'Confirmar'}
        onOk={handleCreateOrdersFinished}
        open={openModal}
        centered
      >
        <Row>
          <Typography.Title
            level={2}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <AiFillWarning color="gold"></AiFillWarning>
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
