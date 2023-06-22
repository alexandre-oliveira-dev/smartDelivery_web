import React, { createContext, useEffect, useState } from "react";


export interface ContextTypes {
  asUser: any | {};

}

export function LoginContext({ children }: any) {
  const [asUser, setAsUser] = useState();

  useEffect(() => {
    setAsUser(JSON.parse(localStorage.getItem("@sessionDelivery") as any));
  }, []);

  return (
    <IsLoginContext.Provider
      value={{ asUser}}
    >
      {children}
    </IsLoginContext.Provider>
  );
}

export const IsLoginContext = createContext<any>({});
