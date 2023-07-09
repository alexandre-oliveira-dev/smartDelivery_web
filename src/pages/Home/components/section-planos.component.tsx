import { Button, Card, Divider, Row, Tag, Typography } from "antd";
import React from "react";

const section: React.CSSProperties = {
  width: "100%",
  padding: "20px",
  display: "flex",
  flexDirection:'column',
  justifyContent: "center",
  alignItems: "center",
  background: "#D7DDE7",
};

export default function SectionPlains() {
  return (
    <section style={section}>
      <Row>
        <Typography.Title
          style={{ color: '#5B72F2', fontWeight: '600' }}
          level={2}
        >
          Plano
        </Typography.Title>
      </Row>
      <Card style={{ width: '350px' }}>
        <Row
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Tag style={{ fontSize: '30px', padding: '10px' }} color="green">
            R$25,00 /mês
          </Tag>
          <Divider></Divider>
          <Typography.Title level={4}>Você terá:</Typography.Title>

          <ul style={{ fontSize: '17px' }}>
            <li>Acesso à todas as ferramentas do dashboard.</li>
            <li>Controle de finanças.</li>
            <li>Edição de cardápio online.</li>
            <li>Personalização de espaço online.</li>
            <li>Integração com o whatsapp do estabelecimento.</li>
          </ul>
          <Divider></Divider>
          <Typography.Text>
            Cancele sem compromisso quando quiser!
          </Typography.Text>
          <br />
          <Button
            style={{ background: '#5B72F2', color: '#fff', marginTop: '10px' }}
            type="link"
            href="/cadastro"
          >
            Começar agora!
          </Button>
        </Row>
      </Card>
    </section>
  );
}
