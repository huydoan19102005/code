import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

import CounterComponent from "./components/CounterComponent";
import LightSwitch from "./components/LightSwitch";
import LoginForm from "./components/LoginForm";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div style={{ minHeight: "100vh", transition: "all 0.3s ease" }} className="container my-4">
          <h2 className="mb-4">useContext Exercises</h2>
          <LoginForm />
          <CounterComponent />
          <LightSwitch />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}
