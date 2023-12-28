import React from "react";
import { UserContext } from "../../UserContext";
import { Navigate } from "react-router-dom";

// Esse método tem como função proteger rotas internas do site. Mesmo escrevendo o endereço correto, se o usuário não estiver logado, o próprio será redirecionado à página de login
const ProtectedRoute = ({ children }) => {
  const { login } = React.useContext(UserContext);

  if (login === true) {
    return children;
  } else if (login === false) {
    return <Navigate to="/login" />;
  } else {
    return <></>;
  }
};

export default ProtectedRoute;
