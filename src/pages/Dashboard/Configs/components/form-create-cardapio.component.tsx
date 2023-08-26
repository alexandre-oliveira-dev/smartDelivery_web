import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Tag,
  Typography,
} from 'antd';
import React, { useContext, useState } from 'react';
import { DashContext } from '../../../../context/dashboard.context';
import { Options } from '../options-categoria-menu';
import { FiTrash } from 'react-icons/fi';
import { api } from '../../../../services/api';
import { toast } from 'react-toastify';
import { PriceFormater } from '../../../../helpers/priceFormater';

type Optionstype = {
  value: string;
  id: number;
};
export type ItemsofMenutypes = {
  item: string;
  descricao: string;
  peoples: string;
  price: number;
  quantidade: string;
  categoria: string;
  weight: string;
};

export default function FormCreateCardapio() {
  const { corNavPrev, asUser } = useContext(DashContext);
  const [datacardapio, setDatacardapio] = useState<any[]>([]);
  const [loadForm, setLoadForm] = useState(false);
  const [form] = Form.useForm();

  const formater = new PriceFormater();

  async function handleRegisterMenu() {
    setLoadForm(true);
    const response = datacardapio?.map(async (item: ItemsofMenutypes) => {
      await api.post('/createmenu', {
        title: String(item.item),
        price: String(item.price),
        amount: String(item.quantidade),
        companiesId: String(asUser.companyId),
        weight: String(item.peoples),
        categoria: String(item.categoria),
        description: String(item.descricao),
      });
    });
    Promise.all(response)
      .then(() => {
        setDatacardapio([]);
        setLoadForm(false);
        toast.success('itens cadastrados com sucesso!');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(() => setLoadForm(false));
  }
  return (
    <>
      <div style={{ display: 'flex', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '50%',
          }}
        >
          <Card style={{ width: '90%' }}>
            <Col style={{ width: '100%' }}>
              <Form form={form}>
                <Row style={{ width: '100%' }}>
                  <Row style={{ display: 'grid', width: '100%' }}>
                    <Row style={{ width: '100%', gap: '10px' }}>
                      <Form.Item style={{ flex: '1' }} name="item">
                        <Input
                          required
                          allowClear
                          placeholder="titulo do item"
                        ></Input>
                      </Form.Item>
                      <Form.Item style={{ flex: '1' }} name="price">
                        <Input
                          required
                          allowClear
                          placeholder="preço do item"
                        ></Input>
                      </Form.Item>
                    </Row>
                    <Row style={{ width: '100%', gap: '10px' }}>
                      <Form.Item style={{ flex: '1' }} name="quantidade">
                        <Input
                          required
                          allowClear
                          placeholder="peso ou quantidade do item"
                        ></Input>
                      </Form.Item>
                      <Form.Item style={{ flex: '1' }} name="peoples">
                        <Input
                          required
                          allowClear
                          placeholder="serve quantas pessoas"
                        ></Input>
                      </Form.Item>
                    </Row>
                    <Form.Item
                      label="Categoria"
                      labelAlign="left"
                      name="categoria"
                    >
                      <Select showSearch placeholder="categoria">
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
                          width: '100%',
                          height: '150px',
                          border: ' 1px solid grey',
                          padding: '20px',
                          fontSize: '17px',
                        }}
                        className="textarea-desc"
                        placeholder="descrição"
                      ></textarea>
                    </Form.Item>
                  </Row>
                </Row>
                <Button
                  style={{
                    width: '200px',
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
          </Card>
        </div>
        <div
          style={{
            display: 'flex',
            width: '50%',
            height: '500px',
            overflow: 'auto',
            paddingTop: '30px',
            flexDirection: 'column',
            alignContent: 'center',
            justifyContent: 'flex-start',
          }}
        >
          {datacardapio.length < 1 && (
            <Typography.Title level={3}>
              Nenhum item adicionado!
            </Typography.Title>
          )}
          {datacardapio
            ?.reverse()
            .map((item: ItemsofMenutypes, index: number) => {
              return (
                <>
                  <Card
                    style={{
                      width: '70%',
                      height: 'auto',
                      boxShadow: '5px 5px 10px silver',
                    }}
                  >
                    <Row
                      style={{
                        width: '100%',
                        position: 'relative',
                        marginBottom: '20px',
                      }}
                    >
                      <Typography.Text>{index + 1}°</Typography.Text>
                      <Button
                        style={{
                          position: 'absolute',
                          right: '0px',
                          border: '0 !important',
                        }}
                        type="text"
                        onClick={() => {
                          setDatacardapio(
                            datacardapio.filter(
                              (i: ItemsofMenutypes, ind: number) =>
                                ind !== index
                            )
                          );
                        }}
                      >
                        <FiTrash color="red"></FiTrash>
                      </Button>
                    </Row>
                    <Row key={index}>
                      <Col style={{ display: 'flex', gap: '20px' }}>
                        <Col>
                          <Row style={{ textAlign: 'center', gap: '10px' }}>
                            <Typography.Title level={5}>
                              Nome do item:{' '}
                            </Typography.Title>
                            <Typography.Text
                              editable={{
                                onChange: (value: any) => {
                                  const currentData: ItemsofMenutypes =
                                    datacardapio?.filter(
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
                          <Row style={{ textAlign: 'center', gap: '10px' }}>
                            <Typography.Title level={5}>
                              Peso / Qtd do item:
                            </Typography.Title>
                            <Typography.Text
                              editable={{
                                onChange: (value: any) => {
                                  const currentData: ItemsofMenutypes =
                                    datacardapio?.filter(
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
                          <Row style={{ textAlign: 'center', gap: '10px' }}>
                            <Typography.Title level={5}>
                              Serve:{' '}
                            </Typography.Title>
                            <Typography.Text
                              editable={{
                                onChange: (value: any) => {
                                  const currentData: ItemsofMenutypes =
                                    datacardapio?.filter(
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
                              {item.peoples && item.peoples + 'pessoas'}
                            </Typography.Text>
                          </Row>
                          <Row style={{ textAlign: 'center', gap: '10px' }}>
                            <Typography.Title level={5}>
                              Categoria:{' '}
                            </Typography.Title>
                            <Typography.Text
                              editable={{
                                onChange: (value: any) => {
                                  const currentData: ItemsofMenutypes =
                                    datacardapio?.filter(
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
                                <Tag
                                  style={{ height: 'max-content' }}
                                  color="blue"
                                >
                                  {item.categoria}
                                </Tag>
                              )}
                            </Typography.Text>
                          </Row>
                        </Col>
                      </Col>
                      <Divider></Divider>
                      <Col style={{ display: 'grid', gap: '20px' }}>
                        <Col>
                          <Typography.Title level={5}>
                            Descrição
                          </Typography.Title>
                          <Typography.Text
                            editable={{
                              onChange: (value: any) => {
                                const currentData: ItemsofMenutypes =
                                  datacardapio?.filter(
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
                            style={{ color: 'silver' }}
                          >
                            {item.descricao}
                          </Typography.Text>
                        </Col>
                        <Col>
                          <Typography.Title level={5}>Preço:</Typography.Title>
                          <Typography.Text
                            editable={{
                              onChange: (value: any) => {
                                const currentData: ItemsofMenutypes =
                                  datacardapio?.filter(
                                    (item: any, ind: number) => ind === index
                                  )[0];
                                let fieldUpdate = {
                                  item: currentData.item,
                                  price: parseFloat(value.replace(',', '.')),
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
                            <Tag
                              style={{ height: 'max-content' }}
                              color="green"
                            >
                              {formater.formater({ price: item.price })}
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
                width: '200px',
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
    </>
  );
}
