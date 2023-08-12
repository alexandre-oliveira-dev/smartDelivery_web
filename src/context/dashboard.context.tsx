import React, {
  SetStateAction,
  createContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { api } from '../services/api';
import { RegisterValues } from '../pages/Register';

export interface AsUserPropsTypes {
  backgroundColor: string;
  companyId: string;
  email: string;
  id: string;
  imgProfile: string;
  name_company: string;
  Menu: [
    {
      id: string;
      title: string;
      categoria: string;
      price: string;
      weight: string;
      description: string;
      amount: string;
    }
  ];
  payments_methods?: string[];
  phone?: string;
  daysOfWeeks?: [{ day: string; open: string; close: string }];
}

export interface ContextTypes {
  setFileProfile: React.Dispatch<SetStateAction<string | ArrayBuffer | null>>;
  setCorNav: React.Dispatch<SetStateAction<string>>;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  setOpenModalEdititem: React.Dispatch<SetStateAction<boolean>>;
  setOpenModalConfirmPassword: React.Dispatch<SetStateAction<boolean>>;
  setOpenModalDetailsOrders: React.Dispatch<SetStateAction<boolean>>;
  setWarnigsOrderFinished: React.Dispatch<SetStateAction<boolean>>;
  setSearchParam: React.Dispatch<SetStateAction<string | null>>;
  setPasswordCript: React.Dispatch<SetStateAction<string | null>>;
  setLoadTables: React.Dispatch<SetStateAction<boolean>>;
  asUser: AsUserPropsTypes;
  fileProfile: string;
  corNavPrev: string;
  openModal: boolean;
  openModalConfirmPassword: boolean;
  openModalEditItem: boolean;
  openModalWarnigsOrderFinished: boolean;
  openModalDetailsOrders: boolean;
  load: boolean;
  loadTables: boolean;
  dataCardapio: [];
  dataCompany: RegisterValues;
  dataOrders: [];
  dataOrdersFinished: any[];
  searchParam: string | null;
  passwordCript: string | null;
}
export const DashContext = createContext<ContextTypes>({} as ContextTypes);

export function DashProvider({ children }: any) {
  const [asUser, setAsUser] = useState(
    JSON.parse(localStorage.getItem('@sessionDelivery') as string)
  );
  const [fileProfile, setFileProfile] = useState(asUser?.imgProfile);
  const [corNavPrev, setCorNav] = useState('');
  const [searchParam, setSearchParam] = useState<string | null>('');
  const [passwordCript, setPasswordCript] = useState<string | null>('');
  const [load, setLoad] = useState(false);
  const [loadTables, setLoadTables] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetailsOrders, setOpenModalDetailsOrders] = useState(false);
  const [openModalConfirmPassword, setOpenModalConfirmPassword] =
    useState(false);
  const [openModalEditItem, setOpenModalEdititem] = useState(false);
  const [openModalWarnigsOrderFinished, setWarnigsOrderFinished] =
    useState(false);
  const [dataCardapio, setDataCardapio] = useState<[]>([]);
  const [dataOrders, setDataOrders] = useState<[]>([]);
  const [dataOrdersFinished, setDataOrdersFinished] = useState<[]>([]);
  const [dataCompany, setDataCompany] = useState({} as RegisterValues);

  const params = new URLSearchParams(window.location.search);

  useMemo(() => {
    setLoad(true);
    setAsUser(JSON.parse(localStorage.getItem('@sessionDelivery') as any));
    setCorNav(asUser?.backgroundColor);
    setFileProfile(asUser?.imgProfile);
    setLoad(false);
  }, [asUser?.backgroundColor, asUser?.imgProfile]);

  useEffect(() => {
    setLoadTables(true);
    async function LoadDatacardapioByParamvoid() {
      await api
        .get(
          `/getallmenu/${asUser?.companyId}?param=${
            params.get('item') ?? ''
          }&take=${params.get('take') ?? 100}&skip=${params.get('skip') ?? 0}`
        )
        .then((data) => {
          setDataCardapio(data.data);
        })
        .catch(() => setLoadTables(false));
    }

    async function LoadOrdersFinished() {
      await api
        .get(`/ordersFinished?companyId=${asUser?.companyId}`)
        .then((data) => {
          setDataOrdersFinished(data.data);
        });
    }

    async function LoadOrders() {
      await api
        .get(`/findorders?companiesId=${asUser?.companyId}`)
        .then((data) => {
          setDataOrders(data.data);
        });
    }
    async function LoadDataCompany() {
      await api.get(`/find/${asUser?.companyId}`).then((data) => {
        setDataCompany(data.data);
      });
    }

    Promise.all([
      LoadOrders(),
      LoadDatacardapioByParamvoid(),
      LoadOrdersFinished(),
      LoadDataCompany(),
    ]).finally(() => setLoadTables(false));
  }, [asUser?.companyId, params.get('item')]);

  return (
    <DashContext.Provider
      value={{
        asUser,
        fileProfile,
        setFileProfile,
        corNavPrev,
        setCorNav,
        openModal,
        setOpenModal,
        load,
        dataCardapio,
        searchParam,
        setSearchParam,
        loadTables,
        setLoadTables,
        dataOrders,
        dataOrdersFinished,
        openModalWarnigsOrderFinished,
        setWarnigsOrderFinished,
        openModalEditItem,
        setOpenModalEdititem,
        dataCompany,
        passwordCript,
        setPasswordCript,
        openModalConfirmPassword,
        setOpenModalConfirmPassword,
        openModalDetailsOrders,
        setOpenModalDetailsOrders,
      }}
    >
      {children}
    </DashContext.Provider>
  );
}
