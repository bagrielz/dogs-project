import React from "react";

const useFetch = () => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  // Essa função é criada dentro do useCallback(), para evitar que ela seja recriada toda vez que usarmos o useFetch()
  const request = React.useCallback(async (url, options) => {
    let response;
    let json;

    try {
      setError(null);
      setLoading(true);

      response = await fetch(url, options);
      json = await response.json();

      // Verifica se a requisição é igual a falso, se for, será setado o erro
      if (response.ok === false) throw new Error(json.message);
    } catch (err) {
      // Caso exista algum erro, o json será setado como null
      json = null;

      // Aqui é definido o erro e apresentado ao usuário
      setError(err.message);
    } finally {
      setData(json);
      setLoading(false);

      return { response, json };
    }
  }, []);

  return {
    data,
    loading,
    error,
    request,
  };
};

export default useFetch;
