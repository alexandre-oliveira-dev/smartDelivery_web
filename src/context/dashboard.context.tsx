import React, { createContext, useEffect, useState } from "react";
import { api } from "../services/api";

export interface ContextTypes {
  asUser?: any;
  setFileProfile?: any;
  fileProfile?: string;
  corNavPrev?: string;
  setCorNav?: any;
}
export const DashContext = createContext<ContextTypes>({
  asUser: {},
  fileProfile: "",
  setFileProfile: "",
  corNavPrev: "",
  setCorNav: "",
});

export function DashProvider({ children }: any) {
  const [asUser, setAsUser] = useState(JSON.parse(localStorage.getItem("@sessionDelivery") as any));
  const [fileProfile, setFileProfile] = useState("");
  const [corNavPrev, setCorNav] = useState("");

  useEffect(() => {
    setAsUser(JSON.parse(localStorage.getItem("@sessionDelivery") as any));
    async function loadDataUser() {
      await api
        .get(`/find/${asUser.name_company}`)
        .then((response) =>{ 
          setCorNav(response.data[0].backgroundColor)})
        .catch((err) => console.log(err));
    }
    loadDataUser();
  }, [asUser.name_company]);

  return (
    <DashContext.Provider value={{ asUser, fileProfile, setFileProfile, corNavPrev, setCorNav}}>
      {children}
    </DashContext.Provider>
  );
}
