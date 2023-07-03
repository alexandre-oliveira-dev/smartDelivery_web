import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { MdLogout } from "react-icons/md";
import { api } from "../../../../services/api";
import { DashContext } from "../../../../context/dashboard.context";
import { Link } from "react-router-dom";
import { Spin } from "antd";

import { MdDashboard } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";
import { GoGear } from "react-icons/go";
type Activebtntype = {
  btn1?: boolean;
  btn2?: boolean;
  btn3?: boolean;
};

export default function NavBarComponent({ btn1, btn2, btn3 }: Activebtntype) {
  const { asUser, corNavPrev, fileProfile } = useContext(DashContext);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (asUser === undefined || asUser === null) {
      window.location.href = "/";
    }
    const nav = document.getElementById("navbardash");
    nav?.style.setProperty("--backNavBarColor", corNavPrev ?? "#5b72f2");
  }, [asUser, corNavPrev]);

  async function handleSingout() {
    setLoad(true);
    await api
      .delete(`/singout/${asUser?.id}`)
      .then(() => {
        localStorage.removeItem("@sessionDelivery");
        window.location.href = "/";
        setLoad(false);
      })
      .catch(() => setLoad(false));
  }

  const navBarBtns = [
    {
      id: 1,
      title: "Dashboard",
      link: `/dashboard/${asUser?.name_company}/faturamento`,
      icon: <MdDashboard color={corNavPrev}></MdDashboard>,
      active: btn2,
    },
    {
      id: 2,
      title: "Meus Pedidos",
      link: `/dashboard/${asUser?.name_company}`,
      icon: <FaListAlt color={corNavPrev}></FaListAlt>,
      active: btn1,
    },
    {
      id: 3,
      title: "Configurações",
      link: `/dashboard/${asUser?.name_company}/config`,
      icon: <GoGear color={corNavPrev}></GoGear>,
      active: btn3,
    },
  ];

  return (
    <nav id="navbardash" className="navbardash">
      <div className="box-profile-nav">
        <div className="box-style-filter-profile">
          <img
            className="profile"
            src={fileProfile ? fileProfile : "https://via.placeholder.com/150"}
            alt=""
          ></img>
          <p style={{ color: "#fff", fontSize: "17px" }}>Bem vindo {asUser?.name_company}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          alignItems: "center",
          margin: "0 0 20px 0",
        }}
      ></div>
      <div className="boxbtnnavdash">
        {navBarBtns.map((item) => {
          return (
            <Link
              to={item.link}
              style={
                item.active
                  ? {
                      color: !corNavPrev ? "#5b72f2" : corNavPrev,
                      fontWeight: "600",
                      background: "#fff",
                      height: "40px",
                      width: "90%",
                      borderRadius: "5px",
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      gap: "10px",
                    }
                  : {
                      textDecoration: "none",
                      color: "#fff",
                      fontSize: "20px",
                      transition: "all 1s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width:"max-content"
                    }
              }
              key={item.id}
            >
              {item.icon} {item.title}
            </Link>
          );
        })}
      </div>

      <button className="btn-sair" onClick={handleSingout}>
        {!load ? (
          <>
            <MdLogout></MdLogout> <span>Sair</span>
          </>
        ) : (
          <Spin></Spin>
        )}
      </button>
    </nav>
  );
}
