import React from "react";
import Input from "../Forms/Input/Input";
import Button from "../Forms/Button/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import { PASSWORD_LOST } from "../../api";

const LostPassword = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: window.location.href.replace("perdeu", "resetar"),
      });
      request(url, options);
    }
  }

  return (
    <section>
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input
            label="E-mail ou usuário"
            type="text"
            name="login"
            {...login}
          />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar e-mail</Button>
          )}
        </form>
      )}

      <Error error={error} />
    </section>
  );
};

export default LostPassword;
