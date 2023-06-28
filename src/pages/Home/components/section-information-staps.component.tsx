import React from "react";
import "../style.css";
import { Tag } from "antd";

export default function SectionInformationStaps() {
  const params = new URLSearchParams();

  return (
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
                params.set("modal", "true");
                window.location.search = params.toString();
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
            para divulgar e mandar para seus clientes, ex:  
          <Tag color="blue">https://smartdelivery.com/nomedoseurestaurante</Tag>
          </h2>
        </div>
        <a href="/cadastro" id="btn-comecaragr">
          Começar agora!
        </a>
      </div>
    </section>
  );
}
