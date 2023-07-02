import React, { SetStateAction, createContext, useMemo, useState,useEffect } from "react";
import { api } from "../services/api";

export interface ContextTypes {
  asUser?: any;
  setFileProfile?: any;
  fileProfile?: string;
  corNavPrev?: string;
  setCorNav?: any;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
  load: boolean;
  dataCardapio: []
}
export const DashContext = createContext<ContextTypes>({
  asUser: null,
  fileProfile: "",
  setFileProfile: "",
  corNavPrev: "",
  setCorNav: "",
  setOpenModal: (prevState) => prevState,
  openModal: false,
  load: false,
  dataCardapio:[]
});

export function DashProvider({ children }: any) {
  const [asUser, setAsUser] = useState(JSON.parse(localStorage.getItem("@sessionDelivery") as any));
  const [fileProfile, setFileProfile] = useState("");
  const [corNavPrev, setCorNav] = useState("");
  const [load, setLoad] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [dataCardapio, setDataCardapio] = useState<[]>([]);

  useMemo(() => {
    setAsUser(JSON.parse(localStorage.getItem("@sessionDelivery") as any));
    setCorNav(asUser?.backgroundColor);
  }, [asUser?.backgroundColor]);

  useEffect(()=>{
    async function LoadDatacardapio(){
      setLoad(true)
      await api.get(`/getallmenu/${asUser?.companyId}`)
      .then((data)=>{
        setLoad(false)
        setDataCardapio(data.data)
      })
    }
    LoadDatacardapio();
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
        dataCardapio
      }}
    >
      {children}
    </DashContext.Provider>
  );
}
