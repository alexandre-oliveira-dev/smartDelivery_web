import React from "react";
import { BrowserRouter } from "react-router-dom";
import RouterApp from "./services/router";
import { DashProvider } from "./context/dashboard.context";

function App() {
  return (
    <DashProvider>
      <div className="App">
        <BrowserRouter>
          <RouterApp></RouterApp>
        </BrowserRouter>
      </div>
    </DashProvider>
  );
}
export default App;
