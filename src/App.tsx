import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterApp from "./services/router";
import { DashProvider } from "./context/dashboard.context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <DashProvider>
        <ToastContainer/>
          <BrowserRouter>
            <RouterApp></RouterApp>
          </BrowserRouter>
      </DashProvider>
    </div>
  );
}
export default App;
