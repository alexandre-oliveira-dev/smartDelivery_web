import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterApp from "./services/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
        <ToastContainer/>
          <BrowserRouter>
            <RouterApp></RouterApp>
          </BrowserRouter>
    </div>
  );
}
export default App;
