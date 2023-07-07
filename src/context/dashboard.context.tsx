import React, {
  SetStateAction,
  createContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { api } from '../services/api';

export interface ContextTypes {
  asUser?: any;
  setFileProfile?: any;
  fileProfile?: string;
  corNavPrev?: string;
  setCorNav?: any;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  setSearchParam: React.Dispatch<SetStateAction<string | null>>;
  openModal: boolean;
  load: boolean;
  loadTables: boolean;
  dataCardapio: [];
  dataOrders: [];
  dataOrdersFinished: [];
  searchParam: string | null;
  setLoadTables: React.Dispatch<SetStateAction<boolean>>;
}
export const DashContext = createContext<ContextTypes>({
  asUser: null,
  fileProfile: '',
  setFileProfile: '',
  corNavPrev: '',
  setCorNav: '',
  setOpenModal: (prevState) => prevState,
  setSearchParam: (prevState) => prevState,
  openModal: false,
  load: false,
  loadTables: false,
  dataCardapio: [],
  searchParam: '',
  setLoadTables: (prevState) => prevState,
  dataOrders: [],
  dataOrdersFinished: [],
});

export function DashProvider({ children }: any) {
  const [asUser, setAsUser] = useState(
    JSON.parse(localStorage.getItem('@sessionDelivery') as any)
  );
  const [fileProfile, setFileProfile] = useState('');
  const [corNavPrev, setCorNav] = useState('');
  const [searchParam, setSearchParam] = useState<string | null>('');
  const [load, setLoad] = useState(false);
  const [loadTables, setLoadTables] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataCardapio, setDataCardapio] = useState<[]>([]);
  const [dataOrders, setDataOrders] = useState<[]>([]);
  const [dataOrdersFinished, setDataOrdersFinished] = useState<[]>([]);

  const params = new URLSearchParams(window.location.search);

  useMemo(() => {
    setLoad(true);
    setAsUser(JSON.parse(localStorage.getItem('@sessionDelivery') as any));
    setCorNav(asUser?.backgroundColor);
    setLoad(false);
  }, [asUser?.backgroundColor]);

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
      setLoadTables(true);
      await api.get(`/ordersFinished/${asUser?.companyId}`).then((data) => {
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

    Promise.all([
      LoadOrders(),
      LoadDatacardapioByParamvoid(),
      LoadOrdersFinished(),
    ]).finally(() => setLoadTables(false));
  }, [asUser?.companyId]);

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
      }}
    >
      {children}
    </DashContext.Provider>
  );
}
