import React from "react";
import "../style.css";
import { BsWhatsapp } from "react-icons/bs";
import { MdAttachMoney, MdDeliveryDining } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { Button, Col, Row, Typography } from 'antd';
import { hover } from '@testing-library/user-event/dist/hover';

export default function ListOfadvantages() {
  return (
    <div className="content-box-section1">
      <Col>
        <Row>
          {' '}
          <Typography.Title
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
        <Row>
          <Typography.Title style={{ color: '#fff' }} level={2}>
            Venda para seus clientes em uma plataforma personalizada para o seu
            estabelecimento
          </Typography.Title>
        </Row>
        <Row>
          <Typography.Title style={{ color: '#fff' }} level={2}>
            Sem taxas sobre suas vendas, aumente seu faturamento!
          </Typography.Title>
        </Row>
        <Row>
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
