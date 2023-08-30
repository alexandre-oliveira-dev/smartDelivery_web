import React, { useContext, useEffect, useState } from 'react';
import '../style.css';
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Spin,
  Tag,
  Typography,
} from 'antd';
import {
  AsUserPropsTypes,
  DashContext,
} from '../../../../context/dashboard.context';
import {
  RegisterValues,
  acceptPayments,
  daysOfWeeks,
  horarios,
} from '../../../Register';
import { api } from '../../../../services/api';
import { toast } from 'react-toastify';
import { EncryptString } from '../../../../helpers/ecryptString';
import { FiTrash } from 'react-icons/fi';

interface DayObjectParamsType {
  d: number;
  name: string;
}

const ContainerEditDataCompany = () => {
  const { dataCompany, corNavPrev, asUser } = useContext(DashContext);
  const [form] = Form.useForm();
  const [load, setLoad] = useState(false);
  const [payment_methods, setPayment_methods] = useState<string[]>([]);
  const [daysAndWeeks, setDaysAndWeeks] = useState<any[]>([]);
  const [day, setDay] = useState<string>('');
  const [open, setOpen] = useState<string>('');
  const [close, setClose] = useState<string>('');

  const encryptPassword = new EncryptString();

  useEffect(() => {
    function load() {
      setPayment_methods(dataCompany?.payments_methods as []);
      setDaysAndWeeks(dataCompany?.daysOfWeeks as []);
    }
    load();
  }, [dataCompany?.payments_methods, dataCompany?.daysOfWeeks]);

  const initialValues: RegisterValues = {
    name_company: dataCompany?.name_company,
    cnpj: dataCompany?.cnpj,
    phone: dataCompany?.phone,
    email: dataCompany?.email,
    address: dataCompany?.address,
    pixKey: dataCompany?.pixKey,
    pixType: dataCompany?.pixType,
  };

  const handleSubmitUpdate = async () => {
    setLoad(true);
    const fieldsValues: RegisterValues = form.getFieldsValue();
    if (!fieldsValues.password) {
      toast.info('Digite sua senha');
      setLoad(false);
      return;
    }

    await api
      .put(
        `update/${asUser?.companyId}`,
        {
          name_company: fieldsValues.name_company,
          cnpj: fieldsValues.cnpj,
          phone: fieldsValues.phone,
          email: fieldsValues.email,
          address: fieldsValues.address,
          password: fieldsValues.newpassword,
          payments_methods: payment_methods,
          daysOfWeeks: daysAndWeeks,
          pixKey: fieldsValues.pixKey,
          pixType: fieldsValues.pixType,
        },
        {
          headers: {
            Authorization: encryptPassword.encryptString({
              text: fieldsValues?.password,
            }),
          },
        }
      )
      .then(() => {
        setLoad(false);
        toast.success('Dados atualizados com sucesso!');
        localStorage.setItem(
          '@sessionDelivery',
          JSON.stringify({
            backgroundColor: asUser.backgroundColor,
            companyId: asUser.companyId,
            email: fieldsValues.email ?? asUser.email,
            name_company: fieldsValues.name_company ?? asUser.name_company,
            id: asUser.id,
            imgProfile: asUser.imgProfile,
          } as AsUserPropsTypes)
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(() => {
        setLoad(false);
        toast.error('Senha invalida!');
      });
  };

  function handleRemovePaymentsMethods(item: string, index: number) {
    setPayment_methods(
      payment_methods.filter(
        (i: string, position: number) => i !== item || position !== index
      )
    );
  }
  function handleRemoveDays(index: number) {
    setDaysAndWeeks(
      daysAndWeeks.filter((i: string, position: number) => position !== index)
    );
  }

  //usando initialValues.name_company como parametro para renderização do form para preenchimento do initialvalues.
  return (
    <div className="container-edit-loja">
      {initialValues.name_company && (
        <Card style={{ width: '100%' }}>
          <Form initialValues={initialValues} form={form}>
            <Row style={{ width: '100%', gap: '10px', flexWrap: 'nowrap' }}>
              <Form.Item
                label="Nome do estabelecimento"
                labelAlign="left"
                name="name_company"
                style={{
                  width: '50%',
                }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                labelAlign="left"
                label="Cnpj"
                name="cnpj"
                style={{ width: '50%' }}
              >
                <Input />
              </Form.Item>
            </Row>
            <Row style={{ width: '100%', gap: '10px', flexWrap: 'nowrap' }}>
              <Form.Item
                labelAlign="left"
                label="Telefone"
                name="phone"
                style={{ width: '30%' }}
              >
                <Input id="phone" />
              </Form.Item>
              <Form.Item
                labelAlign="left"
                label="email"
                name="email"
                style={{ width: '70%' }}
              >
                <Input />
              </Form.Item>
            </Row>
            <Row style={{ width: '100%', gap: '10px', flexWrap: 'nowrap' }}>
              <Form.Item
                labelAlign="left"
                label="Endereço"
                name="address"
                style={{ width: '100%' }}
              >
                <Input id="address" />
              </Form.Item>
            </Row>
            <Row style={{ width: '100%', gap: '10px', flexWrap: 'nowrap' }}>
              <Form.Item
                labelAlign="left"
                label="Tipo de chave pix"
                name="pixType"
                style={{ width: '100%' }}
              >
                <Select placeholder="Selecione">
                  <Select.Option key={1} value={'cpf'}>
                    {'Cpf'}
                  </Select.Option>
                  <Select.Option key={1} value={'Cnpj'}>
                    {'Cnpj'}
                  </Select.Option>
                  <Select.Option key={1} value={'telefone'}>
                    {'Telefone'}
                  </Select.Option>
                  <Select.Option key={1} value={'aleatoria'}>
                    {'Aleatória'}
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                labelAlign="left"
                label="Digite sua chve"
                name="pixKey"
                style={{ width: '100%' }}
              >
                <Input />
              </Form.Item>
            </Row>
            <Row>
              <Col style={{ gap: '20px' }}>
                <Typography.Title level={4}>
                  Formas de pagamentos aceitas:
                </Typography.Title>

                {
                  <Row style={{ gap: 10 }}>
                    <Select
                      onChange={(e) => {
                        payment_methods?.push(e);
                        setPayment_methods([...payment_methods]);
                      }}
                      style={{
                        width: '200px',
                      }}
                      placeholder="Selecione"
                    >
                      <option>selecione</option>
                      {acceptPayments.map(
                        (payment: { paymentmode: string }, index) => {
                          return (
                            <Select.Option
                              key={index}
                              value={payment.paymentmode}
                            >
                              {payment.paymentmode}
                            </Select.Option>
                          );
                        }
                      )}
                    </Select>
                    {payment_methods?.map((item: string, index: number) => {
                      return (
                        <div key={index}>
                          <Tag
                            style={{ cursor: 'pointer' }}
                            color="gold"
                            onClick={() =>
                              handleRemovePaymentsMethods(item, index)
                            }
                          >
                            {item} <FiTrash></FiTrash>
                          </Tag>
                        </div>
                      );
                    })}
                  </Row>
                }
              </Col>
            </Row>
            <br />
            <Row>
              <Col style={{ gap: '20px' }}>
                <Typography.Title level={4}>
                  Dias da semanas e horários de funcionamento:
                </Typography.Title>

                {
                  <>
                    <Row style={{ gap: 10 }}>
                      <Select
                        placeholder="Dia"
                        onChange={(e) => setDay(e)}
                        style={{ width: '100px' }}
                      >
                        {daysOfWeeks.map(
                          (item: DayObjectParamsType, index: number) => {
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
                      <Select
                        placeholder="Abertura"
                        onChange={(e) => setOpen(e)}
                      >
                        {horarios.map((item: string, index: number) => {
                          return (
                            <Select.Option key={index} value={item}>
                              {item}
                            </Select.Option>
                          );
                        })}
                      </Select>
                      <Select
                        placeholder="Fechamento"
                        onChange={(e) => setClose(e)}
                      >
                        {horarios.map((item: string, index: number) => {
                          return (
                            <Select.Option key={index} value={item}>
                              {item}
                            </Select.Option>
                          );
                        })}
                      </Select>
                      <Button
                        style={{ marginBottom: '-6px' }}
                        type="default"
                        onClick={() => {
                          if (!day || !open || !close) return;
                          if (daysAndWeeks.length === 7) {
                            toast.info('Todos os dias estão cadastrados!');
                            return;
                          }

                          const object = {
                            day: JSON.parse(day),
                            open: open,
                            close: close,
                          };

                          daysAndWeeks.push(object);
                          setDaysAndWeeks([...daysAndWeeks]);
                        }}
                      >
                        +
                      </Button>
                      {daysAndWeeks?.map(
                        (
                          item: {
                            day: DayObjectParamsType;
                            open: string;
                            close: string;
                          },
                          index: number
                        ) => {
                          return (
                            <div key={index}>
                              <Tag
                                style={{ cursor: 'pointer' }}
                                color="blue"
                                onClick={() => handleRemoveDays(index)}
                              >
                                Dia: {item.day.name} abre: {item.open} fecha:{' '}
                                {item.close} <FiTrash></FiTrash>
                              </Tag>
                            </div>
                          );
                        }
                      )}
                    </Row>
                  </>
                }
              </Col>
            </Row>

            <Row
              style={{
                width: '100%',
                gap: '10px',
                flexWrap: 'nowrap',
                marginTop: '20px',
              }}
            >
              <Form.Item
                required
                labelAlign="left"
                label="Senha"
                name="password"
                style={{ width: '100%' }}
              >
                <Input id="password" />
              </Form.Item>
              <Form.Item
                labelAlign="left"
                label="Nova senha"
                name="newpassword"
                style={{ width: '100%' }}
              >
                <Input id="newpassword" />
              </Form.Item>
            </Row>
            <button
              style={{
                width: '200px',
                height: '40px',
                background: !corNavPrev ? '#5b72f2' : corNavPrev,
                color: '#fff',
                borderRadius: '10px',
              }}
              type="submit"
              onClick={handleSubmitUpdate}
            >
              {load ? <Spin></Spin> : 'Salvar'}
            </button>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default ContainerEditDataCompany;
