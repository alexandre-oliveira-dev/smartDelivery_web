import React, { useContext } from "react";
import { DashContext } from "../../../../context/dashboard.context";
import { Button, Col, Input, Row, Select, Table, Tag, Typography } from "antd";
import { ColumnsType } from "antd/es/table";
import { FiEdit } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import Card from "antd/es/card/Card";
import { useQueryParam, StringParam  } from "use-query-params";
import { Options } from "../options-categoria-menu";

export default function TableForListItems() {
  const coloumns: ColumnsType<any> = [
    {
      title: "Title",
      dataIndex: "title",
      key: 1,
    },
    {
      title: "Categoria",
      dataIndex: "categoria",
      key: 2,
      render(item) {
        return (
          <Tag style={{ fontSize: "17px", padding: "4px" }} color="blue">
            {item}
          </Tag>
        );
      },
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: 3,
      render(item) {
        return (
          <Tag style={{ fontSize: "17px", padding: "4px" }} color="green">
            {Number(item).toLocaleString("pt-br", {
              style: "currency",
              currency: "BRL",
            })}
          </Tag>
        );
      },
    },
    {
      title: "Ações",
      key: 4,
      width: "150px",

      render() {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              type="primary"
              title="Editar"
              icon={<FiEdit></FiEdit>}
              style={{ background: "#ffa50a" }}
            >
              Editar
            </Button>
            <Button
              type="primary"
              title="Mais detalhes"
              icon={<TbListDetails></TbListDetails>}
              style={{ background: "#0a95ff" }}
            >
              Detalhes
            </Button>
          </div>
        );
      },
    },
  ];

  const { dataCardapio, load } = useContext(DashContext);

  const [, setItem] = useQueryParam("item", StringParam);
  const [, setCategoria] = useQueryParam("categoria", StringParam);

  

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          marginTop: "30px",
        }}
      >
        <Row>
          <Typography.Title level={2}>Meu Cardápio</Typography.Title>
        </Row>
        <Card style={{ width: "90%" }}>
          <Row justify={"end"}>
            <Button>Limpar</Button>
          </Row>
          <Row>
            <Col>
              <Input
                placeholder={"Pesquisar pelo item"}
                type="search"
                onChange={(event) => {
                  setItem(event.target.value);
                }}
              ></Input>
            </Col>
            <Col>
              <select
                placeholder="categoria"
                onChange={(event) => {
                  setCategoria(event.target?.value);
                }}
              >
                {Options.map((item: any) => {
                  return (
                    <option key={item.id} value={item.value}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </Col>
          </Row>
        </Card>
        <Table
          style={{ width: "90%" }}
          dataSource={dataCardapio}
          columns={coloumns}
          loading={load}
        ></Table>
      </div>
    </>
  );
}
