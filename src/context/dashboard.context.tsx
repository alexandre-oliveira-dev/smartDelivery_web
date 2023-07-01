import React, { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { Spin } from "antd";

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
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setAsUser(JSON.parse(localStorage.getItem("@sessionDelivery") as any));
    async function loadDataUser() {
      setLoad(true)
      await api
      .get(`/find/${asUser?.name_company}`)
      .then((response) =>{ 
        setLoad(false)
        setCorNav(response.data[0].backgroundColor)})
        .catch((err) => {
          setLoad(false)
          console.log(err)});
      }
      loadDataUser();
  }, [asUser?.name_company]);

  return (
    <DashContext.Provider value={{ asUser, fileProfile, setFileProfile, corNavPrev, setCorNav}}>
      {!load ? children : <Spin size="large"
       style={{
        position:"absolute",
        top:"50%",
        left:'50%',
        transform:'translate(-50%,-50%)'
      }}></Spin>}
    </DashContext.Provider>
  );
}
