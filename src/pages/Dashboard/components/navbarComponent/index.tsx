import { useContext, useEffect, useState } from 'react';
import './style.css';
import { MdLogout } from 'react-icons/md';
import { api } from '../../../../services/api';
import { DashContext } from '../../../../context/dashboard.context';
import { Image, Spin, Typography } from 'antd';

import { MdDashboard } from 'react-icons/md';
import { FaListAlt } from 'react-icons/fa';
import { GoGear } from 'react-icons/go';
import { BsFillCreditCardFill } from 'react-icons/bs';
type Activebtntype = {
  btn1?: boolean;
  btn2?: boolean;
  btn3?: boolean;
  btn4?: boolean;
};

export default function NavBarComponent({
  btn1,
  btn2,
  btn3,
  btn4,
}: Activebtntype) {
  const { asUser, corNavPrev, fileProfile, dataCompany } =
    useContext(DashContext);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    /* if (asUser === undefined || asUser === null) {
      window.location.href = '/';
    }*/

    document.title = 'Dashboard';
    const nav = document.getElementById('navbardash');
    nav?.style.setProperty('--backNavBarColor', corNavPrev ?? '#5b72f2');
  }, [asUser, corNavPrev]);

  async function handleSingout() {
    setLoad(true);
    await api
      .delete(`/singout/${asUser?.id}`)
      .then(() => {
        localStorage.removeItem('@sessionDelivery');
        window.location.href = '/';
        setLoad(false);
      })
      .catch(() => setLoad(false));
  }

  const navBarBtns = [
    {
      id: 1,
      title: 'Dashboard',
      link: `/dashboard/${asUser?.name_company}/faturamento`,
      icon: <MdDashboard className="hovericon" color={'#fff'}></MdDashboard>,
      active: btn2,
      disable: !dataCompany?.isSubiscriber ? true : false,
    },
    {
      id: 2,
      title: 'Meus Pedidos',
      link: `/dashboard/${asUser?.name_company}`,
      icon: <FaListAlt className="hovericon" color={'#fff'}></FaListAlt>,
      active: btn1,
      disable: !dataCompany?.isSubiscriber ? true : false,
    },
    {
      id: 3,
      title: 'Configurações',
      link: `/dashboard/${asUser?.name_company}/config`,
      icon: <GoGear className="hovericon" color={'#fff'}></GoGear>,
      active: btn3,
      disable: !dataCompany?.isSubiscriber ? true : false,
    },
    {
      id: 4,
      title: 'Meu plano',
      link: `/dashboard/${asUser?.name_company}/meuPlano`,
      icon: (
        <BsFillCreditCardFill
          className="hovericon"
          color={'#fff'}
        ></BsFillCreditCardFill>
      ),
      active: btn4,
    },
  ];

  return (
    <nav id="navbardash" className="navbardash">
      <div className="box-profile-nav">
        <div className="box-style-filter-profile">
          <Image
            className="profile"
            src={fileProfile ? fileProfile : 'https://via.placeholder.com/150'}
            alt=""
          ></Image>
          <p style={{ color: '#fff', fontSize: '17px', textAlign: 'center' }}>
            Bem vindo {asUser?.email}
          </p>
          <Typography.Text style={{ color: '#fff', fontSize: '17px' }}>
            {asUser?.name_company}
          </Typography.Text>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'center',
          margin: '0 0 20px 0',
        }}
      ></div>
      <div className="boxbtnnavdash">
        {navBarBtns.map((item) => {
          return (
            <Typography.Link
              disabled={item.disable}
              className="hover"
              href={item.link}
              style={
                item.active
                  ? {
                      color: '#fff',
                      fontWeight: '600',
                      height: '40px',
                      width: '90%',
                      borderRadius: '5px',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                      fontSize: '20px',
                      gap: '10px',
                      paddingLeft: '10px',
                      border: '1px solid #fff',
                      transition: 'all 1s ease',
                    }
                  : {
                      textDecoration: 'none',
                      color: '#fff',
                      fontSize: '20px',
                      transition: 'all 1s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                      gap: '10px',
                      width: '90%',
                      paddingLeft: '10px',
                      height: '40px',
                    }
              }
              key={item.id}
            >
              {item.icon} {item.title}
            </Typography.Link>
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
