import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { UsersProvider } from "./contexts/UsersContext";
import { QuestionsProvider } from "./contexts/QuestionsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <QuestionsProvider>
    <UsersProvider>
      <App />
    </UsersProvider>
  </QuestionsProvider>
);
