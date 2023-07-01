import React, { SetStateAction, createContext, useMemo, useState } from "react";

export interface ContextTypes {
  asUser?: any;
  setFileProfile?: any;
  fileProfile?: string;
  corNavPrev?: string;
  setCorNav?: any;
  setOpenModal: React.Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
  load: boolean;
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
});

export function DashProvider({ children }: any) {
  const [asUser, setAsUser] = useState(JSON.parse(localStorage.getItem("@sessionDelivery") as any));
  const [fileProfile, setFileProfile] = useState("");
  const [corNavPrev, setCorNav] = useState("");
  const [load, setLoad] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useMemo(() => {
    setAsUser(JSON.parse(localStorage.getItem("@sessionDelivery") as any));
    setCorNav(asUser?.backgroundColor);
  }, [asUser?.backgroundColor]);

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
      }}
    >
      {children}
    </DashContext.Provider>
  );
}
