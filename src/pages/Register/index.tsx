/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import './style.css';
import Header from '../../components/Header';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Tabs,
  Tag,
  Typography,
} from 'antd';
import TabPane from 'antd/es/tabs/TabPane';
import FormItem from 'antd/es/form/FormItem';
import { api } from '../../services/api';
import { DashProvider } from '../../context/dashboard.context';
import { toast } from 'react-toastify';

export type RegisterValues = {
  name_company: string;
  cnpj: string;
  payments_methods?: [];
  phone: string;
  email: string;
  password?: string;
  address: string;
  newpassword?: string;
  isSubiscriber?: boolean;
  daysOfWeeks?: [];
  pixType?: string;
  pixKey?: string;
};

export const acceptPayments = [
  {
    paymentmode: 'Pix',
    brand: 'https://img.icons8.com/fluency/48/pix.png',
  },
  {
    paymentmode: 'débito',
    brand: 'https://img.icons8.com/color/48/mastercard-logo.png',
  },

  {
    paymentmode: 'crédito',
    brand: 'https://img.icons8.com/color/48/visa.png',
  },
  {
    paymentmode: 'vale refeição',
    brand: 'https://img.icons8.com/office/16/bank-card-back-side.png',
  },
  {
    paymentmode: 'ticket refeição',
    brand: 'https://img.icons8.com/office/16/bank-card-back-side.png',
  },
];

export const horarios = [
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
];

export const daysOfWeeks = [
  { d: 0, name: 'Domingo' },
  { d: 1, name: 'Segunda-feira' },
  { d: 2, name: 'Terça-feira' },
  { d: 3, name: 'Quarta-feira' },
  { d: 4, name: 'Quinta-feira' },
  { d: 5, name: 'Sexta-feira' },
  { d: 6, name: 'Sábado' },
];
export default function Register() {
  const [payment_modes, setPaymentModes] = useState<any>([]);
  const [load, setLoad] = useState(false);
  const [daysAndHors, setDaysAndHors] = useState<any[]>([]);

  useEffect(() => {
    setDaysAndHors([...daysAndHors]);
  }, []);

  const [form] = Form.useForm();

  const initialvalues = {
    name_company: '',
    cnpj: '',
    payments_methods: [],
    phone: '',
    email: '',
    password: '',
    address: '',
  };

  function handleRemoveDay(index: number) {
    setDaysAndHors(
      daysAndHors.filter(
        (_i: { day: string; open: string; close: string }, ind: number) =>
          ind !== index
      )
    );
  }

  return (
    <>
      <DashProvider>
        <Header></Header>
      </DashProvider>
      <div className="bodystyleRegister">
        <Form
          form={form}
          initialValues={initialvalues}
          onFinish={async (data: RegisterValues) => {
            setLoad(true);
            form.setFieldValue('payments_methods', [...payment_modes]);

            await api
              .post('/create', {
                data: {
                  name_company: data.name_company,
                  address: data.address,
                  cnpj: data.cnpj,
                  email: data.email,
                  payments_methods: payment_modes,
                  password: data.password,
                  phone: data.phone,
                  daysOfWeeks: daysAndHors,
                },
              })
              .then(() => {
                window.location.href = '/';
                setLoad(false);
              })
              .catch((err) => {
                toast.error('ops usuario já existe');
                console.log(err);
                setLoad(false);
              });
          }}
        >
          <br />
          <br />
          <div className="box-register">
            <Typography.Title level={2}>Cadastro</Typography.Title>
            <Tabs className="tab">
              <TabPane
                className="responsivetabpane"
                key={1}
                tab="Dados do estabelecimento"
              >
                <Row style={{ width: '100%' }}>
                  <Col style={{ width: '100%' }}>
                    <Row style={{ gap: 10 }}>
                      <FormItem
                        style={{ flex: 1 }}
                        label="Nome do estabelecimento:"
                        labelAlign="left"
                        name={'name_company'}
                      >
                        <Input></Input>
                      </FormItem>
                      <FormItem
                        style={{ flex: 1 }}
                        label="Cnpj:"
                        labelAlign="left"
                        name={'cnpj'}
                      >
                        <Input></Input>
                      </FormItem>
                    </Row>

                    <FormItem
                      style={{ flex: 1 }}
                      label="E-mail:"
                      labelAlign="left"
                      name={'email'}
                    >
                      <Input></Input>
                    </FormItem>
                    <FormItem
                      style={{ flex: 1 }}
                      label="Telefone:"
                      labelAlign="left"
                      name={'phone'}
                    >
                      <Input></Input>
                    </FormItem>
                    <Row
                      className="responsiveboxadddays"
                      style={{
                        gap: 10,
                        alignItems: 'center',
                        //border: '1px solid silver',
                        padding: '10px',
                        marginBottom: '10px',
                        flexDirection: 'column',
                      }}
                    >
                      <label htmlFor="">
                        Adicione os dias e horários de funcionamento
                      </label>
                      <Row
                        style={{
                          gap: 10,
                          alignItems: 'center',
                          width: '100%',
                        }}
                      >
                        <FormItem
                          style={{ flex: 1 }}
                          label="Dia da semana"
                          labelAlign="left"
                          name="day"
                        >
                          <Select placeholder="Selecione">
                            {daysOfWeeks.map(
                              (
                                item: { d: number; name: string },
                                index: number
                              ) => {
                                return (
                                  <Select.Option
                                    key={index}
                                    value={JSON.stringify(item)}
                                  >
                                    {item.name}
                                  </Select.Option>
                                );
                              }
                            )}
                          </Select>
                        </FormItem>
                        <FormItem
                          style={{ flex: 1 }}
                          label="Início"
                          labelAlign="left"
                          name="openHors"
                        >
                          <Select placeholder="Selecione">
                            {horarios.map((item: string, index: number) => {
                              return (
                                <Select.Option key={index} value={item}>
                                  {item}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </FormItem>
                        <FormItem
                          style={{ flex: 1 }}
                          label="Término"
                          labelAlign="left"
                          name="closeHors"
                        >
                          <Select placeholder="Selecione">
                            {horarios.map((item: string, index: number) => {
                              return (
                                <Select.Option key={index} value={item}>
                                  {item}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </FormItem>

                        <Button
                          className="responsivebtnaddmoredays"
                          style={{ marginBottom: '-6px' }}
                          type="default"
                          onClick={() => {
                            const dia = form.getFieldValue('day');
                            const hora = form.getFieldValue('openHors');
                            const closeHors = form.getFieldValue('closeHors');

                            console.log(JSON.parse(dia));
                            const object = {
                              day: JSON.parse(dia),
                              open: hora,
                              close: closeHors,
                            };
                            daysAndHors.push(object);
                            setDaysAndHors([...daysAndHors]);
                            form.resetFields(['day', 'hors']);
                          }}
                        >
                          +
                        </Button>
                      </Row>
                      <Row style={{ width: '100%', gap: 5 }}>
                        {daysAndHors.map(
                          (
                            item: {
                              day: { n: number; name: string };
                              open: string;
                              close: string;
                            },
                            index
                          ) => {
                            return (
                              <Tag
                                key={index}
                                color="blue"
                                onClick={() => handleRemoveDay(index)}
                              >
                                Dia: {item.day.name} abre: {item.open} fecha:{' '}
                                {item.close} X
                              </Tag>
                            );
                          }
                        )}
                      </Row>
                    </Row>

                    <label htmlFor="password">escolha uma senha:</label>
                    <FormItem name={'password'}>
                      <Input></Input>
                    </FormItem>
                  </Col>
                </Row>
              </TabPane>
              <TabPane key={2} tab="Formas de pagamento aceitas">
                <Row style={{ width: '100%' }}>
                  <Col style={{ width: '100%' }}>
                    <label htmlFor="payments_methods">
                      Formas de pagamento que você aceita:
                    </label>
                    <FormItem name={'payments_methods'}>
                      <Row
                        style={{
                          display: 'flex',
                          gap: '10px',
                          flexDirection: 'column',
                        }}
                      >
                        {acceptPayments.map(
                          (item: (typeof acceptPayments)[0], index) => {
                            return (
                              <Row
                                key={index}
                                style={{
                                  display: 'flex',
                                  gap: '10px',
                                  justifyContent: 'space-between',
                                }}
                              >
                                <Input
                                  prefix={
                                    <Row>
                                      <label
                                        htmlFor="payment_mode"
                                        style={{ width: '300px' }}
                                      >
                                        {item.paymentmode === 'Dinheiro'
                                          ? item.paymentmode
                                          : item.paymentmode === 'Pix'
                                          ? item.paymentmode
                                          : 'Cartão de ' + item.paymentmode}
                                      </label>
                                      <img
                                        style={{
                                          width: '20px',
                                          //marginLeft: '30px',
                                        }}
                                        src={item.brand}
                                        alt=""
                                      ></img>
                                    </Row>
                                  }
                                  style={{ width: '100%' }}
                                  type="checkbox"
                                  value={item.paymentmode}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setPaymentModes(
                                        (prev: typeof payment_modes) => [
                                          ...prev,
                                          e.target.value,
                                        ]
                                      );
                                    } else {
                                      setPaymentModes(
                                        payment_modes.filter(
                                          (item: string) =>
                                            item !== e.target.value
                                        )
                                      );
                                    }
                                  }}
                                ></Input>
                              </Row>
                            );
                          }
                        )}
                      </Row>
                    </FormItem>
                  </Col>
                </Row>
              </TabPane>
              <TabPane key={3} tab="Informações de endereço">
                <Row style={{ width: '100%' }}>
                  <Col style={{ width: '100%' }}>
                    <label htmlFor="address">
                      Endereço do seu estabelecimento:
                    </label>
                    <FormItem name={'address'}>
                      <Input placeholder="ex: av paulista 2049"></Input>
                    </FormItem>
                    <button disabled={load} id="finshbtn" type="submit">
                      {load ? 'Cadastrando...' : 'Finalizar'}
                    </button>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Form>
      </div>
    </>
  );
}
