import React, { useContext } from 'react';
import { Button, Col, Image, Row, Skeleton, Typography } from 'antd';
import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import { FiHelpCircle } from 'react-icons/fi';
import { dataCompanyContext } from '../../../../contexts/dataCompany.context';

const styles = createUseStyles({
  header: {
    width: '100%',
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    padding: '0 50px 0 50px',
  },
  logo: {
    width: '50px !important',
    height: '50px !important',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  containerHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
});
export default function Header() {
  const { header, logo, containerHeader } = styles();
  const { dataCompany, load } = useContext(dataCompanyContext);
  
  return (
    <>
      <header
        style={{ background: dataCompany.backgroundColor }}
        className={header}
      >
        {load ? (
          <Skeleton
            active
            avatar
            paragraph={{
              rows: 0,
              width: '100%',
            }}
          ></Skeleton>
        ) : (
          <Row className={containerHeader}>
            <Col>
              <Row
                style={{ alignItems: 'center', gap: '20px', height: '100%' }}
              >
                <Image
                  className={logo}
                  src={dataCompany.imgProfile}
                  alt=""
                ></Image>
                <Typography.Title style={{ color: '#fff' }} level={4}>
                  {dataCompany.name_company}
                </Typography.Title>
              </Row>
            </Col>
            <Col>
              <Row
                style={{ alignItems: 'center', gap: '20px', height: '100%' }}
              >
                <Link to={'#'}>
                  <Typography.Title level={4} style={{ color: '#fff' }}>
                    Meus pedidos
                  </Typography.Title>
                </Link>
                <Button
                  style={{
                    display: 'flex',
                    alignContent: 'center',
                    gap: '10px',
                  }}
                >
                  <FiHelpCircle color="#000"></FiHelpCircle>
                  <Typography.Text> Ajuda</Typography.Text>
                </Button>
              </Row>
            </Col>
          </Row>
        )}
      </header>
    </>
  );
}
