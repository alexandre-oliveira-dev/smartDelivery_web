import React, { useContext,useState } from "react";
import { DashContext } from "../../../../context/dashboard.context";
import { Button, Col, Input, Row, Select, Table, Tag, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FiEdit, FiSearch, FiTrash } from 'react-icons/fi';
import { TbListDetails } from 'react-icons/tb';
import Card from 'antd/es/card/Card';
import { useQueryParam, StringParam } from 'use-query-params';
import { Options } from '../options-categoria-menu';
import ModalDetailsItem from './modal-details-item.component';
import ModalEditItem from './modal-edit-item.component';
import { api } from '../../../../services/api';
import { toast } from 'react-toastify';
import { PriceFormater } from '../../../../helpers/priceFormater';

export default function TableForListItems() {
  const {
    dataCardapio,
    loadTables,
    setLoadTables,
    setOpenModal,
    setOpenModalEdititem,
  } = useContext(DashContext);
  const [dataItemDetails, setdataItemDetails] = useState<any>({});
  const [initialValues, setInitialValues] = useState<any>({});
  const format = new PriceFormater();

  const columns: ColumnsType<any> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 1,
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 2,
      render(item) {
        return (
          <Tag style={{ fontSize: '15px', padding: '2px' }} color="blue">
            {item}
          </Tag>
        );
      },
    },
    {
      title: 'Preço',
      dataIndex: 'price',
      key: 3,
      render(item: string) {
        return (
          <Tag style={{ fontSize: '15px', padding: '2px' }} color="green">
            {format.formater({ price: item })}
          </Tag>
        );
      },
    },
    {
      title: 'Ações',
      key: 4,
      width: '150px',

      render(item) {
        return (
          <div style={{ display: 'flex', gap: '10px' }}>
            <>
              <Button
                type="primary"
                title="Editar"
                icon={<FiEdit></FiEdit>}
                style={{ background: '#ffa50a' }}
                onClick={() => {
                  setOpenModalEdititem(true);
                  setInitialValues(item);
                }}
              >
                Editar
              </Button>
              <Button
                type="primary"
                title="Mais detalhes"
                icon={<TbListDetails></TbListDetails>}
                style={{ background: '#0a95ff' }}
                onClick={() => {
                  setOpenModal(true);
                  setdataItemDetails(item);
                }}
              >
                Detalhes
              </Button>
              <Button
                type="text"
                onClick={async () => {
                  await api
                    .delete(`/deletemenu/${item.id}`)
                    .then(() => {
                      toast.success('Item excluido com sucesso!');
                      setLoadTables(true);
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                    })
                    .catch(() => {
                      toast.error('Ops tente novamente mais tarde!');
                    });
                }}
              >
                <FiTrash color="red"></FiTrash>
              </Button>
            </>
          </div>
        );
      },
    },
  ];

  const [, setItem] = useQueryParam('item', StringParam);

  return (
    <>
      <ModalDetailsItem data={dataItemDetails}></ModalDetailsItem>
      <ModalEditItem item={initialValues}></ModalEditItem>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Row>
          <Typography.Title level={2}>Meu Cardápio</Typography.Title>
        </Row>
        <Card style={{ width: '90%', marginBottom: '20px' }}>
          <Row justify={'end'}>
            <Button onClick={() => setItem('')}>Limpar</Button>
          </Row>
          <Row gutter={[22, 22]}>
            <Col>
              <label style={{ fontWeight: '600' }} htmlFor="item">
                Nome do item
              </label>
              <Input
                id="item"
                prefix={<FiSearch color="silver"></FiSearch>}
                placeholder={'Pesquisar pelo item'}
                type="search"
                onChange={(event) => {
                  setItem(event.target.value);
                }}
              ></Input>
            </Col>
            <Col>
              <label style={{ fontWeight: '600' }} htmlFor="Categoria">
                Catagoria do item
              </label>
              <div>
                <Select
                  id="Categoria"
                  style={{
                    width: '200px',
                  }}
                  placeholder="Selecione"
                  onChange={(event) => {
                    setItem(event);
                  }}
                >
                  <>
                    {Options.map((item) => {
                      return (
                        <Select.Option key={item.id} value={item.value}>
                          {item.value}
                        </Select.Option>
                      );
                    })}
                  </>
                </Select>
              </div>
            </Col>
          </Row>
        </Card>
        <Table
          style={{ width: '90%' }}
          dataSource={dataCardapio.reverse()}
          columns={columns}
          loading={loadTables}
          size="small"
          pagination={{
            size: 'default',
            pageSize: 4,
          }}
        ></Table>
      </div>
    </>
  );
}
