import React, { useContext } from 'react';
import '../style.css';
import { Button, Card, Form, Input, Row } from 'antd';
import { DashContext } from '../../../../context/dashboard.context';
import { RegisterValues } from '../../../Register';

const ContainerEditDataCompany = () => {
  const { dataCompany } = useContext(DashContext);
  const [form] = Form.useForm();

  const initialValues: RegisterValues = {
    name_company: dataCompany?.name_company,
    cnpj: dataCompany.cnpj,
    phone: dataCompany.phone,
    email: dataCompany.email,
    address: dataCompany.address,
  };

  console.log(initialValues);

  const handleSubmit = () => {
    // Add logic for saving the form data
  };

  return (
    <div className="container-edit-loja">
      <Card style={{ width: '100%' }}>
        <Form initialValues={initialValues} form={form}>
          <Row style={{ width: '100%', gap: '10px', flexWrap: 'nowrap' }}>
            <Form.Item
              label="Nome do estabelecimento"
              name="name_company"
              style={{ width: '50%' }}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Cnpj" name="cnpj" style={{ width: '50%' }}>
              <Input />
            </Form.Item>
          </Row>
          <Row style={{ width: '100%', gap: '10px', flexWrap: 'nowrap' }}>
            <Form.Item label="Telefone" name="phone" style={{ width: '30%' }}>
              <Input id="phone" />
            </Form.Item>
            <Form.Item label="email" name="email" style={{ width: '70%' }}>
              <Input />
            </Form.Item>
          </Row>
          <Row style={{ width: '100%', gap: '10px', flexWrap: 'nowrap' }}>
            <Form.Item
              label="Endereço"
              name="address"
              style={{ width: '100%' }}
            >
              <Input id="address" />
            </Form.Item>
          </Row>
          <Row style={{ width: '100%', gap: '10px', flexWrap: 'nowrap' }}>
            <Form.Item label="Senha" name="password" style={{ width: '100%' }}>
              <Input id="password" />
            </Form.Item>
            <Form.Item
              label="Nova senha"
              name="newpassword"
              style={{ width: '100%' }}
            >
              <Input id="newpassword" />
            </Form.Item>
          </Row>
          <Button type="primary" onClick={handleSubmit}>
            Salvar
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ContainerEditDataCompany;
