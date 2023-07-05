import React, { SetStateAction, createContext, useMemo, useState, useEffect } from "react";
import { api } from "../services/api";

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
  searchParam: string | null;
  setLoadTables: React.Dispatch<SetStateAction<boolean>>;
}
export const DashContext = createContext<ContextTypes>({
  asUser: null,
  fileProfile: "",
  setFileProfile: "",
  corNavPrev: "",
  setCorNav: "",
  setOpenModal: (prevState) => prevState,
  setSearchParam: (prevState) => prevState,
  openModal: false,
  load: false,
  loadTables: false,
  dataCardapio: [],
  searchParam: "",
  setLoadTables: (prevState) => prevState,
  dataOrders:[]
});

export function DashProvider({ children }: any) {
  const [asUser, setAsUser] = useState(JSON.parse(localStorage.getItem("@sessionDelivery") as any));
  const [fileProfile, setFileProfile] = useState("");
  const [corNavPrev, setCorNav] = useState("");
  const [searchParam, setSearchParam] = useState<string | null>("");
  const [load, setLoad] = useState(false);
  const [loadTables, setLoadTables] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataCardapio, setDataCardapio] = useState<[]>([]);
  const [dataOrders, setDataOrders] = useState<[]>([]);

  const params = new URLSearchParams(window.location.search);

  useMemo(() => {
    setLoad(true);
    setAsUser(JSON.parse(localStorage.getItem("@sessionDelivery") as any));
    setCorNav(asUser?.backgroundColor);
    setLoad(false);
  }, [asUser?.backgroundColor]);

  useEffect(() => {
    async function LoadDatacardapioByParamvoid() {
      setLoadTables(true);
      await api
        .get(
          `/getallmenu/${asUser?.companyId}?param=${params.get("item") ?? ""}&take=${
            params.get("take") ?? 100
          }&skip=${params.get("skip") ?? 0}`
        )
        .then((data) => {
          setDataCardapio(data.data);
          setLoadTables(false);
        })
        .catch(() => setLoadTables(false));
    }
    LoadDatacardapioByParamvoid();
  }, [asUser?.companyId, params.get("item"), params.get("take"), params.get("skip")]);

  useEffect(()=>{
   async function LoadOrders(){
    await api.get(`/findorders?companiesId=${asUser?.companyId}`)
    .then((data)=>{
      setDataOrders(data.data)
    })
   }
   LoadOrders();
  },[asUser?.companyId])

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
        dataOrders
      }}
    >
      {children}
    </DashContext.Provider>
  );
}
