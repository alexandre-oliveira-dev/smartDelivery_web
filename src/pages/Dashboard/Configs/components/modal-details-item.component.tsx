import { Col, Divider, Modal, Row, Tag } from 'antd';
import { useContext } from 'react';
import { DashContext } from '../../../../context/dashboard.context';
import Typography from 'antd/es/typography';

export type ItemTypes = {
  data: {
    title: string;
    description: string;
    amount: string;
    price: string;
    weight: string;
    categoria: string;
  };
};

export default function ModalDetailsItem({ data }: ItemTypes) {
  const { openModal, setOpenModal } = useContext(DashContext);

  return (
    <>
      <Modal
        open={openModal}
        closable={false}
        onCancel={() => setOpenModal(false)}
        title={
          <>
            <Typography.Title level={3}>Detalhes do item</Typography.Title>
            <Divider></Divider>
          </>
        }
        okButtonProps={{ style: { display: 'none' } }}
        cancelText="Voltar"
        centered
      >
        <Col style={{ flexDirection: 'column', gap: '10px', display: 'flex' }}>
          <Row gutter={10}>
            <Col style={{ fontWeight: '600' }}>Titulo:</Col>
            <Col>{data.title}</Col>
          </Row>

          <Row gutter={10}>
            <Col style={{ fontWeight: '600' }}>Categoria:</Col>
            <Col>
              <Tag color="blue">{data.categoria}</Tag>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col style={{ fontWeight: '600' }}>Serve:</Col>
            <Col>{data.amount} pessoas</Col>
          </Row>
          <Row gutter={10}>
            <Col style={{ fontWeight: '600' }}>Quantidade / peso:</Col>
            <Col>{data.weight}</Col>
          </Row>
          <Row gutter={10}>
            <Col style={{ fontWeight: '600' }}>Descrição:</Col>
            <Col>{data.description}</Col>
          </Row>
          <Row gutter={10}>
            <Col style={{ fontWeight: '600' }}>Preço:</Col>
            <Col>
              <Tag color="green">
                {parseFloat(data.price)?.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </Tag>
            </Col>
          </Row>
        </Col>
      </Modal>
    </>
  );
}
