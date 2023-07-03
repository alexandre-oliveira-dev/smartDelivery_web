import { Col, Modal, Row, Tag } from 'antd'
import React,{useContext} from 'react'
import { DashContext } from '../../../../context/dashboard.context'

 export type ItemTypes = {
   data:{
    title: string;
    descricao: string;
    peoples: string;
    price: string;
    quantidade: string;
    categoria: string;
   }
  };

export default function ModalDetailsItem({data}:ItemTypes){
    const {openModal,setOpenModal} = useContext(DashContext)
    return(
        <>
        <Modal
        open={openModal}
        closable={false}
        onCancel={()=>setOpenModal(false)}
        title='Detalhes do item'
        okButtonProps={{style:{display:"none"}}}
        cancelText='Voltar'
        >
         <Col style={{flexDirection:"column",gap:"10px",display:"flex"}}>
         <Row gutter={10}>
           <Col style={{fontWeight:"600"}}>Titulo:</Col>
           <Col>{data.title}</Col>
         </Row>
        
         <Row gutter={10}>
           <Col style={{fontWeight:"600"}}>Categoria:</Col>
           <Col><Tag color='blue'>{data.categoria}</Tag></Col>
         </Row>
         <Row gutter={10}>
           <Col style={{fontWeight:"600"}}>Serve:</Col>
           <Col>{data.peoples} pessoas</Col>
         </Row>
         <Row gutter={10}>
           <Col style={{fontWeight:"600"}}>Quantidade / peso:</Col>
           <Col>{data.quantidade}</Col>
         </Row>
         <Row gutter={10}>
           <Col style={{fontWeight:"600"}}>Descrição:</Col>
           <Col>{data.descricao}</Col>
         </Row>
         <Row gutter={10}>
           <Col style={{fontWeight:"600"}}>Preço:</Col>
           <Col><Tag color='green'>{parseFloat(data.price)?.toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}</Tag></Col>
         </Row>
         </Col>
        </Modal>
        </>
    )
}