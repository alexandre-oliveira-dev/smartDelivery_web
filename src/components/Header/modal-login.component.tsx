import { Button, Col, Form, Input, Modal, Row, Spin, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useContext, useState } from "react";
import { api } from "../../services/api";
import { DashContext, DashProvider } from "../../context/dashboard.context";

type SinginTypes = {
  email: string;
  password: string;
};

export default function ModalLogin() {
  const [errmessage, setErrmessage] = useState("");
  const [form] = Form.useForm();
  const [load, setLoad] = useState(false);
  const [dataForm, setDataform] = useState<SinginTypes>();
  const { openModal, setOpenModal } = useContext(DashContext);

  console.log('-->  ',openModal)
  return (
    <>
      <Modal
        closable={false}
        style={{ padding: "20px" }}
        open={openModal}
        okText={load ? <Spin size="small"></Spin> : "Entrar"}
        okButtonProps={{ type: "default", style: { width: "100px" } }}
        onCancel={() => {
          setOpenModal(false);
        }}
        onOk={async () => {
          if (!form.getFieldValue("email") && !form.getFieldValue("password")) {
            setErrmessage("Preencha todos os campos");
            return;
          }
          setLoad(true);
          await api
            .post("/singin", {
              email: form.getFieldValue("email"),
              password: form.getFieldValue("password"),
            })
            .then((response) => {
              localStorage.setItem("@sessionDelivery", JSON.stringify(response.data));
              setLoad(false);
              window.location.href = `/dashboard/${response.data?.name_company}`;
            })
            .catch((err) => {
              setLoad(false);
              document.getElementById("err")?.setAttribute("style", "display:flex");
              setErrmessage("Dados inválidos ou não cadastrados!");
              console.log(err);
            });
        }}
      >
        <Typography.Title level={3}>Fazer login</Typography.Title>
        <Form form={form} onFinish={(data) => setDataform(data)}>
          <FormItem name={"email"}>
            <Input placeholder="Digite seu email"></Input>
          </FormItem>
          <FormItem name={"password"}>
            <Input placeholder="Digite sua senha"></Input>
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
