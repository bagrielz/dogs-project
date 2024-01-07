import React from "react";
import Send from "../../../Assets/enviar.svg?react";
import useFetch from "../../../Hooks/useFetch";
import Error from "../../Helper/Error";
import styles from "./PhotoCommentsForm.module.css";
import { COMMENT_POST } from "../../../api";

const PhotoCommentsForm = ({ id, setComments }) => {
  const [comment, setComment] = React.useState("");
  const { request, error } = useFetch();

  // Esse método realiza a postagem do comentário e atualiza de forma responsiva e mostra o novo comentário na tela juntamente aos antigos comentários já feitos
  async function handleSubmit(event) {
    event.preventDefault();

    const { url, options } = COMMENT_POST(id, { comment });
    const { response, json } = await request(url, options);

    if (response.ok) {
      // Limpa o campo do comentário
      setComment("");
      setComments((comments) => [...comments, json]);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.textarea}
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />

      <button className={styles.button}>
        <Send />
      </button>
      <Error error={error} />
    </form>
  );
};

export default PhotoCommentsForm;
