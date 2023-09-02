/* eslint-disable @typescript-eslint/no-explicit-any */
// types.ts

// Enums
export enum OrdersStatus {
  Finalizado = 'finalizado',
  Entrega = 'entrega',
  Cancelado = 'cancelado',
  Preparando = 'preparando',
}

// Interfaces
export interface Companies {
  id: string;
  name_company: string;
  cnpj?: string;
  payments_methods: string[];
  imgProfile?: string;
  isSubscriber: boolean;
  phone: string;
  email: string;
  password: string;
  address: string;
  created_at: Date;
  backgroundColor?: string;
  pixKey?: string;
  pixType?: string;
  daysOfWeeks: any[];
  Menu: MenuOfCompanies[];
  Orders: Orders[];
}

export interface MenuOfCompanies {
  id: string;
  title: string;
  categoria?: string;
  price: string;
  weight?: string;
  amount?: string;
  companiesId: string;
  created_at: Date;
  description: string;
  dataCompanies: Companies;
}

export interface Clients {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: Date;
  Orders: Orders[];
}

export interface Orders {
  id: string;
  amount: string;
  payment_method: string;
  created_at: Date;
  companiesId: string;
  clientsId: string;
  address: string;
  amoutMoney: string;
  status: OrdersStatus;
  order: any[];
  paymentVoucher?: string;
  client: Clients;
  dataCompanies: Companies;
}

export interface Session {
  id: string;
  email: string;
  name_company?: string;
  companyId?: string;
  backgroundColor?: string;
  imgProfile?: string;
  created_at: Date;
}

export interface OrdersFinished {
  id: string;
  date: string;
  amountOrders: number;
  amountValue: number;
  companyId: string;
  created_at: Date;
}
