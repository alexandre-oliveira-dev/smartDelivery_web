import { Button, Input, Row, Spin, Tag, Typography } from "antd";
import React, { useState, useContext } from "react";
import IframePageCompany from "./iframe-page.component";
import "./style.css";
import { DashContext } from "../../../context/dashboard.context";
import { api } from "../../../services/api";

export default function ContainerEditMyPage() {
  const [cor, setCor] = useState<any>();
  const [load, setLoad] = useState<boolean>(false);
  const [file, setFile] = useState<string | ArrayBuffer | null>();

  const { setFileProfile, setCorNav, asUser, corNavPrev } = useContext(DashContext);

  async function handleSaveChanges() {
    setLoad(true);
    await api
      .put(`/update/${asUser.companyId}`, {
        backgroundColor: cor,
      })
      .then(() => {
        let updateLocalstorage = {
          backgroundColor:cor,
          email:asUser?.email,
          id: asUser?.id,
          name_company: asUser?.name_company,
          companyId: asUser?.companyId,
         }  
         localStorage.setItem('@sessionDelivery',JSON.stringify(updateLocalstorage))

        alert("alterações salvas");
        setLoad(false);
        window.location.reload();
      })
      .catch((err) => {
        setLoad(false);

        console.log(err);
      });
  }

  return (
    <>
      <div className="container-edit-loja">
        <div style={{ padding: "20px", width: "50%" }}>
          <Typography.Title level={5}>
            Escolha a cor que pré-dominará no seu ambiente online
          </Typography.Title>
          <Row style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Input
              onChange={(color) => {
                setCorNav(color.target.value);
                setCor(color.target.value);
              }}
              style={{ width: "50px", height: "40px" }}
              type="color"
            ></Input>
            <Typography.Text>cor: {cor && <Tag color="green">{cor}</Tag>}</Typography.Text>
          </Row>
          <br></br>
          <Typography.Title level={5}>Escolha a logo para o seu estabelecimento</Typography.Title>
          <Row style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <Input
              onChange={(event) => {
                const selectedFile: File | null = event.target.files?.[0] || null;
                if (selectedFile) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const url = reader.result;
                    setFile(url);
                    setFileProfile(url);
                  };
                  reader.readAsDataURL(selectedFile);
                }
              }}
              type="file"
            ></Input>
          </Row>
        </div>
        <div style={{ padding: "20px", width: "50%" }}>
          {
            (corNavPrev && <IframePageCompany color={corNavPrev} file={file}></IframePageCompany>)}
        </div>
      </div>
      {cor && (
        <Button style={{ width: "200px" }} type="default" onClick={handleSaveChanges}>
          {load ? <Spin className="spin"></Spin> : "Salvar"}
        </Button>
      )}
    </>
  );
}
