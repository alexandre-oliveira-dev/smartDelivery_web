import React from "react";
import "./style.css";
import Header from "../../components/Header";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import ListOfadvantages from "./components/list-of-advantages.component";
import { Button } from "antd";
import Footer from "../../components/Footer";

const img = require("../../assets/ilustration-removebg-preview.png");
const im2 = require("../../assets/ilu3.png");



export default function Home() {
  const params = new  URLSearchParams()

  return (
    <>
      <Header></Header>
      <div className="container-home">
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
              <h1 style={{ color: "#5B72F2", fontSize: "60px", fontWeight: "800" }}>Delivery</h1>
              <h1 style={{ color: "#121212", fontSize: "60px", fontWeight: "600" }}>Rápido &</h1>
              <h1 style={{ color: "#5B72F2", fontSize: "60px", fontWeight: "400" }}>Fácil</h1>
              <p
                style={{ color: "#5B72F2", fontSize: "20px", fontWeight: "400", textAlign: "end" }}
              >
                Tenha uma aplicação web para o seu restaurante e facilite suas comandas e aumente
                seu faturamento!
              </p>
            </div>
          </div>
          <div className="content-box-section1">
            <img className="ilustracao" src={img} alt=""></img>
          </div>
          <ListOfadvantages></ListOfadvantages>
        </section>
        
        <section className="section2">
          <div className="ilu2">
            <img src={im2} alt=""></img>
          </div>
          <div className="box-text-info">
            <h2>
              <strong>Simplifique</strong> seus pedidos de delivery com <strong>rapidez</strong> e{" "}
              <strong>facilidade</strong> em nosso site, tornando cada refeição uma experiência ágil
              e <strong>deliciosa</strong>.
            </h2>
            <h3>Tá, mas como funciona? 🧐</h3>
            <MdKeyboardDoubleArrowDown
              color="#5B72F2"
              size={80}
              className="animation"
            ></MdKeyboardDoubleArrowDown>
          </div>
        </section>
        <section className="section3">
          <div>
            <div className="stap-information">
              <span>1</span>
              <h2>
                Crie uma conta para seu restaurante, <a href="/cadastro">criar conta</a>
              </h2>
            </div>
            <div className="stap-information">
              <span>2</span>
              <h2>
                Faça login na sua conta criada e assine o nosso plano para ter acesso as
                ferramentas, 
                <button
                style={{
                  background:'none',
                  textDecoration:"underline",
                  fontSize:"20px",
                
                }}
                 type="button" onClick={()=> {
                  params.set('modal','true')
                  window.location.search = params.toString();
                }}>entrar</button>
              </h2>
            </div>
            <div className="stap-information">
              <span>3</span>
              <h2>Pronto! 😎, agora so personalizar seu delivery online do seu jeito!</h2>
            </div>
          <a href="/cadastro" id="btn-comecaragr">
            Começar agora!
          </a>
          </div>
        </section>
        <Footer></Footer>
      </div>
    </>
  );
}
