import React from "react";
import Header from "../../components/Header";
import { Button, Col, Row, Typography } from "antd";
import { BsMailbox, BsPhone } from "react-icons/bs";
import { DashProvider } from '../../context/dashboard.context';
const ilustration = require('../../assets/sobrenos.jpg');

const containermain: React.CSSProperties = {
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
const ilustyle: React.CSSProperties = {
  width: '90%',
  height: '90%',
  objectFit: 'cover',
};
const box: React.CSSProperties = {
  width: '50%',
};

export default function AboutUs() {
  return (
    <>
      <DashProvider>
        <Header></Header>
      </DashProvider>
      <div style={containermain}>
        <main
          style={{
            width: '100%',
            display: 'flex',
            padding: '30px',
            height: 'calc(100vh - 70px)',
            marginTop: '90px',
          }}
        >
          <div style={box}>
            <picture>
              <img style={ilustyle} src={ilustration} alt=""></img>
            </picture>
          </div>
          <div style={box}>
            <Col>
              <Row>
                <Typography.Title style={{ color: '#121212' }} level={1}>
                  Bem-vindo ao SmartDelivery!
                </Typography.Title>
              </Row>
              <br />
              <Row>
                <Typography.Text
                  style={{
                    color: '#121212',
                    fontSize: '17px',
                    border: '1px solid silver',
                    padding: '15px',
                    borderRadius: '10px',
                  }}
                >
                  Nós somos apaixonados por comida e pela conveniência de
                  oferecer uma maneira fácil e rápida de desfrutar de refeições
                  deliciosas no conforto da casa dos seus clientes. Nosso
                  objetivo é proporcionar uma experiência excepcional de
                  delivery, conectando seu restaurante aos seus clientes da sua
                  região.
                </Typography.Text>
              </Row>
              <br />
              <Row>
                <Typography.Title style={{ color: '#121212' }} level={3}>
                  Nosso sistema:
                </Typography.Title>
              </Row>
              <br />
              <Row>
                <Typography.Text
                  style={{
                    color: '#121212',
                    fontSize: '17px',
                    border: '1px solid silver',
                    padding: '15px',
                    borderRadius: '10px',
                  }}
                >
                  Nossa plataforma intuitiva e fácil de usar foi projetada para
                  tornar o processo de pedido e entrega o mais simples possível.
                  Basta o seu cliente navegar pelo menu personalizado com seu
                  restaurante, explorar os pratos que despertam o seu apetite e
                  selecionar suas escolhas. Com apenas alguns cliques, você
                  agiliza seu atendimento e fideliza seu cliente!.
                </Typography.Text>
              </Row>
              <br />
              <Row style={{ gap: '10px', alignItems: 'center' }}>
                <BsMailbox color="#121212" size={30}></BsMailbox>
                <Typography.Title style={{ color: '#121212' }} level={4}>
                  smartDelivery@gmail.com
                </Typography.Title>
              </Row>
              <Row style={{ gap: '10px', alignItems: 'center' }}>
                <BsPhone color="#121212" size={30}></BsPhone>
                <Typography.Title style={{ color: '#121212' }} level={4}>
                  11 99407-6414
                </Typography.Title>
              </Row>
              <br />

              <Row>
                <Button type="default" href="/cadastro">
                  Comece agora!
                </Button>
              </Row>
            </Col>
          </div>
        </main>
      </div>
    </>
  );
}
