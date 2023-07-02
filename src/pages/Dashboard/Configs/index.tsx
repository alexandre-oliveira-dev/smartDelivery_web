import React from "react";
import { DashProvider } from "../../../context/dashboard.context";
import Config from "./components/config.component";


export default function ConfigComponent(){
    return(
        <DashProvider>
            <Config></Config>
        </DashProvider>
    )
}