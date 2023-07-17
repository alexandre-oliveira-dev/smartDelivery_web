import { Col, Input, Row, Select, Typography } from 'antd';
import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { dataCompanyContext } from '../../../contexts/dataCompany.context';
import { FiSearch } from 'react-icons/fi';

const styles = createUseStyles({
  container: {
    width: '100%',
    height: '50px',
    backgroundColor: '#fff',
    padding: '0 0 0 100px',
    alignItems: 'center',
    gap: '30px',
  },
  selectstyles: {
    width: '200px',
  },
});

export default function FilterComponent() {
  const { container, selectstyles } = styles();
  const { dataCompany } = useContext(dataCompanyContext);

  const categorias = dataCompany?.Menu?.filter((item) => item);
  return (
    <>
      <Row className={container}>
        <Col>
          <Typography.Title level={4}>Filtrar por:</Typography.Title>
        </Col>
        <Col>
          <Row style={{ gap: '20px' }}>
            <Col>
              <Select placeholder="Categoria" className={selectstyles}>
                {categorias?.map(
                  (item: { categoria: string }, index: number) => {
                    return (
                      <option key={index} value={item.categoria}>
                        {item.categoria}
                      </option>
                    );
                  }
                )}
              </Select>
            </Col>
            <Col>
              <Select placeholder="Preço" className={selectstyles}>
                <option value="maior">Maior preço</option>
                <option value="menor">Menor preço</option>
              </Select>
            </Col>
            <Col>
              <Input
                prefix={<FiSearch color="silver"></FiSearch>}
                placeholder="Pesquisar"
              ></Input>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
