import React from "react";
import { DashProvider } from "../../../context/dashboard.context";
import Faturamento from "./faturamento.component";

export default function FaturamentoComponent(){
    return(
        <DashProvider>
            <Faturamento></Faturamento>
        </DashProvider>
    )
}