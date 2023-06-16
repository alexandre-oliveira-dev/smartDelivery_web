import React, { useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import { Col, Form, Input, Row, Select, Tabs, Typography } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import FormItem from "antd/es/form/FormItem";

export default function Register() {
  const [currentTab, setCurrentTab] = useState(1);
  const [form] = Form.useForm();

  const initialvalues = {
    id: "",
    name_company: "",
    cnpj: "",
    payments_methods: [],
    imgProfile: "",
    isSubiscriber: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  };

  return (
    <div>
      <Form form={form} initialValues={initialvalues} onFinish={(data)=> console.log(data)}>
        <Header></Header>
        <br />
        <br />
        <div className="box-register">
          <Typography.Title level={2}>Cadastro</Typography.Title>
          <Tabs
            className="tab"
            onChange={(e) => {
              console.log(e);
            }}
          >
            <TabPane key={1} tab="Dados do estabelecimento">
              <Row style={{ width: "100%" }}>
                <Col style={{ width: "100%" }}>
                  <label htmlFor="nome_company">Nome do estabelecimento:</label>
                  <FormItem name={'nome_company'}>
                    <Input></Input>
                  </FormItem>
                  <label htmlFor="cnpj">Cnpj:</label>
                  <FormItem name={'cnpj'}>
                    <Input></Input>
                  </FormItem>
                  <label htmlFor="email">E-mail:</label>
                  <FormItem name={'email'}>
                    <Input></Input>
                  </FormItem>
                  <label htmlFor="telefone">Telefone:</label>
                  <FormItem name={'telefone'}>
                    <Input></Input>
                  </FormItem>
                </Col>
              </Row>
            </TabPane>
            <TabPane key={2} tab="Formas de pagamento aceitas">
              <Row style={{ width: "100%" }}>
                <Col style={{ width: "100%" }}>
                  <label htmlFor="payment_mode">Formas de pagamento que você aceita:</label>
                  <FormItem name={'payment_metods'} isListField isList >
                      <Row style={{display:'flex',gap:"10px"}}>
                      <Input style={{width:'auto'}} type="checkbox" value="Débito"></Input>
                      <label htmlFor="payment_mode">Cartão de Débito</label>
                      </Row>
                      <Row style={{display:'flex',gap:"10px"}}>
                      <Input style={{width:'auto'}} type="checkbox" value="Crédito"></Input>
                      <label htmlFor="payment_mode">Cartão de Crédito</label>
                      </Row>
                      <Row style={{display:'flex',gap:"10px"}}>
                      <Input style={{width:'auto'}} type="checkbox" value="Refeicao"></Input>
                      <label htmlFor="payment_mode">vale Refeicao</label>
                      </Row>
                  </FormItem>
                   
                </Col>
              </Row>
            </TabPane>
            <TabPane key={3} tab="Informações de endereço">
              <Row style={{ width: "100%" }}>
                <Col style={{ width: "100%" }}>
                  <label htmlFor="address">Endereço do seu estabelecimento:</label>
                  <FormItem name={'address'}>
                    <Input placeholder="ex: av paulista 2049"></Input>
                  </FormItem>

                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
                  <button type="submit">Finalizar</button>
      </Form>
    </div>
  );
}
