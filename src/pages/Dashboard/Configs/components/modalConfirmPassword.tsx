import { Input, Modal, Row, Spin, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import {
  handleSaveChanges,
  handleSaveChanges2,
  handleSaveChanges3,
} from './functionProfileImgSave';
import { DashContext } from '../../../../context/dashboard.context';
import { toast } from 'react-toastify';
import { EncryptString } from '../../../../helpers/ecryptString';

interface Modalprops {
  prevNameFile: any;
  cor: string;
}

export default function ModalConfirmPassword({
  cor,
  prevNameFile,
}: Modalprops) {
  const { openModalConfirmPassword, asUser, setOpenModalConfirmPassword } =
    useContext(DashContext);
  const [load, setLoad] = useState(false);
  const [pass, setPass] = useState('');

  const cryptograph = new EncryptString();
  return (
    <>
      <Modal
        centered
        closable={false}
        onCancel={() => {
          setOpenModalConfirmPassword(false);
        }}
        open={openModalConfirmPassword}
        okText={load ? <Spin></Spin> : 'confirmar'}
        onOk={() => {
          if (!pass) return toast.info('Digite sua senha');
          setLoad(true);
          if (prevNameFile && cor) {
            handleSaveChanges(
              prevNameFile,
              cor,
              asUser,
              cryptograph.encryptString({ text: pass })
            )
              .then(() => {
                setLoad(false);
              })
              .catch((err) => {
                console.log(err);
                setLoad(false);
              });
          } else if (!prevNameFile) {
            handleSaveChanges2(
              cor,
              asUser,
              cryptograph.encryptString({ text: pass })
            )
              .then(() => {
                setLoad(false);
              })
              .catch((err) => {
                console.log(err);
                setLoad(false);
              });
          } else {
            handleSaveChanges3(
              prevNameFile,
              asUser,
              cryptograph.encryptString({ text: pass })
            )
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
        <Row>
          <Typography.Title level={3}>
            Digite sua senha para salvar
          </Typography.Title>
        </Row>
        <Row>
          <Input
            placeholder="Digite aqui"
            onChange={(e) => setPass(e.target.value)}
          ></Input>
        </Row>
      </Modal>
    </>
  );
}
