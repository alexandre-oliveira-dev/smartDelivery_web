import React from  'react'
import './style.css'
import { MdLogout } from 'react-icons/md'

type Activebtntype={
    btn1?:boolean
    btn2?:boolean
    btn3?:boolean
}

export default function NavBarComponent({btn1,btn2,btn3}:Activebtntype){

    const navBarBtns = [
        {id:1, title:'Meus Pedidos',link:`/dashboard/${'nomerest'}`,icon:'',active:btn1},
        {id:2, title:'Faturamento',link:`/dashboard/${'nomerest'}/faturamento`,icon:'',active:btn2},
        {id:3, title:'Configurações',link:`/dashboard/${'nomerest'}/configuracoes`,icon:'',active:btn3}
    ]

    return(
        <nav className='navbardash'>
            <div style={{display:"flex",gap:"10px",alignItems:"center",margin:"0 0 20px 0"}}>
                <div className='profile'></div>
                <p>{'username'}</p>
            </div>
          <div className='boxbtnnavdash'>
          {
            navBarBtns.map(item => {
                return(
                    <button type='button' onClick={(()=>window.location.href=item.link)} style={item.active ? { color:"silver",fontWeight:"600"} : {}} key={item.id}>{item.icon} {item.title}</button>
                )
            })
          }
          </div>

          <button className='btn-sair'><MdLogout></MdLogout> sair</button>
        </nav>
    )
}