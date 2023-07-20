import { Row } from 'antd';
import React, { useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { dataCompanyContext } from '../../../contexts/dataCompany.context';
const { useDispatch } = require('react-redux');

const style = createUseStyles({
  btnamount: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center',
    color: '#fff',
  },
});

export interface ItemParams {
  item: {
    id: string;
    title: string;
    categoria: string;
    price: string;
    weight: string;
    description: string;
    amount: string;
  };
  index: number;
}

export default function BtnAddAmountItem({ item, index }: ItemParams) {
  const { dataCompany } = useContext(dataCompanyContext);
  const { btnamount } = style();
  const dispatch = useDispatch();

  function handleAddItem() {
    if (!JSON.parse(localStorage.getItem('@Order') as any)) {
      localStorage.setItem(
        '@Order',
        JSON.stringify({
          companiesId: dataCompany?.companyId,
          address: '',
          amount: 1,
          amoutMoney: 0,
          payment_method: '',
          status: '',
          order: [
            {
              item: '',
              qtd: 0,
            },
          ],
        })
      );
    }
    dispatch({
      type: 'ADD_ITEM',
      item: item,
      index,
      companyId: dataCompany?.companyId,
    });
  }

  return (
    <>
      <Row
        style={{
          gap: '5px',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        <button
          className={btnamount}
          style={{ background: dataCompany?.backgroundColor }}
        >
          -
        </button>
        0
        <button
          onClick={handleAddItem}
          className={btnamount}
          style={{ background: dataCompany?.backgroundColor }}
        >
          +
        </button>
      </Row>
    </>
  );
}
