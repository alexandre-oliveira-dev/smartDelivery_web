import React,{useContext} from 'react'
import { DashContext } from '../../../../context/dashboard.context'
import { Button, Row, Table, Tag, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'


export default function TableForListItems(){

    const coloumns:ColumnsType<any> = [
        {
            title:'Title',
            dataIndex:'title',
            key:1
        },
        {
            title:'Categoria',
            dataIndex:'categoria',
            key:2,
            render(item){
                return <Tag color='blue'>{item}</Tag>
            }
        },
        {
            title:'Preço',
            dataIndex:'price',
            key:3,
            render(item){
                return <Tag color='green'>{item}</Tag>
            }
        },
        {
            title:'Ações',
            key:4,
            render(){
                return <Button type='primary' style={{background:corNavPrev}}>Detalhes</Button>
            }
        },
    ]

    const {dataCardapio,corNavPrev,load} = useContext(DashContext)
    return(
        <>
        <div style={{
            width:"100%",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            flexDirection:"column",
            marginTop:"30px"
        }}>
            <Row>
                <Typography.Title level={2}>Meu Cardápio</Typography.Title>
            </Row>
          <Table
          style={{width:"90%"}}
          dataSource={dataCardapio}
          columns={coloumns}
          loading={load}
          ></Table>
        </div>
        
        </>
    )
}