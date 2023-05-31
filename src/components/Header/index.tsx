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
            <a href="#">Entrar</a>
            <a href="#">Cadastre-se</a>
          </div>
      </div>
    </header>
  );
}
