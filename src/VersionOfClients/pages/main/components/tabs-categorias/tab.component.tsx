import React, { useContext, useState } from 'react';
import { dataCompanyContext } from '../../../../contexts/dataCompany.context';
import { createUseStyles } from 'react-jss';
import { Col, Row, Typography } from 'antd';

const style = createUseStyles({
  tab: {
    width: '100%',
    height: '60px',
    background: '#fff',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '10px 0 10px 0',
  },
  btntab: {
    background: 'transparent',
    border: '0',
    fontWeight: '400',
    fontSize: '17px',
    boxShadow: 'none',
    color: '#121212',
    textTransform: 'capitalize',
  },
});

export default function Tab() {
  const { dataCompany, current, setCurrent } = useContext(dataCompanyContext);
  const { tab, btntab } = style();
  const cat = dataCompany?.Menu?.map(
    (item: { categoria: string }) => item.categoria
  ) as [];

  return (
    <>
      <Row className={tab}>
        {cat
          ?.filter((item, index) => {
            return cat.indexOf(item) === index;
          })
          .map((item: any, index) => {
            return (
              <>
                <Col key={index}>
                  <button
                    className={btntab}
                    onClick={() => {
                      setCurrent({ item: item, index: index });
                    }}
                  >
                    <Typography.Text>{item}</Typography.Text>
                  </button>
                  <span
                    style={
                      current.index === index
                        ? {
                            background: dataCompany.backgroundColor,
                            height: '2px',
                            display: 'grid',
                            placeItems: 'center',
                            transition: '0.3s ease',
                          }
                        : { color: dataCompany.backgroundColor }
                    }
                  ></span>
                </Col>
              </>
            );
          })}
      </Row>
    </>
  );
}
