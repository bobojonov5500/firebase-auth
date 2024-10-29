import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth-context";
import { QueryClient, QueryClientProvider } from "react-query";

const query = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <QueryClientProvider client={query}>
        <App />
      </QueryClientProvider>
    </AuthProvider>
  </BrowserRouter>
);
