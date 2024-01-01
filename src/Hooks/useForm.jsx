import React from "react";

// Esse objeto contém todos os itens para validação
const types = {
  email: {
    regex:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Preencha um e-mail válido",
  },
  number: {
    regex: /^\d+$/,
    message: "Utilize apenas números",
  },
};

// O "type" recebe o tipo de formulário
const useForm = (type) => {
  // Valor inicial e valor setado
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  // Função para validar os campos
  function validate(value) {
    // Verifica se o "type" foi definido ou não
    if (type === false) return true;

    // Validação dos erros
    if (value.length === 0) {
      // Verifica se tem algo escrito no "value", senão retorna uma mensagem de erro
      setError("Preencha um valor");
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      // Verifica o tipo de dado/informação passado no campo, senão retorna uma mensagem de erro
      setError(types[type].message);
      return false;
    } else {
      // Caso não tenha nenhum dos erros acima
      setError(null);
      return true;
    }
  }

  // Função para mudar o estado do formulário
  function onChange({ target }) {
    // Essa verificação ativa o validate() após digitar o dado e tirar o foco do input, evitando mostrar a mensagem de erro enquanto digita
    if (error) validate(target.value);
    setValue(target.value);
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
