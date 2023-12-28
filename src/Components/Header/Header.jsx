import React from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import Dogs from "../../Assets/dogs.svg?react";
import { UserContext } from "../../UserContext";

const Header = () => {
  const { data } = React.useContext(UserContext);

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        {/* O <Link> é um elemento que permite ao usuário navegar para outra página clicando ou tocando nela. Em react-router-dom, o <Link> renderiza um elemento <a> acessível com um "href" que aponta para o recurso ao qual está vinculado. */}
        <Link className={styles.logo} to="/" aria-label="Dogs | Home">
          <Dogs />
        </Link>
        {data ? (
          <Link className={styles.login} to="/conta">
            {data.nome}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
