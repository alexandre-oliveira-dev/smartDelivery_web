import React, { useContext } from "react";
import { DashContext } from "../../../context/dashboard.context";

interface Params {
  color?: string | number;
  file?: string | ArrayBuffer | null;
}

export default function IframePageCompany({ color, file }: Params) {
  const { asUser } = useContext(DashContext);
  return (
    <>
      <header
        style={{
          background: color,
          width: "100%",
          height: "60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            style={{ width: "30px", height: "30px", borderRadius: "50%" }}
            src={String(file) ? String(file) : "https://via.placeholder.com/150"}
            alt=""
          ></img>

          <h4 style={{ color: "#fff" }}>{asUser.name_company}</h4>
        </div>
        <div
          style={{
            color: "#fff",
            display: "flex",
            gap: "20px",
            fontSize: "13px",
          }}
        >
          <p>Meus pedidos</p>
          <p>Ajuda</p>
        </div>
      </header>
      <div
        style={{
          width: "100%",
          height: "100px",
          background: "#fff",
        }}
      ></div>
    </>
  );
}
