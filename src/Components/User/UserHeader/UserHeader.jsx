import React from "react";
import UserHeaderNav from "../UserHeaderNav/UserHeaderNav";
import styles from "./UserHeader.module.css";
import { useLocation } from "react-router-dom";

const UserHeader = () => {
  const [title, setTitle] = React.useState("");

  // O useLocation() é um Hooker do react-router-dom
  const location = useLocation();

  // O useEffect() tem como dependência o location, portanto sempre que o pathname mudar, o título do site também vai alterar
  React.useEffect(() => {
    const { pathname } = location;

    switch (pathname) {
      case "/conta/postar":
        setTitle("Poste sua foto");
        break;
      case "/conta/estatisticas":
        setTitle("Estatísticas");
        break;
      default:
        setTitle("Minha conta");
    }
  }, [location]);

  return (
    <header className={styles.header}>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </header>
  );
};

export default UserHeader;
