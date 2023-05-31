import React from "react";
import NavBarComponent from "../components/navbarComponent";
import Title from "../components/Title";
import "../styleGlobalDash.css";
import { Table,Button,Typography } from "antd";
import { ColumnsType } from "antd/es/table";

export default function Dashboard() {

    const data = [
        {
        id:1,
        name:"ale",
        order:['batata','coca lata 300ml'],
        address:"tv dois de julho",
        phone:"11 994407328",
        amount:'R$25,00',
        payment:"credCard",
        created_at: '30/05/2023 as 20:20'
        
    },
        {
        id:2,
        name:"ale",
        order:['batata','coca lata 300ml'],
        address:"tv dois de julho",
        phone:"11 994407328",
        amount:'R$25,00',
        payment:"credCard",
        created_at: '30/05/2023 as 20:20'

    },
]



    const coluns:ColumnsType<any> = [
     
        {
            title:'id',
            dataIndex: 'id',
            align:"left",
            key:"id",
        },
        {
            title:'cliente',
            dataIndex: 'name',
            key:"name",

        },
        {
            title:'Pedido',
            dataIndex: 'order',
            key:"order",
        },
        {
            title:'Endereço',
            dataIndex: 'address',
            key:"address",
        },
        {
            title:'Telefone',
            dataIndex: 'amount',
            key:"amount",
        },
        {
            title:'Modo de pagamento',
            dataIndex: 'payment',
            key:"payment",
        },
        {
            title:'Data',
            dataIndex: 'created_at',
            key:"created_at",
        },
        {
            title:'Ações',
            render:(text,rec,index)=>{
                return <Button onClick={()=> console.log(text.id)} type="primary" color="#fff"><Typography.Text>Atualizar pedido</Typography.Text></Button>
            }
        },
    ]

  return (
    <div className="box-global-dash">
      <NavBarComponent></NavBarComponent>
      <div className="content-dasboard-pages">
        <Title align="center" color="#fff" size="20px" text="Meus Pedidos"></Title>
         
        <Table size="large"  tableLayout="auto" dataSource={data} columns={coluns} ></Table>
      </div>
    </div>
  );
}
