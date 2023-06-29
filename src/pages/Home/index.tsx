import React from "react";
import "./style.css";
import Header from "../../components/Header";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import ListOfadvantages from "./components/list-of-advantages.component";
import Footer from "../../components/Footer";
import SectionPlains from "./components/section-planos.component";
import SectionInformationStaps from "./components/section-information-staps.component";
import SectionAsksQuestions from "./components/section-asks.component";

const im2 = require("../../assets/ilu3.png");

export default function Home() {

  return (
    <>
      <Header></Header>
      <div className="container-home">
       <div  style={{position:"relative"}}>
       <section className="section1">
        </section>
         <ListOfadvantages></ListOfadvantages>
       </div>

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
       <SectionInformationStaps></SectionInformationStaps>
        <SectionPlains></SectionPlains>
        <SectionAsksQuestions></SectionAsksQuestions>
        <Footer></Footer>
      </div>
    </>
  );
}
