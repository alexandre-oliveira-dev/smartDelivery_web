import { Row } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
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
  companyId: string;
  type?: string;
}

export default function BtnAddAmountItem({
  item,
  companyId,
  index,
}: ItemParams) {
  const { dataCompany, setDataCart } = useContext(dataCompanyContext);
  const { btnamount } = style();
  const dispatch = useDispatch();
  const [amountnumber, setAmountnumber] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('@cart') as string) || [];
    setAmountnumber(
      items
        .filter((it: any) => it.id === item.id)
        .map((i: any) => i.order[0].qtd)
    );
    setDataCart(items);
  }, [handleAddItem]);

  function handleAddItem() {
    dispatch({
      type: 'ADD_ITEM',
      item,
      index,
      companyId,
    });
  }
  function handleRemoveItem() {
    dispatch({
      type: 'REMOVE_ITEM',
      item,
      index,
      companyId,
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
          onClick={handleRemoveItem}
        >
          -
        </button>
        {amountnumber}
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
