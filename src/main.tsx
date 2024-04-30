import React from "react";
import ReactDOM from "react-dom/client";
import MainApp from "./App.tsx";
// import reportWebVitals from './reportWebVitals';
import "./default.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
