import { useState } from "react";
import { CiPizza } from "react-icons/ci";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import s from "./style.module.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import { store } from "../../../store";

export function NavALarge() {
  const quantity = useSelector((store) => store.CART.quantity);
  const [isShown, setIsShown] = useState(false);
  const location = useLocation();

  function setIsSwhownTrue(e) {
    e.stopPropagation();
    setIsShown(true);
  }

  function setIsSwhownFalse(e) {
    e.stopPropagation();
    setIsShown(false);
  }

  return (
    <nav className={s.nav}>
      <ul className={s.ul}>
        <li className={s.li}>
          <NavLink 
            to="/"
            style={{color: "white"}} 
            className={s.link}>
            <CiPizza size={40} />PizzaCo
          </NavLink>
        </li>
        <div className={s.centralItems}>
          <li className={s.li}>
            <NavLink
              to="/"
              className={s.link}
              isActive={() => location.pathname === "/"}
              style={{ color: location.pathname === "/" ? "black" : "white" }}
            >
              Accueil
            </NavLink>
          </li>
          <li className={s.li}>
            <NavLink
              to="/pizzas"
              className={s.link}
              isActive={() => location.pathname === "/pizzas"}
              style={{ color: location.pathname === "/pizzas" ? "black" : "white" }}
            >
              Pizzas
            </NavLink>
          </li>
          <li className={s.li}>
            <NavLink
              to="/pates"
              className={s.link}
              isActive={() => location.pathname === "/pates"}
              style={{ color: location.pathname === "/pates" ? "black" : "white" }}
            >
              Pâtes
            </NavLink>
          </li>
          <li className={s.li}>
            <NavLink
              to="/desserts"
              className={s.link}
              isActive={() => location.pathname === "/desserts"}
              style={{ color: location.pathname === "/desserts" ? "black" : "white" }}
            >
              Desserts
            </NavLink>
          </li>
          <li className={s.li}>
            <NavLink
              to="/contact"
              className={s.link}
              isActive={() => location.pathname === "/contact"}
              style={{ color: location.pathname === "/contact" ? "black" : "white" }}
            >
              Contact
            </NavLink>
          </li>
        </div>
        <li className={s.li}>
          <NavLink 
            to="/cart"
            style={{ color: location.pathname === "/cart" ? "black" : "white" }} 
            className={s.link}
            >
            <AiOutlineShoppingCart size={35} />
          </NavLink>
          <div className={s.cartItemCount}>{quantity}</div>
        </li>
      </ul>
    </nav>
  );
}
