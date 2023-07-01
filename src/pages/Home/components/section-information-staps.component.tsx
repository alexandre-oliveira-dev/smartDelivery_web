import React,{useContext} from "react";
import "../style.css";
import { Tag } from "antd";
import { DashContext, DashProvider } from "../../../context/dashboard.context";

export default function SectionInformationStaps() {
  const {setOpenModal} = useContext(DashContext)

  return (
    <DashProvider>
      <section className="section3">
      <div>
        <div className="stap-information">
          <div><span id="span">1</span></div>
          <h2>
            Crie uma conta para seu restaurante, <a href="/cadastro">criar conta</a>
          </h2>
        </div>
        <div className="stap-information">
        <div><span id="span">2</span></div>
          <h2>
            Faça login na sua conta criada e assine o nosso plano para ter acesso as ferramentas,
            <button
              style={{
                background: "none",
                textDecoration: "underline",
                fontSize: "20px",
              }}
              type="button"
              onClick={() => {
                setOpenModal(true)
              }}
            >
              entrar
            </button>
          </h2>
        </div>
        <div className="stap-information">
        <div><span id="span">3</span></div>
          <h2>
            Personalize seu espaço online e obtenha seu link de compartilhamento do seu delivery,
            para divulgar e mandar para seus clientes, ex:{' '}  
          <Tag color="blue">https://smartdelivery.com/nomedoseurestaurante</Tag>
          </h2>
        </div>
      </div>
        <a href="/cadastro" id="btn-comecaragr">
          Começar agora!
        </a>
    </section>
    </DashProvider>
  );
}
