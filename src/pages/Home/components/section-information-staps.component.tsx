import React, { useContext } from "react";
import "../style.css";
import { Tag, Typography } from 'antd';
import { DashContext } from '../../../context/dashboard.context';
import { Link } from 'react-router-dom';

export default function SectionInformationStaps() {
  const { setOpenModal } = useContext(DashContext);

  return (
    <section className="section3">
      <div className="box-stap-information">
        <div className="stap-information">
          <div>
            <span id="span">1</span>
          </div>
          <h2>
            Crie uma conta para seu restaurante,{' '}
            <Link style={{ color: '#5B72F2' }} to={'/cadastro'}>
              <Typography.Text style={{ color: '#5B72F2' }}>
                criar conta
              </Typography.Text>
            </Link>
          </h2>
        </div>
        <div className="stap-information">
          <div>
            <span id="span">2</span>
          </div>
          <h2>
            Faça login na sua conta criada e assine o nosso plano para ter
            acesso as ferramentas.
          </h2>
        </div>
        <div className="stap-information">
          <div>
            <span id="span">3</span>
          </div>
          <h2>
            Personalize seu espaço online e obtenha seu link de compartilhamento
            do seu delivery, para divulgar e mandar para seus clientes, ex:{' '}
            <Tag style={{ fontSize: '15px' }} color="blue">
              https://smartdelivery.com/nomedoseurestaurante
            </Tag>
          </h2>
        </div>
      </div>
      <a href="/cadastro" id="btn-comecaragr">
        Começar agora!
      </a>
    </section>
  );
}
