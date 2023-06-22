import React, { useState } from "react";
import "./style.css";
import { Button, Form, Input, Modal, Typography } from "antd";
import FormItem from "antd/es/form/FormItem";
import { api } from "../../services/api";

type SinginTypes = {
  email: string;
  password: string;
};

export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const [dataForm, setDataform] = useState<SinginTypes>();
  const [errmessage, setErrmessage] = useState("");

  const [form] = Form.useForm();


  if (dataForm) {
    async function handleLogin(){
      if (!dataForm?.email||!dataForm?.password) {
        setErrmessage("Preencha todos os campos");
        return;
      }
  
      await api
        .post("/singin", {
          email: dataForm?.email,
          password: dataForm?.password,
        })
        .then((response) => {
          localStorage.setItem("@sessionDelivery", JSON.stringify(response.data));
  
          window.location.href = `/dashboard/${response.data?.name_company}`;
        })
        .catch((err) => {
          document.getElementById("err")?.setAttribute("style", "display:flex");
          setErrmessage("Dados inválidos ou não cadastrados!");
          console.log(err);
        });
    } 
    handleLogin()
   }

  return (
      <header className="box-header">
        <div className="header">
          <Typography.Title onClick={()=> window.location.href='/'} level={2} style={{color:"#fff"}}>SmartDelivery</Typography.Title>
          <div className="nav-btns">
            <button onClick={()=> window.location.href='/'} >Inicio</button>
            <button onClick={()=> window.location.href='/'} >Quem somos</button>
            <button>Duvidas</button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                position: "relative",
              }}
            >
              <Button onClick={() => setOpenModal(true)}>Entrar</Button>
              <Modal
                closable={false}
                style={{ padding: "20px" }}
                open={openModal}
                okText="Entrar"
                onCancel={() => setOpenModal(false)}
                onOk={() => {
                  if (!form.getFieldValue("email") && !form.getFieldValue("password")) {
                    setErrmessage("Preencha todos os campos");
                    return;
                  }
                  form.submit();
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
                  <Button type="link" href="#">
                    Esqueci minha senha
                  </Button>
                  <span id="err">{errmessage}</span>
                </Form>
              </Modal>
            </div>
            <a href="/cadastro">Cadastre-se</a>
          </div>
        </div>
      </header>
  );
}
