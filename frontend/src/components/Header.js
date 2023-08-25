import React, { useEffect, useState } from "react";
import logoMesto from "../images/logo-image.svg";
import { useLocation, Link, useNavigate } from "react-router-dom";

function Header({ email, signOut }) {
  const location = useLocation();
  const [headerLink, setHeaderLink] = useState({
    linkName: "Выход",
    pathLink: "/signin",
  });

  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isButtonEntered, setIsButtonEntrened] = useState(false);

  useEffect(() => {
    if (location) {
      if (location.pathname === "/signin") {
        setHeaderLink({ linkName: "Регистрация", pathLink: "/signup" });
        setIsNavExpanded(false);
        setIsButtonEntrened(false);
      }
      if (location.pathname === "/signup") {
        setHeaderLink({ linkName: "Войти", pathLink: "/signin" });
        setIsNavExpanded(false);
        setIsButtonEntrened(false);
      }
      if (location.pathname === "/") {
        setHeaderLink({ linkName: "Выход", pathLink: "/signin" });
        setIsButtonEntrened(true);
      }
    }
  }, [location]);

  return (
    <header className="header">
      <div
        className={`header__hamburger-menu ${
          isNavExpanded ? "header__hamburger-menu_open" : ""
        }`}
      >
        <p className="header__email">{email}</p>
        <Link
          onClick={signOut}
          className="header__link"
          to={headerLink.pathLink}
        >
          {headerLink.linkName}
        </Link>
      </div>
      <div className="header__main">
        <img src={logoMesto} alt="логотип" className="header__logo" />
        <button
          className={`header__hamburger-button ${
            isButtonEntered ? "header__hamburger-button_entered" : ""
          } ${isNavExpanded ? "header__hamburger-button_close" : ""}`}
          type="button"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
        />
        <div
          className={`${
            !isButtonEntered ? "header__overlay" : "header__overlay_invisible"
          }`}
        >
          <p className="header__email">{email}</p>
          <Link
            onClick={signOut}
            className="header__link header__link_original"
            to={headerLink.pathLink}
          >
            {headerLink.linkName}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
