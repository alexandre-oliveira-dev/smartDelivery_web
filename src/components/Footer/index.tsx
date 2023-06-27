import React from "react";
import './style.css'
import { Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <footer className="footer">
            <Row className="container-footer-content">
                <Col key={1} >
                 <Row> <Link to={'/'} style={{color:"#fff",fontSize:"18px"}}>Início</Link></Row>
                 <Row> <Link to={'/sobrenos'} style={{color:"#fff",fontSize:"18px"}}>Quem somos</Link></Row>
                 <Row> <Link to={''} style={{color:"#fff",fontSize:"18px"}}>Duvidas</Link></Row>
                </Col>
                <Col key={2} >
                 <Row> <Link to={'/cadastro'} style={{color:"#fff",fontSize:"18px"}}>Cadastre-se</Link></Row>
                 <Row> <Link to={''} style={{color:"#fff",fontSize:"18px"}}>Nossos Planos</Link></Row>
                </Col>
            </Row>
            <Row>
                <Typography.Paragraph style={{color:"#fff"}}>©️ {new Date().getFullYear()} - SmartDelivery - Soluções para Restaurantes e Lanchonetes.</Typography.Paragraph>
            </Row>
        </footer>
    )
}