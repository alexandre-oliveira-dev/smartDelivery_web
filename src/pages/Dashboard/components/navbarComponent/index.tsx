import React, { useEffect, useState, useContext } from "react";
import "./style.css";
import { MdLogout } from "react-icons/md";
import { api } from "../../../../services/api";
import { IsLoginContext, LoginContext } from "../../../../context/Login.context";

type Activebtntype = {
  btn1?: boolean;
  btn2?: boolean;
  btn3?: boolean;
};

type UserCredencials = {
  email: string | undefined;
  name_company: string | undefined;
  id: string | undefined;
};

export default function NavBarComponent({ btn1, btn2, btn3 }: Activebtntype) {
  const [datUser, setDataUser] = useState<UserCredencials>();

  const {asUser} = useContext(IsLoginContext);

  console.log(asUser)

  useEffect(() => {

    setDataUser(JSON.parse(localStorage.getItem("@sessionDelivery") as any));
  }, [asUser]);

  async function handleSingout() {
    await api.delete(`/singout/${datUser?.id}`).then(() => {
      localStorage.removeItem("@sessionDelivery");
      window.location.href = "/";
    });
  }

  const navBarBtns = [
    {
      id: 3,
      title: "Dashboard",
      link: `/dashboard/${datUser?.name_company}/faturamento`,
      icon: "",
      active: btn2,
    },
    {
      id: 2,
      title: "Meus Pedidos",
      link: `/dashboard/${datUser?.name_company}`,
      icon: "",
      active: btn1,
    },
    {
      id: 3,
      title: "Configurações",
      link: `/dashboard/${datUser?.name_company}/config`,
      icon: "",
      active: btn3,
    },
  ];

  return (
    <LoginContext>
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
          <p style={{ color: "#fff", fontSize: "17px" }}>Bem vindo {datUser?.name_company}</p>
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
    </LoginContext>
  );
}
