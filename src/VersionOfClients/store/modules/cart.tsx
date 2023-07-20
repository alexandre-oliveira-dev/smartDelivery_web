import { produce } from 'immer';

interface OrdersParams {
  amount: number;
  payment_method: string;
  status: string;
  order?: [
    {
      item: string;
      qtd: number;
    }
  ];
  amoutMoney: number;
  address: string;
  companiesId: string;
}

export default function Cart(state: any[] = [], action: any) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const localStorageOrder: any[] =
        JSON.parse(localStorage.getItem('@Order') as any) || [];

      return produce(localStorageOrder, (draft) => {
        // localStorage.setItem('@Order', JSON.stringify(draft));
        console.log(draft);
      });
    }
    default:
      return state;
  }
}
