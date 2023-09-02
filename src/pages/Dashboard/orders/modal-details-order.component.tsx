import { Col, Modal, Row, Tag, Typography } from 'antd';
import { useContext } from 'react';
import { DashContext } from '../../../context/dashboard.context';

interface Props {
  data: any[];
}

export default function ModalDetailsOrders({ data }: Props) {
  const { setOpenModalDetailsOrders, openModalDetailsOrders } =
    useContext(DashContext);
  return (
    <>
      <Modal
        closable={false}
        open={openModalDetailsOrders}
        onCancel={() => setOpenModalDetailsOrders(false)}
        cancelText="voltar"
        okButtonProps={{ style: { display: 'none' } }}
        centered
        title={
          <Typography.Title level={3}>Detalhes do pedido</Typography.Title>
        }
      >
        <Row>
          <Typography.Title level={4}>Itens do pedido</Typography.Title>
        </Row>
        <Col style={{ height: '100px', overflowY: 'auto' }}>
          {data.map((x: { item: string; qtd: number }) => {
            return (
              <>
                <Col>
                  <Tag style={{ marginTop: '10px' }} color="purple">
                    {x.qtd}x {x.item}
                  </Tag>
                </Col>
              </>
            );
          })}
        </Col>
      </Modal>
    </>
  );
}
