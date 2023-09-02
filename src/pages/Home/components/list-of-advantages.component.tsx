import '../style.css';
import { Button, Col, Row, Typography } from 'antd';
import { FiInfo } from 'react-icons/fi';

export default function ListOfadvantages() {
  return (
    <div className="content-box-section1">
      {window.screen.width < 500 && (
        <Typography.Title
          level={3}
          style={{
            color: '#fff',
            border: '1px solid white',
            padding: '10px',
            borderRadius: '10px',
            backgroundColor: '#ffffff63',
            backdropFilter: 'blur(10px)',
          }}
        >
          <FiInfo color="#fff"></FiInfo> Para acessar o dashboard use um pc ou
          notbook!
        </Typography.Title>
      )}
      <Col>
        <Row className="responsiveboxtitlesection1">
          {' '}
          <Typography.Title
            className="responsivetitlesection1"
            style={{
              fontWeight: '800',
              fontSize: '70px',
              color: '#fff',
              fontFamily: 'Montserrat,sans-serif',
            }}
            level={1}
          >
            Tenha um Delivery Próprio
          </Typography.Title>
        </Row>
        <Row className="responsiveboxtitlesection1">
          <Typography.Title
            className="responsivedescriptiontextsection1"
            style={{ color: '#fff' }}
            level={2}
          >
            Venda para seus clientes em uma plataforma personalizada para o seu
            estabelecimento
          </Typography.Title>
        </Row>
        <Row>
          <Typography.Title
            className="responsivedescriptiontextsection1"
            style={{ color: '#fff' }}
            level={2}
          >
            Sem taxas sobre suas vendas, aumente seu faturamento!
          </Typography.Title>
        </Row>
        <Row className="responsiveBoxbtn">
          <Button
            type="link"
            href="/cadastro"
            id="btnhover"
            style={{
              width: '300px',
              height: '40px',
              borderRadius: '10px',
              background: 'transparent',
              border: '1px solid #fff',
              color: '#fff',
              fontSize: '20px',
              transition: '0.3s ease',
            }}
          >
            Começar Agora!
          </Button>
        </Row>
      </Col>
    </div>
  );
}
