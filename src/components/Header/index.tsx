import { useContext } from 'react';
import './style.css';
import { Button, Image, Row, Typography } from 'antd';
import { DashContext } from '../../context/dashboard.context';
import ModalLogin from './modal-login.component';
import logo from '../../assets/logo.png';

export default function Header() {
  const { asUser, setOpenModal } = useContext(DashContext);

  if (window.screen.width > 500) {
    window.addEventListener('scroll', function () {
      const scrollPosition = window.scrollY;
      if (scrollPosition !== 0) {
        document
          .querySelector('.header')
          ?.setAttribute('style', 'width:100%;border-radius:0');
      } else {
        document.querySelector('.header')?.setAttribute('style', 'width:80%');
      }
    });
  }

  return (
    <header className="box-header">
      <div className="header">
        <Row style={{ alignItems: 'center' }}>
          <Image src={logo} preview={false}></Image>
          <Typography.Title
            className="hiddenformobile"
            onClick={() => (window.location.href = '/')}
            level={2}
            style={{ color: '#fff', cursor: 'pointer' }}
          >
            SmartDelivery
          </Typography.Title>
        </Row>
        <div className="nav-btns">
          <button onClick={() => (window.location.href = '/')}>Inicio</button>
          <button onClick={() => (window.location.href = '/sobrenos')}>
            Quem somos
          </button>
          <button>Ajuda</button>
        </div>
        <div
          className="responsiveBtnsareaLogin"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div
            style={{
              position: 'relative',
            }}
          >
            {!asUser ? (
              <Button onClick={() => setOpenModal(true)}>Entrar</Button>
            ) : (
              <Button
                onClick={() =>
                  (window.location.href = `/dashboard/${asUser?.name_company}`)
                }
              >
                Ir para o dashboard
              </Button>
            )}
            <ModalLogin></ModalLogin>
          </div>
          <a href="/cadastro">Cadastre-se</a>
        </div>
      </div>
    </header>
  );
}
