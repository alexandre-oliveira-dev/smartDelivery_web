import React from "react";
import { DashProvider } from "../../../context/dashboard.context";
import Dashboard from "./order.component";

export default function DashboardComponent(){
    return(
        <DashProvider>
            <Dashboard></Dashboard>
        </DashProvider>
    )
}