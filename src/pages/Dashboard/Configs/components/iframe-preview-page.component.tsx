import React, { useContext } from 'react';
import { DashContext } from '../../../../context/dashboard.context';
import { Link } from 'react-router-dom';
import { Col, Image, Row, Tag, Typography } from 'antd';

interface Params {
  color?: string | number;
  file?: string | ArrayBuffer | null;
}

export default function IframePreviewPageCompany({ color }: Params) {
  const { asUser, corNavPrev, fileProfile } = useContext(DashContext);

  console.log(
    '🚀 ~ file: iframe-preview-page.component.tsx:87 ~ IframePreviewPageCompany ~ asUser.name_company?.trim():',
    asUser.name_company?.replace(/\s+/g, '')
  );

  return (
    <>
      <header
        style={{
          background: !color ? '#5b72f2' : color,
          width: '100%',
          height: '60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingLeft: '20px',
          paddingRight: '20px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <Image
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
            }}
            src={fileProfile ? fileProfile : 'https://via.placeholder.com/150'}
            alt=""
          ></Image>
          <h4 style={{ color: '#fff' }}>{asUser.name_company}</h4>
        </div>
        <div
          style={{
            color: '#fff',
            display: 'flex',
            gap: '20px',
            fontSize: '13px',
          }}
        >
          <p>Meus pedidos</p>
          <p>Ajuda</p>
        </div>
      </header>
      <div
        style={{
          width: '100%',
          height: '100px',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Col>
          <Link
            type="primary"
            style={{
              width: 'auto',
              height: 'auto',
              color: corNavPrev,
              borderRadius: '10px',
              display: 'grid',
              placeItems: 'center',
              textDecoration: 'underline',
            }}
            to={`/${asUser.name_company}`}
            target="_blank"
          >
            <Row style={{ marginTop: '20px' }}>
              <Tag color="blue">
                <Typography.Title
                  copyable
                  level={5}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#47a1e6',
                  }}
                >
                  www.smartdelivery.com/
                  {asUser.name_company}
                </Typography.Title>
              </Tag>
            </Row>
          </Link>
        </Col>
      </div>
    </>
  );
}
