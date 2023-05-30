import React from "react";
import "./style.css";

export default function Header() {
  return (
    <header className="box-header">
      <div className="header">
          <div>logoaqui</div>
          <div className='nav-btns'>
            <button>Inicio</button>
            <button>Quem somos</button>
            <button>Duvidas</button>
          </div>
          <div>
            <a>Entrar</a>
            <a>Cadastre-se</a>
          </div>
      </div>
    </header>
  );
}
