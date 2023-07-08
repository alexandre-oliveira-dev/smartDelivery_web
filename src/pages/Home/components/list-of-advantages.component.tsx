import React from "react";
import "../style.css";
import { BsWhatsapp } from "react-icons/bs";
import { MdAttachMoney, MdDeliveryDining } from "react-icons/md";
import { BiFoodMenu } from "react-icons/bi";
import { Button } from "antd";

export default function ListOfadvantages() {
  return (
    <div className="content-box-section1">
      <div className="item-section1">
        <div
          style={{
            background: "#5B72F2",
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
            background: "#5B72F2",
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
            background: "#5B72F2",
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
            background: "#5B72F2",
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
      <Button
        type="primary"
        onClick={() => (window.location.href = "/cadastro")}
        style={{ width: "200px", height: "40px",fontSize:"18px" }}
      >
        Começar Agora!
      </Button>
    </div>
  );
}
