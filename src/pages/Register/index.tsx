import React, { useState } from "react";
import "./style.css";
import Header from "../../components/Header";
import { Col, Form, Input, Row, Tabs, Typography } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import FormItem from "antd/es/form/FormItem";
import { api } from "../../services/api";
import { DashProvider } from "../../context/dashboard.context";

export type RegisterValues = {
  name_company: string;
  cnpj: string;
  payments_methods?: [];
  phone: string;
  email: string;
  password?: string;
  address: string;
};

export default function Register() {
  const [payment_modes, setPaymentModes] = useState<any>([]);
  const [load, setLoad] = useState(false);

  const acceptPayments = [
    {
      paymentmode: "Pix",
      brand: "https://img.icons8.com/fluency/48/pix.png",
    },
    {
      paymentmode: "débito",
      brand: "https://img.icons8.com/color/48/mastercard-logo.png",
    },
    {
      paymentmode: "débito",
      brand: "https://img.icons8.com/color/48/visa.png",
    },
    {
      paymentmode: "crédito",
      brand: "https://img.icons8.com/color/48/mastercard-logo.png",
    },
    {
      paymentmode: "crédito",
      brand: "https://img.icons8.com/color/48/visa.png",
    },
    {
      paymentmode: "vale refeição",
      brand: "https://img.icons8.com/office/16/bank-card-back-side.png",
    },
    {
      paymentmode: "ticket refeição",
      brand: "https://img.icons8.com/office/16/bank-card-back-side.png",
    },
    {
      paymentmode: "todas as marcas de vale refeição",
      brand: "https://img.icons8.com/office/16/bank-card-back-side.png",
    },
  ];

  const [form] = Form.useForm();

  const initialvalues = {
    name_company: "",
    cnpj: "",
    payments_methods: [],
    phone: "",
    email: "",
    password: "",
    address: "",
  };

  return (
    <div>
      <Form
        form={form}
        initialValues={initialvalues}
        onFinish={async (data: RegisterValues) => {
          setLoad(true);
          form.setFieldValue("payments_methods", [...payment_modes]);
          await api
            .post("/create", {
              data: {
                name_company: data.name_company,
                address: data.address,
                cnpj: data.cnpj,
                email: data.email,
                payments_methods: payment_modes,
                password: data.password,
                phone: data.phone,
              },
            })
            .then(() => {
              window.location.href = "/";
              setLoad(false);
            })
            .catch((err) => {
              alert("ops usuario já existe");
              console.log(err);
              setLoad(false);
            });
        }}
      >
        <DashProvider>
          <Header></Header>
        </DashProvider>
        <br />
        <br />
        <div className="box-register">
          <Typography.Title level={2}>Cadastro</Typography.Title>
          <Tabs className="tab">
            <TabPane key={1} tab="Dados do estabelecimento">
              <Row style={{ width: "100%" }}>
                <Col style={{ width: "100%" }}>
                  <label htmlFor="name_company">Nome do estabelecimento:</label>
                  <FormItem name={"name_company"}>
                    <Input></Input>
                  </FormItem>
                  <label htmlFor="cnpj">Cnpj:</label>
                  <FormItem name={"cnpj"}>
                    <Input></Input>
                  </FormItem>
                  <label htmlFor="email">E-mail:</label>
                  <FormItem name={"email"}>
                    <Input></Input>
                  </FormItem>
                  <label htmlFor="phone">Telefone:</label>
                  <FormItem name={"phone"}>
                    <Input></Input>
                  </FormItem>
                  <label htmlFor="password">escolha uma senha:</label>
                  <FormItem name={"password"}>
                    <Input></Input>
                  </FormItem>
                </Col>
              </Row>
            </TabPane>
            <TabPane key={2} tab="Formas de pagamento aceitas">
              <Row style={{ width: "100%" }}>
                <Col style={{ width: "100%" }}>
                  <label htmlFor="payments_methods">Formas de pagamento que você aceita:</label>
                  <FormItem name={"payments_methods"}>
                    <Row style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                      {acceptPayments.map((item: (typeof acceptPayments)[0], index) => {
                        return (
                          <Row
                            key={index}
                            style={{
                              display: "flex",
                              gap: "10px",
                              justifyContent: "space-between",
                            }}
                          >
                            <Input
                              prefix={
                                <Row>
                                  <label htmlFor="payment_mode" style={{ width: "300px" }}>
                                    Cartão de {item.paymentmode}
                                  </label>
                                  <img
                                    style={{ width: "20px", marginLeft: "30px" }}
                                    src={item.brand}
                                    alt=""
                                  ></img>
                                </Row>
                              }
                              style={{ width: "100%" }}
                              type="checkbox"
                              value={item.paymentmode}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setPaymentModes((prev: typeof payment_modes) => [
                                    ...prev,
                                    e.target.value,
                                  ]);
                                } else {
                                  setPaymentModes(
                                    payment_modes.filter((item: string) => item !== e.target.value)
                                  );
                                }
                              }}
                            ></Input>
                          </Row>
                        );
                      })}
                    </Row>
                  </FormItem>
                </Col>
              </Row>
            </TabPane>
            <TabPane key={3} tab="Informações de endereço">
              <Row style={{ width: "100%" }}>
                <Col style={{ width: "100%" }}>
                  <label htmlFor="address">Endereço do seu estabelecimento:</label>
                  <FormItem name={"address"}>
                    <Input placeholder="ex: av paulista 2049"></Input>
                  </FormItem>
                  <button disabled={load} id="finshbtn" type="submit">
                    {load ? "Cadastrando..." : "Finalizar"}
                  </button>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </Form>
    </div>
  );
}
