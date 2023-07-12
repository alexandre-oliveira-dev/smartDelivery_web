import { Button, Col, Form, Input, Modal, Row, Spin, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useContext, useState } from "react";
import { api } from "../../services/api";
import { DashContext } from "../../context/dashboard.context";
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

type SinginTypes = {
  email: string;
  password: string;
};

export default function ModalLogin() {
  const [errmessage, setErrmessage] = useState('');
  const [form] = Form.useForm();
  const [load, setLoad] = useState(false);
  const [visible, setVisible] = useState(false);
  const { openModal, setOpenModal } = useContext(DashContext);

  return (
    <>
      <Modal
        closable={false}
        style={{ padding: '20px' }}
        open={openModal}
        okText={load ? <Spin size="small"></Spin> : 'Entrar'}
        okButtonProps={{ type: 'default', style: { width: '100px' } }}
        onCancel={() => {
          setOpenModal(false);
        }}
        onOk={async () => {
          if (!form.getFieldValue('email') && !form.getFieldValue('password')) {
            toast.error('Preencha todos os campos');
            return;
          }
          setLoad(true);
          await api
            .post('/singin', {
              email: form.getFieldValue('email'),
              password: form.getFieldValue('password'),
            })
            .then((response) => {
              localStorage.setItem(
                '@sessionDelivery',
                JSON.stringify(response.data)
              );
              setLoad(false);
              window.location.href = `/dashboard/${response.data?.name_company}`;
            })
            .catch((err) => {
              setLoad(false);
              document
                .getElementById('err')
                ?.setAttribute('style', 'display:flex');
              setErrmessage('Dados inválidos ou não cadastrados!');
              console.log(err);
            });
        }}
      >
        <Typography.Title level={3}>Fazer login</Typography.Title>
        <Form form={form}>
          <FormItem name={'email'}>
            <Input placeholder="Digite seu email"></Input>
          </FormItem>
            <FormItem name={'password'}>
          <Row>
              <Input
                id="pass"
                prefix={
                  visible ? (
                    <AiFillEyeInvisible
                      onClick={() => {
                        setVisible(false);
                        document
                          .getElementById('pass')
                          ?.setAttribute('type', 'text');
                      }}
                    ></AiFillEyeInvisible>
                  ) : (
                    <AiFillEye
                      onClick={() => {
                        setVisible(true);
                        document
                          .getElementById('pass')
                          ?.setAttribute('type', 'password');
                      }}
                    ></AiFillEye>
                  )
                }
                type="password"
                placeholder="Digite sua senha"
              ></Input>
          </Row>
            </FormItem>
          <Col>
            <Row>
              <span id="err">{errmessage}</span>
            </Row>
            <Button style={{ marginLeft: 0 }} type="link" href="#">
              Esqueci minha senha
            </Button>
          </Col>
        </Form>
      </Modal>
    </>
  );
}
