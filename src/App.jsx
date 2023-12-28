import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Componentes
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

// Elementos
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login/Login";
import { UserStorage } from "./UserContext";
import ProtectedRoute from "./Components/Helper/ProtectedRoute";
import User from "./Components/User/User";

function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Quando há uma rota com sub-rotas, é necessário adicionar "/*" apontando que dentro de "/login" existem outras rotas também */}
            <Route path="login/*" element={<Login />} />
            <Route
              path="conta/*"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
