import React, { useState, useEffect, CSSProperties } from "react";
import "./style.css";
import "../styleGlobalDash.css";
import NavBarComponent from "../components/navbarComponent";
import { Button, Card, Col, Divider, Form, Input, Row, Select, Tag, Typography } from "antd";

type ItemsofMenutypes = {
  item: string;
  descricao: string;
  peoples: string;
  price: string | number;
  quantidade: string | number;
};

export default function Config() {
  const [datacardapio, setDatacardapio] = useState<any>([]);
  const [data, setData] = useState<any>([]);
  const [cor, setCor] = useState<any>();
  const [form] = Form.useForm();

  const initialValues = {
    item: "",
    descricao: "",
    peoples: "",
    price: "",
    quantidade: "",
  };

  useEffect(() => {
    setData(datacardapio);
  }, [datacardapio, data]);

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
                    const fieldsValues: ItemsofMenutypes = form.getFieldsValue();
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
                          <option value="bebidas">Bebidas</option>
                          <option value="lanches">Lanches</option>
                          <option value="sobremesas">Sobremesas</option>
                          <option value="pratos principais">Pratos Principais</option>
                          <option value="saladas">Saladas</option>
                          <option value="sopas">Sopas</option>
                          <option value="sanduíches">Sanduíches</option>
                          <option value="massas">Massas</option>
                          <option value="vegetariano">Vegetariano</option>
                          <option value="vegano">Vegano</option>
                          <option value="carnes">Carnes</option>
                          <option value="frutos do mar">Frutos do Mar</option>
                          <option value="acompanhamentos">Acompanhamentos</option>
                          <option value="cafés">Cafés</option>
                          <option value="chás">Chás</option>
                          <option value="sucos">Sucos</option>
                          <option value="sorvetes">Sorvetes</option>
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
                  <Input style={{ cursor: "pointer" }} type="submit" value={"adicionar"} />
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
                {data.length < 1 && (
                  <Typography.Title level={3}>Nenhum item adicionado!</Typography.Title>
                )}
                {data?.map((item: ItemsofMenutypes, index: number) => {
                  return (
                    <>
                      <Card style={{ width: "70%", height: "auto" }}>
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
                          <Col style={{ display: "grid" }}>
                            <Typography.Title level={5}>Nome do item</Typography.Title>
                            <Typography.Text>{item.item}</Typography.Text>
                            <Typography.Title level={5}>Descrição</Typography.Title>

                            <Typography.Text style={{ color: "silver" }}>
                              {item.descricao}
                            </Typography.Text>
                          </Col>
                          <Divider></Divider>
                          <Col style={{ display: "grid" }}>
                            <Typography.Title level={5}>Preço</Typography.Title>
                            <Typography.Text>
                              {Number(item.price).toLocaleString("pt-br", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </Typography.Text>
                          </Col>
                        </Row>
                      </Card>
                      <br></br>
                    </>
                  );
                })}
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
            <div style={{padding:"20px"}}>
              <Typography.Title level={5}>
                Escolha a cor que pré-dominará no seu ambiente online
              </Typography.Title>
              <Row style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Input
                  onChange={(color) => setCor(color.target.value)}
                  style={{ width: "50px", height: "40px" }}
                  type="color"
                ></Input>
                <Typography.Text >cor: {cor && <Tag color="green">{cor}</Tag>}</Typography.Text>
              </Row>
              <br></br>
              <Typography.Title level={5}>
                Escolha a logo para o seu estabelecimento
              </Typography.Title>
              <Row style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                <Input onChange={(color) => setCor(color.target.value)} type="file"></Input>
              </Row>
            </div>
            <div style={{padding:"20px"}}>
              inframe do site aqui
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
