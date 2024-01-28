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
import Photo from "./Components/Photo/Photo";
import UserProfile from "./Components/User/UserProfile";
import NotFound from "./Components/NotFound/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserStorage>
          <Header />
          <main className="AppBody">
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
              <Route path="foto/:id" element={<Photo />} />
              <Route path="perfil/:user" element={<UserProfile />} />
              {/* Qualquer rota que não seja uma das mencionadas acima, mostre o erro de página não encontrada */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </UserStorage>
      </BrowserRouter>
    </div>
  );
}

export default App;
