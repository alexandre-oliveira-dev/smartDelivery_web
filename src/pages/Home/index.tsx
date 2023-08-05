import React from "react";
import "./style.css";
import Header from "../../components/Header";
import ListOfadvantages from "./components/list-of-advantages.component";
import Footer from "../../components/Footer";
import SectionPlains from "./components/section-planos.component";
import SectionInformationStaps from "./components/section-information-staps.component";
import SectionAsksQuestions from "./components/section-asks.component";
import { DashProvider } from "../../context/dashboard.context";
import SectionIlustration from "./components/section-ilustration.component";

export default function Home() {

  return (
    <>
      <DashProvider>
        <Header></Header>
      </DashProvider>

      <div className="container-home">
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <section className="section1"></section>
          <ListOfadvantages></ListOfadvantages>
        </div>
        <SectionIlustration></SectionIlustration>
        <SectionInformationStaps></SectionInformationStaps>
        <SectionPlains></SectionPlains>
        <SectionAsksQuestions></SectionAsksQuestions>
        <Footer></Footer>
      </div>
    </>
  );
}
