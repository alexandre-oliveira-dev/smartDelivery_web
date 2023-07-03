import React, { useState, useContext } from "react";
import "../style.css";
import "../../styleGlobalDash.css";
import NavBarComponent from "../../components/navbarComponent";
import { Button, Card, Col, Divider, Form, Input, Row, Select, Spin, Tag, Typography } from "antd";
import { api } from "../../../../services/api";
import { Options } from "../options-categoria-menu";
import { DashContext } from "../../../../context/dashboard.context";
import Title from "../../components/Title";
import ContainerEditMyPage from "./container-edit-page.component";
import { toast } from "react-toastify";
import TableForListItems from "./table-list-items.component";

export type ItemsofMenutypes = {
  item: string;
  descricao: string;
  peoples: string;
  price: number;
  quantidade: string;
  categoria: string;
};

type Optionstype = {
  value: string;
  id: number;
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
  const [datacardapio, setDatacardapio] = useState<any[]>([]);
  const [form] = Form.useForm();
  const { asUser, corNavPrev, load,setLoadTables } = useContext(DashContext);
  const [loadForm,setLoadForm] = useState(false)



  async function handleRegisterMenu() {
    setLoadForm(true)
    const response = datacardapio?.map(async (item: ItemsofMenutypes) => {
      await api.post("/createmenu", {
        title: String(item.item),
        price: String(item.price),
        amount: String(item.quantidade),
        companiesId: String(asUser.companyId),
        weight: String(item.peoples),
        categoria: String(item.categoria),
        description: String(item.descricao),
      });
    });
    Promise.all(response).then(() => {
      setDatacardapio([]);
      setLoadForm(false)
      toast.success("itens cadastrados com sucesso!"); 
      setTimeout(() => {
        window.location.reload()
      }, 2000);  
    }).catch(()=> setLoadForm(false))
  }

  return (
    <>
      <NavBarComponent btn3={true}></NavBarComponent>
      {load ? (
        <Spin
          size="large"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        ></Spin>
      ) : (
        <div className="box-global-dash">
          <div className="content-dasboard-pages">
            <Title text="Configurações" size="25px" align="center" color="#fff"></Title>
            <TableForListItems></TableForListItems>

            <Row style={{ justifyContent: "center", width: "100%", marginBottom: "3rem" }}>
              <Typography.Title level={3}>Adicionar itens no cardápio</Typography.Title>
            </Row>
            <div style={{ display: "flex", width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "center", width: "50%" }}>
                <Col style={{ width: "80%" }}>
                  <Form form={form} initialValues={initialValues}>
                    <Row style={{ width: "100%" }}>
                      <Row style={{ display: "grid", width: "100%" }}>
                        <Form.Item name="item">
                          <Input required allowClear placeholder="titulo do item"></Input>
                        </Form.Item>
                        <Form.Item  name="price">
                          <Input required allowClear placeholder="preço do item"></Input>
                        </Form.Item>
                        <Form.Item name="quantidade">
                          <Input
                            required
                            allowClear
                            placeholder="peso ou quantidade do item"
                          ></Input>
                        </Form.Item>
                        <Form.Item name="peoples">
                          <Input required allowClear placeholder="serve quantas pessoas"></Input>
                        </Form.Item>
                        <Form.Item name="categoria">
                          <Select placeholder="categoria">
                            {Options.map((item: Optionstype) => {
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
                            required
                            style={{
                              width: "100%",
                              height: "150px",
                              border: " 1px solid grey",
                              padding: "20px",
                              fontSize: "17px",
                            }}
                            className="textarea-desc"
                            placeholder="descrição"
                          ></textarea>
                        </Form.Item>
                      </Row>
                    </Row>
                    <Button
                      style={{
                        width: "200px",
                        background: corNavPrev,
                      }}
                      type="primary"
                      onClick={() => {
                        let data = [...datacardapio];
                        data.push(form.getFieldsValue());
                        setDatacardapio(data);
                        form.resetFields();
                      }}
                    >
                      Adicionar
                    </Button>
                  </Form>
                </Col>
              </div>
              <div
                style={{
                  display: "flex",
                  width: "50%",
                  height: "500px",
                  overflow: "auto",
                  paddingTop: "30px",
                  flexDirection: "column",
                  alignContent: "center",
                  justifyContent: "flex-start",
                }}
              >
                {datacardapio.length < 1 && (
                  <Typography.Title level={3}>Nenhum item adicionado!</Typography.Title>
                )}
                {datacardapio?.reverse().map((item: ItemsofMenutypes, index: number) => {
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
                                <Typography.Text
                                  editable={{
                                    onChange: (value) => {
                                      const currentData: ItemsofMenutypes = datacardapio?.filter(
                                        (item: any, ind: number) => ind === index
                                      )[0];
                                      let fieldUpdate = {
                                        item: value,
                                        price: currentData.price,
                                        quantidade: currentData.quantidade,
                                        peoples: currentData.peoples,
                                        categoria: currentData.categoria,
                                        descricao: currentData.descricao,
                                      };
                                      const newData = datacardapio?.filter(
                                        (_item: any, ind: number) => ind !== index
                                      );
                                      newData.push(fieldUpdate);
                                      setDatacardapio(newData);
                                    },
                                  }}
                                >
                                  {item.item}
                                </Typography.Text>
                              </Row>
                              <Row style={{ textAlign: "center", gap: "10px" }}>
                                <Typography.Title level={5}>Peso / Qtd do item:</Typography.Title>
                                <Typography.Text
                                  editable={{
                                    onChange: (value) => {
                                      const currentData: ItemsofMenutypes = datacardapio?.filter(
                                        (item: any, ind: number) => ind === index
                                      )[0];
                                      let fieldUpdate = {
                                        item: currentData.item,
                                        price: currentData.price,
                                        quantidade: value,
                                        peoples: currentData.peoples,
                                        categoria: currentData.categoria,
                                        descricao: currentData.descricao,
                                      };
                                      const newData = datacardapio?.filter(
                                        (_item: any, ind: number) => ind !== index
                                      );
                                      newData.push(fieldUpdate);
                                      setDatacardapio(newData);
                                    },
                                  }}
                                >
                                  {item.quantidade}
                                </Typography.Text>
                              </Row>
                            </Col>
                            <Col>
                              <Row style={{ textAlign: "center", gap: "10px" }}>
                                <Typography.Title level={5}>Serve: </Typography.Title>
                                <Typography.Text
                                  editable={{
                                    onChange: (value) => {
                                      const currentData: ItemsofMenutypes = datacardapio?.filter(
                                        (item: any, ind: number) => ind === index
                                      )[0];
                                      let fieldUpdate = {
                                        item: currentData.item,
                                        price: currentData.price,
                                        quantidade: currentData.quantidade,
                                        peoples: value,
                                        categoria: currentData.categoria,
                                        descricao: currentData.descricao,
                                      };
                                      const newData = datacardapio?.filter(
                                        (_item: any, ind: number) => ind !== index
                                      );
                                      newData.push(fieldUpdate);
                                      setDatacardapio(newData);
                                    },
                                  }}
                                >
                                  {item.peoples && item.peoples + "pessoas"}
                                </Typography.Text>
                              </Row>
                              <Row style={{ textAlign: "center", gap: "10px" }}>
                                <Typography.Title level={5}>Categoria: </Typography.Title>
                                <Typography.Text
                                  editable={{
                                    onChange: (value) => {
                                      const currentData: ItemsofMenutypes = datacardapio?.filter(
                                        (item: any, ind: number) => ind === index
                                      )[0];
                                      let fieldUpdate = {
                                        item: currentData.item,
                                        price: currentData.price,
                                        quantidade: currentData.quantidade,
                                        peoples: currentData.peoples,
                                        categoria: value,
                                        descricao: currentData.descricao,
                                      };
                                      const newData = datacardapio?.filter(
                                        (_item: any, ind: number) => ind !== index
                                      );
                                      newData.push(fieldUpdate);
                                      setDatacardapio(newData);
                                    },
                                  }}
                                >
                                  {item.categoria && (
                                    <Tag style={{ height: "max-content" }} color="blue">
                                      {item.categoria}
                                    </Tag>
                                  )}
                                </Typography.Text>
                              </Row>
                            </Col>
                          </Col>
                          <Divider></Divider>
                          <Col style={{ display: "grid", gap: "20px" }}>
                            <Col>
                              <Typography.Title level={5}>Descrição</Typography.Title>
                              <Typography.Text
                                editable={{
                                  onChange: (value) => {
                                    const currentData: ItemsofMenutypes = datacardapio?.filter(
                                      (item: any, ind: number) => ind === index
                                    )[0];
                                    let fieldUpdate = {
                                      item: currentData.item,
                                      price: currentData.price,
                                      quantidade: currentData.quantidade,
                                      peoples: currentData.peoples,
                                      categoria: currentData.categoria,
                                      descricao: value,
                                    };
                                    const newData = datacardapio?.filter(
                                      (_item: any, ind: number) => ind !== index
                                    );
                                    newData.push(fieldUpdate);
                                    setDatacardapio(newData);
                                  },
                                }}
                                style={{ color: "silver" }}
                              >
                                {item.descricao}
                              </Typography.Text>
                            </Col>
                            <Col>
                              <Typography.Title level={5}>Preço:</Typography.Title>
                              <Typography.Text
                                editable={{
                                  onChange: (value) => {
                                    const currentData: ItemsofMenutypes = datacardapio?.filter(
                                      (item: any, ind: number) => ind === index
                                    )[0];
                                    let fieldUpdate = {
                                      item: currentData.item,
                                      price: parseFloat(value.replace(',','.')),
                                      quantidade: currentData.quantidade,
                                      peoples: currentData.peoples,
                                      categoria: currentData.categoria,
                                      descricao: currentData.descricao,
                                    };
                                    const newData = datacardapio?.filter(
                                      (_item: any, ind: number) => ind !== index
                                    );
                                    newData.push(fieldUpdate);
                                    setDatacardapio(newData);
                                  },
                                }}
                              >
                                <Tag style={{ height: "max-content" }} color="green">
                                  {(item.price).toLocaleString("pt-br", {
                                    style: "currency",
                                    currency: "BRL",
                                  })}
                                </Tag>
                              </Typography.Text>
                            </Col>
                          </Col>
                        </Row>
                      </Card>
                      <br></br>
                    </>
                  );
                })}
                {datacardapio.length > 0 && (
                  <Button
                    style={{
                      width: "200px",
                      background: corNavPrev,
                    }}
                    type="primary"
                    onClick={handleRegisterMenu}
                  >
                    {loadForm ? <Spin></Spin> : 'Salvar'}
                  </Button>
                )}
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
            <ContainerEditMyPage></ContainerEditMyPage>
          </div>
        </div>
      )}
    </>
  );
}
