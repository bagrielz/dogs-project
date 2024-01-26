import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Form from "../Form/Form";
import CreateAccount from "../CreateAccount";
import LostPassword from "../LostPassword";
import ResetPassword from "../ResetPassword";
import { UserContext } from "../../../UserContext";
import styles from "./Login.module.css";
import NotFound from "../../NotFound/NotFound";

const Login = () => {
  // Sempre que o usuário estiver logado, a página de login será redirecionada à página de minha conta
  const { login } = React.useContext(UserContext);
  if (login === true) return <Navigate to="/conta" />;

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="criar" element={<CreateAccount />} />
          <Route path="perdeu" element={<LostPassword />} />
          <Route path="resetar" element={<ResetPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
