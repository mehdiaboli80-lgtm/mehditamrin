import { Link } from "react-router-dom";
import styled from "./navbar.module.css";
import { useContext, useState } from "react";
import { appcontext } from "../../App";

function Navbar() {
  const { isloggin, setIsloggin } = useContext(appcontext);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // وضعیت منو

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={styled.navbar}>
      <div className={styled.navHeader}>
        <div className={styled.logo}>
          <Link to="/" onClick={closeMenu}>🛍️ فروشگاه</Link>
        </div>

        {/* ===== دکمه همبرگر ===== */}
        <button className={styled.hamburger} onClick={toggleMenu}>
          <span className={styled.bar}></span>
          <span className={styled.bar}></span>
          <span className={styled.bar}></span>
        </button>
      </div>

      {/* ===== منو ===== */}
      <ul className={`${styled.navLinks} ${isMenuOpen ? styled.open : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>خانه</Link>
        </li>
        <li>
          <Link to="/AddPost" onClick={closeMenu}>افزودن کالا</Link>
        </li>
        <li>
          {isloggin ? (
            <button
              onClick={() => {
                setIsloggin(false);
                closeMenu();
              }}
              className={styled.logoutBtn}
            >
              خروج
            </button>
          ) : (
            <Link to="/Login" onClick={closeMenu} className={styled.loginBtn}>
              ورود
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );



}

export default Navbar;