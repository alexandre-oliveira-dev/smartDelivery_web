import React, {
  SetStateAction,
  createContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { api } from '../services/api';
import { RegisterValues } from '../pages/Register';

export interface ContextTypes {
  asUser?: any;
  setFileProfile?: any;
  fileProfile: string;
  corNavPrev?: string;
  setCorNav?: any;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  setOpenModalEdititem: React.Dispatch<SetStateAction<boolean>>;
  setWarnigsOrderFinished: React.Dispatch<SetStateAction<boolean>>;
  setSearchParam: React.Dispatch<SetStateAction<string | null>>;
  openModal: boolean;
  openModalEditItem: boolean;
  openModalWarnigsOrderFinished: boolean;
  load: boolean;
  loadTables: boolean;
  dataCardapio: [];
  dataCompany: RegisterValues;
  dataOrders: [];
  dataOrdersFinished: [];
  searchParam: string | null;
  setLoadTables: React.Dispatch<SetStateAction<boolean>>;
}
export const DashContext = createContext<ContextTypes>({} as ContextTypes);

export function DashProvider({ children }: any) {
  const [asUser, setAsUser] = useState(
    JSON.parse(localStorage.getItem('@sessionDelivery') as any)
  );
  const [fileProfile, setFileProfile] = useState<string>(asUser?.imgProfile);
  const [corNavPrev, setCorNav] = useState('');
  const [searchParam, setSearchParam] = useState<string | null>('');
  const [load, setLoad] = useState(false);
  const [loadTables, setLoadTables] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEditItem, setOpenModalEdititem] = useState(false);
  const [openModalWarnigsOrderFinished, setWarnigsOrderFinished] =
    useState(false);
  const [dataCardapio, setDataCardapio] = useState<[]>([]);
  const [dataOrders, setDataOrders] = useState<[]>([]);
  const [dataOrdersFinished, setDataOrdersFinished] = useState<[]>([]);
  const [dataCompany, setDataCompany] = useState<RegisterValues>(
    {} as RegisterValues
  );

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
      }}
    >
      {children}
    </DashContext.Provider>
  );
}
