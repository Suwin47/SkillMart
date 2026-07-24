import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App";
import "./index.css";

import AuthProvider from "./context/AuthContext";
import NotificationProvider from "./context/NotificationContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <NotificationProvider>
        <App />
      

      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={10}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#fff",
            color: "#0f172a",
            fontSize: "15px",
            padding: "14px 18px",
          },

          success: {
            iconTheme: {
              primary: "#16a34a",
              secondary: "#fff",
            },
          },

          error: {
            iconTheme: {
              primary: "#dc2626",
              secondary: "#fff",
            },
          },
        }}
      />
</NotificationProvider>
    </AuthProvider>
  </React.StrictMode>
);