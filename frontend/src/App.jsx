// src/App.jsx
import { useState } from "react";
import AppRoutes from "./routes/AppRoutes";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </CartProvider>
  );
}

export default App;