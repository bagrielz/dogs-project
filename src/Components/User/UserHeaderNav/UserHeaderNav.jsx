import React from "react";
import { UserContext } from "../../../UserContext";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./UserHeaderNav.module.css";
import useMedia from "../../../Hooks/useMedia";

import MinhasFotos from "../../../Assets/feed.svg?react";
import Estatisticas from "../../../Assets/estatisticas.svg?react";
import AdicionarFoto from "../../../Assets/adicionar.svg?react";
import Sair from "../../../Assets/sair.svg?react";

const UserHeaderNav = () => {
  const { userLogout } = React.useContext(UserContext);
  const navigate = useNavigate();
  const mobile = useMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  function handleLogout() {
    userLogout();
    navigate("/login");
  }

  const { pathname } = useLocation();
  // Esse efeito ocorre quando clicamos em um link do menu mobile que por consequência, altera o caminho da página, fazendo com que o menu seja fechado
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {/* Esse elemento será ativado quando o tamanho da tela estiver menos que 40rem */}
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/conta" end>
          <MinhasFotos />
          {mobile && "Minhas fotos"}
        </NavLink>
        <NavLink to="/conta/estatisticas">
          <Estatisticas />
          {mobile && "Estatísticas"}
        </NavLink>
        <NavLink to="/conta/postar">
          <AdicionarFoto />
          {mobile && "Adicionar foto"}
        </NavLink>

        <button onClick={handleLogout}>
          <Sair />
          {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
};

export default UserHeaderNav;
