import { Card, Col, Divider, Row, Tag, Typography } from 'antd';


export default function SumaryStatusOrdersComponent() {
  return (
    <>
      <div
        style={{
          width: '90%',
        }}
      >
        <Card
          style={{
            width: '100%',
            margin: '2rem 0 2rem 0',
          }}
          title={
            <Typography.Title level={4}>Sumário de Status</Typography.Title>
          }
        >
          <Row>
            <Col
              style={{
                display: 'grid',
                gap: '10px',
              }}
            >
              <Row id="prep">
                <Tag
                  style={{
                    width: '100px',
                    fontSize: '15px',
                    textAlign: 'center',
                  }}
                  color="green"
                >
                  preparando
                </Tag>
              </Row>
              <Row id="entr">
                <Tag
                  style={{
                    width: '100px',
                    fontSize: '15px',
                    textAlign: 'center',
                  }}
                  color="blue"
                >
                  entrega
                </Tag>
              </Row>
              <Row id="canc">
                <Tag
                  style={{
                    width: '100px',
                    fontSize: '15px',
                    textAlign: 'center',
                  }}
                  color="red"
                >
                  cancelado
                </Tag>
              </Row>
              <Row id="fina">
                <Tag
                  style={{
                    width: '100px',
                    fontSize: '15px',
                    textAlign: 'center',
                  }}
                  color="purple"
                >
                  finalizado
                </Tag>
              </Row>
            </Col>
            <Col>
              <Divider type="vertical" style={{ height: '100%' }}></Divider>
            </Col>
            <Col
              style={{
                display: 'grid',
                gap: '10px',
              }}
            >
              <Row>
                <label htmlFor="prep">
                  - Indica que o pedido está em preparação.
                </label>
              </Row>
              <Row>
                <label htmlFor="entr">
                  - Indica que o pedido está em rota de entrega.
                </label>
              </Row>
              <Row>
                <label htmlFor="canc">
                  - Indica que o pedido está cancelado pelo cliente ou
                  estabelecimento.
                </label>
              </Row>
              <Row>
                <label htmlFor="fina">
                  {' '}
                  - Indica que o pedido foi entregue.
                </label>
              </Row>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}
