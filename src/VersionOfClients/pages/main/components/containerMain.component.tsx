import { Divider, Row, Typography } from 'antd';
import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { dataCompanyContext } from '../../../contexts/dataCompany.context';
import ProductInEmphasisComponent from './productsInEmphasis.component';

const styles = createUseStyles({
  container: {
    width: '100%',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default function ContainerMain() {
  const { container } = styles();
  const { dataCompany } = useContext(dataCompanyContext);
  return (
    <>
      <Row className={container}>
        <Row
          style={{
            margin: '2rem 0 2rem 0',
            height: 'min-content',
          }}
        >
          <Typography.Title
            level={2}
            style={{ color: dataCompany?.backgroundColor }}
          >
            Em destaque
          </Typography.Title>
        </Row>
        <Row>
          <ProductInEmphasisComponent></ProductInEmphasisComponent>
        </Row>
        <Row style={{ width: '80%' }}>
          <Divider dashed></Divider>
        </Row>
      </Row>
    </>
  );
}
