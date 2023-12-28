import React from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./api";
import { useNavigate } from "react-router-dom";

// O UserContext vai nos permitir ter acesso as informações do usuário de forma global, compartilhar um valor sem utilizar propriedades
export const UserContext = React.createContext();

// Essa função é o elemento que precisa envolver todos os outros elementos que terão acesso ao UserContext
export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  // Método para deslogar o usuário
  const userLogout = React.useCallback(async function () {
    // Resetar tudo para o valor inicial
    setData(null);
    setError(null);
    setLoading(false);
    setLogin(false);
    window.localStorage.removeItem("token");
  }, []);

  // Método para puxar os dados do usuário
  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();

    // Com os dados do usuário, o método setData() é ativado passando o json como argumento
    setData(json);
    // O login do usuário é validado pelo método setLogin()
    setLogin(true);
    console.log(json);
  }

  // Método para logar o usuário
  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);

      const { url, options } = TOKEN_POST({ username, password });
      const response = await fetch(url, options);
      if (!response.ok) throw new Error(`Error: Usuário não encontrado`);
      const { token } = await response.json();

      window.localStorage.setItem("token", token);
      // Com o token do usuário, pegamos os dados do mesmo através do getUser()
      await getUser(token);
      navigate("/conta");
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useState(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem("token");

      if (token) {
        try {
          // Quando iniciar o login, o setError() vai limpar/resetar os erros e o setLoading() ativa o carregamento do login
          setError(null);
          setLoading(true);

          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error("Token inválido");

          // Executa o getUser() para puxar os dados do usuário
          await getUser(token);
        } catch (err) {
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        // Senão tiver token, o login será setado como falso
        setLogin(false);
      }
    }

    autoLogin();
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
