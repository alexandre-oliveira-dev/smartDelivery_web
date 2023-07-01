import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterApp from "./services/router";
import { DashProvider } from "./context/dashboard.context";

function App() {
  return (
    <div className="App">
     <DashProvider>
     <BrowserRouter>
        <RouterApp></RouterApp>
      </BrowserRouter>
     </DashProvider>
    </div>
  );
}
export default App;
