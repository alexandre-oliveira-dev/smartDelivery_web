import React from  'react'
import './style.css'
import { MdLogout } from 'react-icons/md'


export default function NavBarComponent(){

    const navBarBtns = [
        {id:1, title:'Meus Pedidos',link:"",icon:'',active:true},
        {id:2, title:'Faturamento',link:"",icon:'',active:false},
        {id:3, title:'Configurações',link:"",icon:'',active:false}
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
                    <button style={item.active ? { color:"silver",fontWeight:"600"} : {}} key={item.id}>{item.icon} {item.title}</button>
                )
            })
          }
          </div>

          <button className='btn-sair'><MdLogout></MdLogout> sair</button>
        </nav>
    )
}