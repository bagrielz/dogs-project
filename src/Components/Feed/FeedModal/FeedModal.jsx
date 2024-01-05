import React from "react";
import styles from "./FeedModal.module.css";
import useFetch from "../../../Hooks/useFetch";
import Error from "../../Helper/Error";
import Loading from "../../Helper/Loading";
import { PHOTO_GET } from "../../../api";
import { PhotoContent } from "../../Photo/PhotoContent/PhotoContent";

const FeedModal = ({ photo, setModalPhoto }) => {
  // Realiza o request novamente para puxar os comentários
  const { data, error, loading, request } = useFetch();

  // Esse efeito ocorrerá sempre que o modal for aberto
  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  function handleOutsideClick({ target, currentTarget }) {
    if (target === currentTarget) setModalPhoto(null);
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
