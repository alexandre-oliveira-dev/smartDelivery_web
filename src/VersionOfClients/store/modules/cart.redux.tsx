import { produce } from 'immer';
import { ItemParams } from '../../pages/main/components/btn-addAmount-item.component';
import { AnyAction } from '@reduxjs/toolkit';

export interface OrdersParams {
  amount: number;
  payment_method: string;
  status: string;
  order: [
    {
      item: string;
      qtd: number;
    }
  ];
  amoutMoney: number;
  address: string;
  companyId: string;
  id: string;
  companyMenu?: [];
}

export default function Cart(
  state: OrdersParams[] = [],
  action: ItemParams | AnyAction
) {
  const order: OrdersParams = {
    order: [
      {
        item: action.item?.title,
        qtd: 0,
      },
    ],
    address: '',
    amount: Number(action?.item?.amount),
    amoutMoney: parseFloat(action?.item?.price),
    companyId: action?.companyId,
    payment_method: '',
    status: '',
    id: action?.item?.id,
  };
  const localstorage: OrdersParams[] =
    JSON.parse(localStorage.getItem('@cart') as string) || [];

  switch (action.type) {
    case 'ADD_ITEM': {
      if (!localstorage.some((item) => item.id === action.item.id)) {
        localstorage.push(order);
        localStorage.setItem('@cart', JSON.stringify(localstorage));
      }

      return produce(localstorage, (draft) => {
        const itemindex = draft.findIndex(
          (data) => data?.id === action.item.id
        );

        draft[itemindex].order[0].qtd += 1;
        draft[itemindex].amoutMoney =
          parseFloat(action.item.price) * draft[itemindex].order[0].qtd;

        localStorage.setItem('@cart', JSON.stringify(draft));
      });
    }
    case 'REMOVE_ITEM': {
      if (!localstorage.some((item) => item.id === action.item.id)) {
        return [];
      }

      return produce(localstorage, (draft) => {
        const itemindex = draft.findIndex(
          (data) => data?.id === action.item.id
        );
        if (draft[itemindex].order[0].qtd === 1) {
          const newList = localstorage.filter(
            (item) => item.id !== draft[itemindex].id
          );
          localStorage.setItem('@cart', JSON.stringify(newList));
          return;
        }

        draft[itemindex].order[0].qtd -= 1;
        draft[itemindex].amoutMoney =
          parseFloat(action.item.price) * draft[itemindex].order[0].qtd;

        localStorage.setItem('@cart', JSON.stringify(draft));
      });
    }
    default:
      return state;
  }
}
