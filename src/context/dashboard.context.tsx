import React, { createContext, useEffect, useState } from "react";


export interface ContextTypes {
  asUser: any ;
}
export const DashContext = createContext<ContextTypes>({asUser:{} });

export function DashProvider({ children }: any) {
  const [asUser, setAsUser] = useState(JSON.parse(localStorage.getItem("@sessionDelivery") as any));

  useEffect(() => {
    setAsUser(JSON.parse(localStorage.getItem("@sessionDelivery") as any));
  }, []);


  return (
    <DashContext.Provider
      value={{ asUser}}
    >
      {children}
    </DashContext.Provider>
  );
}

