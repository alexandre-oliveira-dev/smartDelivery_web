import React, { useContext, useEffect } from 'react';
import '../style.css';
import { Button, Card, Form, Input, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { DashContext } from '../../../../context/dashboard.context';
import { RegisterValues } from '../../../Register';

export default function ContainerEditDataCompany() {
  const { dataCompany } = useContext(DashContext);
  const [form] = Form.useForm();

  const initialValues: RegisterValues = {
    name_company: dataCompany.name_company,
    cnpj: dataCompany.cnpj,
    phone: dataCompany.phone,
    email: dataCompany.email,
    address: dataCompany.address,
  };

  return (
    <>
      <div className="container-edit-loja">
        <Card
          style={{
            width: '100%',
          }}
        >
          <Form form={form} initialValues={initialValues}>
            <Row style={{ width: '100%', gap: '10px', flexWrap: 'nowrap' }}>
              <FormItem
                label="Nome do estabelecimento"
                name={'name_company'}
                style={{ width: '50%' }}
              >
                <Input></Input>
              </FormItem>
              <FormItem label="Cnpj" name={'cnpj'} style={{ width: '50%' }}>
                <Input id="cnpj"></Input>
              </FormItem>
            </Row>
            <Row style={{ width: '100%', gap: '10px', flexWrap: 'nowrap' }}>
              <FormItem
                label="Telefone"
                name={'phone'}
                style={{ width: '30%' }}
              >
                <Input id="phone"></Input>
              </FormItem>
              <FormItem label="email" name={'email'} style={{ width: '70%' }}>
                <Input id="email"></Input>
              </FormItem>
            </Row>
            <Row style={{ width: '100%', gap: '10px', flexWrap: 'nowrap' }}>
              <FormItem
                label="Endereço"
                name={'address'}
                style={{ width: '100%' }}
              >
                <Input id="address"></Input>
              </FormItem>
            </Row>
            <Row style={{ width: '100%', gap: '10px', flexWrap: 'nowrap' }}>
              <FormItem
                label="Senha"
                name={'password'}
                style={{ width: '100%' }}
              >
                <Input id="password"></Input>
              </FormItem>
              <FormItem
                label="Nova senha"
                name={'newpassword'}
                style={{ width: '100%' }}
              >
                <Input id="newpassword"></Input>
              </FormItem>
            </Row>
            <Button type="primary" onClick={() => {}}>
              Salvar
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
}
