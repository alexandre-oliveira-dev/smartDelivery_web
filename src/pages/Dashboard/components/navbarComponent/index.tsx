import React, { useContext, useEffect } from "react";
import "./style.css";
import { MdLogout } from "react-icons/md";
import { api } from "../../../../services/api";
import { DashContext } from "../../../../context/dashboard.context";

type Activebtntype = {
  btn1?: boolean;
  btn2?: boolean;
  btn3?: boolean;
};

export default function NavBarComponent({ btn1, btn2, btn3 }: Activebtntype) {
  const { asUser } = useContext(DashContext);

  useEffect(() => {
    if (asUser === undefined || asUser === null) {
      window.location.href = "/";
    }
  }, [asUser]);

  async function handleSingout() {
    await api.delete(`/singout/${asUser?.id}`).then(() => {
      localStorage.removeItem("@sessionDelivery");
      window.location.href = "/";
    });
  }

  const navBarBtns = [
    {
      id: 1,
      title: "Dashboard",
      link: `/dashboard/${asUser?.name_company}/faturamento`,
      icon: "",
      active: btn2,
    },
    {
      id: 2,
      title: "Meus Pedidos",
      link: `/dashboard/${asUser?.name_company}`,
      icon: "",
      active: btn1,
    },
    {
      id: 3,
      title: "Configurações",
      link: `/dashboard/${asUser?.name_company}/config`,
      icon: "",
      active: btn3,
    },
  ];

  return (
    <nav className="navbardash">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          margin: "0 0 20px 0",
        }}
      >
        <div className="profile"></div>
        <p style={{ color: "#fff", fontSize: "17px" }}>Bem vindo {asUser?.name_company}</p>
      </div>
      <div className="boxbtnnavdash">
        {navBarBtns.map((item) => {
          return (
            <button
              type="button"
              onClick={() => (window.location.href = item.link)}
              style={item.active ? { color: "silver", fontWeight: "600" } : {}}
              key={item.id}
            >
              {item.icon} {item.title}
            </button>
          );
        })}
      </div>

      <button className="btn-sair" onClick={handleSingout}>
        <MdLogout></MdLogout> sair
      </button>
    </nav>
  );
}
