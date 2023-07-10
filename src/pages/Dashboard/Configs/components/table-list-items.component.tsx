import React, { useContext,useState } from "react";
import { DashContext } from "../../../../context/dashboard.context";
import { Button, Col, Input, Row, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { FiEdit, FiSearch } from 'react-icons/fi';
import { TbListDetails } from 'react-icons/tb';
import Card from 'antd/es/card/Card';
import { useQueryParam, StringParam } from 'use-query-params';
import { Options } from '../options-categoria-menu';
import ModalDetailsItem from './modal-details-item.component';
import ModalEditItem from './modal-edit-item.component';

export default function TableForListItems() {
  const {
    dataCardapio,
    corNavPrev,
    loadTables,
    setOpenModal,
    setOpenModalEdititem,
  } = useContext(DashContext);
  const [dataItemDetails, setdataItemDetails] = useState<any>({});
  const [initialValues, setInitialValues] = useState<any>({});

  const coloumns: ColumnsType<any> = [
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
            {parseFloat(item).toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
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
              <ModalDetailsItem data={dataItemDetails}></ModalDetailsItem>
              <ModalEditItem item={initialValues}></ModalEditItem>
            </>
          </div>
        );
      },
    },
  ];

  const [, setItem] = useQueryParam('item', StringParam);

  return (
    <>
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
            <Button
              onClick={() => {
                window.location.href = window.location.pathname;
              }}
            >
              Limpar
            </Button>
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
                <select
                  id="Categoria"
                  style={{
                    width: '200px',
                    height: '30px',
                    outlineColor: corNavPrev,
                    border: '1px solid silver',
                    borderRadius: '5px',
                    color: 'silver',
                  }}
                  placeholder="Selecione"
                  onChange={(event) => {
                    setItem(event.target?.value);
                  }}
                >
                  <option>Selecione</option>
                  <>
                    {Options.map((item: any) => {
                      return (
                        <option key={item.id} value={item.value}>
                          {item.value}
                        </option>
                      );
                    })}
                  </>
                </select>
              </div>
            </Col>
          </Row>
        </Card>
        <Table
          style={{ width: '90%' }}
          dataSource={dataCardapio}
          columns={coloumns}
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
