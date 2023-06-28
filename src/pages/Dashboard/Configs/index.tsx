import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import "../styleGlobalDash.css";
import NavBarComponent from "../components/navbarComponent";
import { Button, Card, Col, Divider, Form, Input, Row, Select, Tag, Typography } from "antd";
import { api } from "../../../services/api";
import { Options } from "./options-categoria-menu";
import { DashContext } from "../../../context/dashboard.context";

type ItemsofMenutypes = {
  item: string;
  descricao: string;
  peoples: string;
  price: number;
  quantidade: string;
  categoria: string;
};

export default function Config() {
  const initialValues = {
    item: "",
    descricao: "",
    peoples: "",
    price: "",
    quantidade: "",
    categoria: "",
  };
  const [datacardapio, setDatacardapio] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [cor, setCor] = useState<any>();
  const [form] = Form.useForm();
  const { asUser } = useContext(DashContext);
  const fieldsValues: ItemsofMenutypes = form.getFieldsValue();

  useEffect(() => {
    setData(datacardapio);
  }, [datacardapio, data]);

  async function handleRegisterMenu() {
    const response = await datacardapio?.map(async (item: ItemsofMenutypes) => {
      await api.post("/createmenu", {
        title: String(item.item),
        price: Number(item.price),
        amount: String(item.quantidade),
        companiesId: String(asUser.companyId),
        weight: String(item.peoples),
        categoria: String(item.categoria),
        description: String(item.descricao),
      });
    });
    Promise.all(response).then(() => {
      setDatacardapio([]);
      console.log("deu certo");
    });
  }

  return (
    <>
      <NavBarComponent btn3={true}></NavBarComponent>
      <div className="box-global-dash">
        <div className="content-dasboard-pages">
          <Typography.Title style={{ marginTop: "2rem" }} level={1}>
            Configurações
          </Typography.Title>
          <div style={{ display: "flex", width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "center", width: "50%" }}>
              <Col style={{ width: "80%" }}>
                <Row style={{ textAlign: "center", width: "100%" }}>
                  <Typography.Title level={3}>Personalizar meu cardápio</Typography.Title>
                </Row>
                <Form
                  form={form}
                  initialValues={initialValues}
                  onFinish={(item) => {
                    if (
                      !fieldsValues.descricao ||
                      !fieldsValues.item ||
                      !fieldsValues.peoples ||
                      !fieldsValues.price ||
                      !fieldsValues.quantidade
                    ) {
                      return;
                    }
                    let data = [...datacardapio];
                    data.push(item);
                    setDatacardapio(data);
                    form.resetFields();
                  }}
                >
                  <Row style={{ width: "100%" }}>
                    <Row style={{ display: "grid", width: "100%", gap: "10px" }}>
                      <Form.Item name="item">
                        <Input allowClear placeholder="titulo do item"></Input>
                      </Form.Item>
                      <Form.Item name="price">
                        <Input allowClear placeholder="preço do item"></Input>
                      </Form.Item>
                      <Form.Item name="quantidade">
                        <Input allowClear placeholder="peso ou quantidade do item"></Input>
                      </Form.Item>
                      <Form.Item name="peoples">
                        <Input allowClear placeholder="serve quantas pessoas"></Input>
                      </Form.Item>
                      <Form.Item name="categoria">
                        <Select placeholder="categoria">
                          {Options.map((item: any) => {
                            return (
                              <option key={item.id} value={item.value}>
                                {item.value}
                              </option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                      <Form.Item name="descricao">
                        <textarea
                          style={{ width: "100%", height: "150px", border: " 1px solid grey" }}
                          className="textarea-desc"
                          placeholder="descrição"
                        ></textarea>
                      </Form.Item>
                    </Row>
                  </Row>
                  <Button
                    style={{ cursor: "pointer" }}
                    type="default"
                    onClick={() => {form.submit()}}
                  >
                    Adicionar
                  </Button>
                </Form>
              </Col>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "50%",
                height: "500px",
                overflow: "auto",
              }}
            >
              <Col style={{ width: "100%", padding: "2rem 0 0 2rem" }}>
                {datacardapio.length < 1 && (
                  <Typography.Title level={3}>Nenhum item adicionado!</Typography.Title>
                )}
                {datacardapio?.map((item: ItemsofMenutypes, index: number) => {
                  return (
                    <>
                      <Card
                        style={{ width: "70%", height: "auto", boxShadow: "5px 5px 10px silver" }}
                      >
                        <Row style={{ width: "100%", position: "relative" }}>
                          <Typography.Text>{index + 1}°</Typography.Text>
                          <Button
                            style={{ position: "absolute", right: "20px" }}
                            type="ghost"
                            onClick={() => {
                              setDatacardapio(
                                datacardapio.filter(
                                  (i: ItemsofMenutypes, ind: number) => ind !== index
                                )
                              );
                            }}
                          >
                            x
                          </Button>
                        </Row>
                        <Row key={index}>
                          <Col style={{ display: "flex", gap: "20px" }}>
                            <Col>
                              <Row style={{ textAlign: "center", gap: "10px" }}>
                                <Typography.Title level={5}>Nome do item: </Typography.Title>
                                <Typography.Text>{item.item}</Typography.Text>
                              </Row>
                              <Row style={{ textAlign: "center", gap: "10px" }}>
                                <Typography.Title level={5}>Peso / Qtd do item:</Typography.Title>
                                <Typography.Text>{item.quantidade}</Typography.Text>
                              </Row>
                            </Col>
                            <Col>
                              <Row style={{ textAlign: "center", gap: "10px" }}>
                                <Typography.Title level={5}>Serve: </Typography.Title>
                                <Typography.Text>{item.peoples} pessoas</Typography.Text>
                              </Row>
                              <Row style={{ textAlign: "center", gap: "10px" }}>
                                <Typography.Title level={5}>Categoria: </Typography.Title>
                                <Tag style={{ height: "max-content" }} color="blue">
                                  {item.categoria}
                                </Tag>
                              </Row>
                            </Col>
                          </Col>
                          <Divider></Divider>
                          <Col style={{ display: "grid", gap: "20px" }}>
                            <Col>
                              <Typography.Title level={5}>Descrição</Typography.Title>
                              <Typography.Text
                                editable={{
                                  onChange(value) {
                                   
                                  },
                                }}
                                style={{ color: "silver" }}
                              >
                                {item.descricao}
                              </Typography.Text>
                            </Col>
                            <Col>
                              <Typography.Title level={5}>Preço:</Typography.Title>
                              <Tag style={{ height: "max-content" }} color="green">
                                {Number(item.price).toLocaleString("pt-br", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </Tag>
                            </Col>
                          </Col>
                        </Row>
                      </Card>
                      <br></br>
                    </>
                  );
                })}
                {datacardapio.length > 0 && (
                  <Button type="primary" onClick={handleRegisterMenu}>
                    Salvar
                  </Button>
                )}
              </Col>
            </div>
          </div>
          <br></br>
          <br></br>
          <Typography.Title level={3}>Personalizar meu espaço online</Typography.Title>
          <Typography.Paragraph>
            Aqui você pode personalizar a cor e a logo do seu estabelecimento!
          </Typography.Paragraph>
          <br></br>
          <br></br>
          <div className="container-edit-loja">
            <div style={{ padding: "20px" }}>
              <Typography.Title level={5}>
                Escolha a cor que pré-dominará no seu ambiente online
              </Typography.Title>
              <Row style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Input
                  onChange={(color) => setCor(color.target.value)}
                  style={{ width: "50px", height: "40px" }}
                  type="color"
                ></Input>
                <Typography.Text>cor: {cor && <Tag color="green">{cor}</Tag>}</Typography.Text>
              </Row>
              <br></br>
              <Typography.Title level={5}>
                Escolha a logo para o seu estabelecimento
              </Typography.Title>
              <Row style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Input onChange={(color) => setCor(color.target.value)} type="file"></Input>
              </Row>
            </div>
            <div style={{ padding: "20px" }}>inframe do site aqui</div>
          </div>
        </div>
      </div>
    </>
  );
}
