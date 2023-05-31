import React from "react";
import "./style.css";
import Header from "../../components/Header";
import { BiFoodMenu } from "react-icons/bi";
import { MdAttachMoney, MdDeliveryDining,MdKeyboardDoubleArrowDown } from "react-icons/md";
import { BsWhatsapp } from "react-icons/bs";

const img = require("../../assets/ilustration-removebg-preview.png");
const im2 = require("../../assets/ilu3.png");

export default function Home() {
  return (
    <div className="container-home">
      <Header></Header>
      <section className="section1">
        <div className="content-box-section1">
          <div
            style={{
              width: "70%",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
            }}
          >
            <h1 style={{ color: "#612f74", fontSize: "60px", fontWeight: "800" }}>Rápido</h1>
            <h1 style={{ color: "#121212", fontSize: "60px", fontWeight: "600" }}>Objetivo &</h1>
            <h1 style={{ color: "#612f74", fontSize: "60px", fontWeight: "400" }}>Fácil</h1>
            <p style={{ color: "#612f74", fontSize: "20px", fontWeight: "400", textAlign: "end" }}>
              Tenha uma aplicação web para o seu restaurante e facilite suas comandas e aumente seu
              faturamento!
            </p>
          </div>
        </div>
        <div className="content-box-section1">
          <div className="bg-ilustracao">
            <img className="ilustracao" src={img} alt=""></img>
          </div>
        </div>
        <div className="content-box-section1" style={{ flexDirection: "column", gap: "20px" }}>
          <div className="item-section1">
            <div
              style={{
                background: "#612f74",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BiFoodMenu color="#fff" size={20}></BiFoodMenu>
            </div>
            <h3>Facilite os Pedidos do seu Delivery</h3>
          </div>
          <div className="item-section1">
            <div
              style={{
                background: "#612f74",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MdAttachMoney color="#fff" size={20}></MdAttachMoney>
            </div>
            <h3>Aumente seu faturamento com uma aplicação própria!</h3>
          </div>
          <div className="item-section1">
            <div
              style={{
                background: "#612f74",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MdDeliveryDining color="#fff" size={20}></MdDeliveryDining>
            </div>
            <h3>Agilize seu atendimento para fidelizar seus clientes!</h3>
          </div>
          <div className="item-section1">
            <div
              style={{
                background: "#612f74",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BsWhatsapp color="#fff" size={20}></BsWhatsapp>
            </div>
            <h3>Integre o seu whatsapp com o sistema!</h3>
          </div>
        </div>
      </section>
      <section className="section2">
        <div className="ilu2">
          <img src={im2} alt=""></img>
        </div>
        <div className="box-text-info">
          <h2>
            <strong>Simplifique</strong> seus pedidos de comida com <strong>rapidez</strong> e <strong>facilidade</strong> em nosso site, tornando cada
            refeição uma experiência ágil e <strong>deliciosa</strong>.
          </h2>
          <h3>Tá, mas como funciona? 🧐</h3>
            <MdKeyboardDoubleArrowDown color="#612f74" size={80} className="animation"></MdKeyboardDoubleArrowDown>
        </div>
      </section>
      <section className="section3">
        <div>
        <div className="stap-information">
          <span>1</span>
          <h2>Crie uma conta para seu restaurante, <a href="#">criar conta</a></h2>
        </div>
        <div className="stap-information">
          <span>2</span>
          <h2>Faça login na sua conta criada e assine o nosso plano para ter acesso as ferramentas, <a href="#">entrar</a></h2>
        </div>
        <div className="stap-information">
          <span>3</span>
          <h2>Pronto! 😎, agora so personalizar seu delivery online do seu jeito!</h2>
        </div>
        </div>
        <a href="#" id="btn-comecaragr">Começar agora!</a>
      </section>
    </div>
  );
}
