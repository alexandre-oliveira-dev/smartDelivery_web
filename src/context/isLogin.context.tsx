import React, {createContext,useEffect,useState} from 'react'

export const IsLoginContext = createContext<any>({})

export function LoginContext({children}:any){

    const [asUser,setAsUser] = useState()

    useEffect(()=>{
        setAsUser(JSON.parse((localStorage.getItem('@sessionDelivery') as any)))
    },[])

    return(
        <IsLoginContext.Provider value={{asUser}}>
            {children}
        </IsLoginContext.Provider>
    )
}