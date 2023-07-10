import {
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Spin,
  Typography,
} from 'antd';
import React, { useContext, useState, useEffect } from 'react';
import { DashContext } from '../../../../context/dashboard.context';
import FormItem from 'antd/es/form/FormItem';
import { Option } from 'antd/es/mentions';
import { Options } from '../options-categoria-menu';
import { api } from '../../../../services/api';
import { toast } from 'react-toastify';

export interface Params {
  item: {
    amount?: string;
    categoria?: string;
    description?: string;
    id?: string;
    price?: string;
    title?: string;
    weight?: string;
  };
}

export default function ModalEditItem({ item }: Params) {
  const { openModalEditItem, setOpenModalEdititem } = useContext(DashContext);
  const [form] = Form.useForm();
  const [load, setLoad] = useState(false);

  async function handleUpdateItem() {
    setLoad(true);
    const values = form.getFieldsValue();

    await api
      .put(`/updatemenu/${item.id}`, {
        data: {
          amount: values?.amount,
          categoria: values?.categoria,
          description: values?.description,
          price: values?.price,
          title: values?.title,
          weight: values?.amount,
        },
      })
      .then(() => {
        setLoad(false);
        toast.success('item atualizado com sucesso!');
        window.location.reload();
      });
  }
  return (
    <>
      <Modal
        closable={false}
        open={openModalEditItem}
        onOk={handleUpdateItem}
        okText={load ? <Spin></Spin> : 'Atualizar'}
        onCancel={() => {
          setOpenModalEdititem(false);
        }}
        centered
        
        title={
          <>
            <Typography.Title level={3}>Editar item</Typography.Title>
            <Divider></Divider>
          </>
        }
      >
        <Form
          initialValues={{
            title: item.title,
            categoria: item.categoria,
            weight: item.weight,
            amount: item.amount,
            price: item.price,
            description: item.description,
          }}
          form={form}
        >
          <Row style={{ width: '100%', flexWrap: 'nowrap', gap: '10px' }}>
            <Col style={{ width: '50%' }}>
              <label htmlFor="title">Titulo do item</label>
              <FormItem name={'title'}>
                <Input
                  style={{ width: '100%' }}
                  id="title"
                  placeholder="Digite um titulo novo"
                ></Input>
              </FormItem>
            </Col>
            <Col style={{ width: '50%' }}>
              <label htmlFor="categoria">Categoria do item</label>
              <FormItem initialValue={item.categoria} name={'categoria'}>
                <Select
                  style={{ width: '100%' }}
                  id="categoria"
                  placeholder="Digite um titulo novo"
                >
                  {Options.map((item: { value: string }) => {
                    return <Option value={item.value}>{item.value}</Option>;
                  })}
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row style={{ width: '100%', flexWrap: 'nowrap', gap: '10px' }}>
            <Col style={{ width: '50%' }}>
              <label htmlFor="weight">Serve quantas pessoas</label>
              <FormItem name={'weight'}>
                <Input style={{ width: '100%' }} id="weight"></Input>
              </FormItem>
            </Col>
            <Col style={{ width: '50%' }}>
              <label htmlFor="amount">Quantidade / peso</label>
              <FormItem name={'amount'}>
                <Input style={{ width: '100%' }} id="amount"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row style={{ width: '100%', flexWrap: 'nowrap', gap: '10px' }}>
            <Col style={{ width: '100%' }}>
              <label htmlFor="price">Preço</label>
              <FormItem name={'price'}>
                <Input style={{ width: '100%' }} id="price"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row style={{ width: '100%', flexWrap: 'nowrap', gap: '10px' }}>
            <Col style={{ width: '100%' }}>
              <label htmlFor="description">Descrição</label>
              <FormItem name={'description'}>
                <Input
                  style={{ width: '100%', height: '70px' }}
                  id="description"
                ></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}
