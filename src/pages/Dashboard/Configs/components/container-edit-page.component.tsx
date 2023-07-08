import { Button, Input, Row, Spin, Tag, Typography } from 'antd';
import React, { useState, useContext } from 'react';
import '../style.css';
import { DashContext } from '../../../../context/dashboard.context';
import IframePageCompany from './iframe-page.component';
import { AiOutlineUpload } from 'react-icons/ai';
import {
  handleSaveChanges,
  handleSaveChanges2,
  handleSaveChanges3,
} from './functionProfileImgSave';

export default function ContainerEditMyPage() {
  const [cor, setCor] = useState<string>('');
  const [load, setLoad] = useState<boolean>(false);
  const [prevNameFile, setPrevNameFile] = useState<File>();

  const { setFileProfile, setCorNav, asUser, corNavPrev } =
    useContext(DashContext);

  return (
    <>
      <div className="container-edit-loja">
        <div style={{ padding: '20px', width: '50%' }}>
          <Typography.Title level={5}>
            Escolha a cor que pré-dominará no seu ambiente online
          </Typography.Title>
          <Row style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Input
              onChange={(color) => {
                setCorNav(color.target.value);
                setCor(color.target.value);
              }}
              style={{ width: '50px', height: '40px' }}
              type="color"
            ></Input>
            <Typography.Text>
              cor: {cor && <Tag color="green">{cor}</Tag>}
            </Typography.Text>
          </Row>
          <br></br>
          <Typography.Title level={5}>
            Escolha a logo para o seu estabelecimento
          </Typography.Title>
          <Row style={{ display: 'grid', gap: '20px' }}>
            <div className="boxInputFileFake">
              <Input
                onChange={(event) => {
                  const selectedFile: File | null =
                    event.target.files?.[0] || null;
                  if (selectedFile) {
                    setPrevNameFile(selectedFile);
                    const reader = new FileReader();
                    reader.onload = () => {
                      const url = reader.result;
                      setFileProfile(url);
                    };
                    reader.readAsDataURL(selectedFile);
                  }
                }}
                type="file"
              ></Input>
              <span
                id="inputFileFake"
                style={{ background: corNavPrev ?? '#5b72f2' }}
              >
                <AiOutlineUpload color="#fff" size={30}></AiOutlineUpload>
                Carregue sua logo
              </span>
            </div>
            <Row>
              {prevNameFile?.name && (
                <Tag color={corNavPrev ?? '#5b72f2'}>{prevNameFile?.name}</Tag>
              )}
            </Row>
          </Row>
        </div>
        <div style={{ padding: '20px', width: '50%' }}>
          {corNavPrev && (
            <IframePageCompany color={corNavPrev}></IframePageCompany>
          )}
        </div>
      </div>

      <Button
        style={{ width: '200px' }}
        type="default"
        onClick={() => {
          setLoad(true);
          if (prevNameFile && cor) {
            handleSaveChanges(prevNameFile, cor, asUser)
              .then(() => {
                setLoad(false);
              })
              .catch((err) => {
                console.log(err);
                setLoad(false);
              });
          } else if (!prevNameFile) {
            handleSaveChanges2(cor, asUser)
              .then(() => {
                setLoad(false);
              })
              .catch((err) => {
                console.log(err);
                setLoad(false);
              });
          } else {
            handleSaveChanges3(prevNameFile, asUser)
              .then(() => {
                setLoad(false);
              })
              .catch((err) => {
                console.log(err);
                setLoad(false);
              });
          }
        }}
      >
        {load ? <Spin className="spin"></Spin> : 'Salvar'}
      </Button>
    </>
  );
}
