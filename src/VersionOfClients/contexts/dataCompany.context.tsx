import React, {
  useState,
  createContext,
  useEffect,
  SetStateAction,
} from 'react';
import { AsUserPropsTypes } from '../../context/dashboard.context';
import { api } from '../../services/api';
import { useParams } from 'react-router-dom';

interface PropsOfCompanys {
  dataCompany: AsUserPropsTypes;
  setLoad: React.Dispatch<SetStateAction<boolean>>;
  load: boolean;
}
interface UrlParams {
  name_company: string;
}

export const dataCompanyContext = createContext({} as PropsOfCompanys);

export function DataCompanyContextProvider({ children }: any) {
  const [dataCompany, setDataCompany] = useState<AsUserPropsTypes>(
    {} as AsUserPropsTypes
  );
  const [load, setLoad] = useState(false);
  const { name_company } = useParams<UrlParams>();

  useEffect(() => {
    setLoad(true);
    async function LoadDataCompany() {
      await api
        .get(`/findbyname/${name_company?.toLowerCase()}`)
        .then((data) => {
          setDataCompany(data.data);
        });
    }

    Promise.all([LoadDataCompany()]).finally(() => {
      setLoad(false);
    });
  }, []);

  return (
    <dataCompanyContext.Provider
      value={{
        dataCompany,
        load,
        setLoad,
      }}
    >
      {children}
    </dataCompanyContext.Provider>
  );
}
