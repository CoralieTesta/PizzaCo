import { useState } from "react";
import { CiPizza } from "react-icons/ci";
import { NavLink, useLocation } from "react-router-dom";
import s from "./style.module.css";
import { FiLogOut } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setNotConnect } from "../../../store/admin-slice";

export default function AdminNav() {
  const [isShown, setIsShown] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch()

  function setIsShownTrue(e) {
    e.stopPropagation();
    setIsShown(true);
  }

  function setIsShownFalse(e) {
    e.stopPropagation();
    setIsShown(false);
  }

  function logoutHandler() {
      dispatch(setNotConnect());
      localStorage.removeItem('admin');
      //window.location.reload(false);
  }
  return (
    <nav className={s.nav}>
      <ul className={s.ul}>
        <li className={s.li}>
          <NavLink to="/" style={{ color: "white" }} className={s.link}>
            <CiPizza size={40} />PizzaCoAdmin
          </NavLink>
        </li>
        <div className={s.centralItems}>
          <div>
            <li className={s.li}>
              <NavLink
                to="/adminOrders"
                className={s.link}
                isActive={() => location.pathname === "/adminOrders"}
                style={{
                  color: location.pathname === "/adminOrders" ? "black" : "white",
                }}
              >
                Commandes
              </NavLink>
            </li>
            <li className={s.li}>
              <NavLink
                to="/adminBookings"
                className={s.link}
                isActive={() => location.pathname === "/adminBookings"}
                style={{
                  color: location.pathname === "/adminBookings" ? "black" : "white",
                }}
              >
                Réservations
              </NavLink>
            </li>
            
            <li className={s.li}>
              <NavLink
                to="/adminPizzas"
                className={s.link}
                isActive={() => location.pathname === "/adminPizzas"}
                style={{
                  color: location.pathname === "/adminPizzas" ? "black" : "white",
                }}
              >
                Pizzas
              </NavLink>
            </li>
            <li className={s.li}>
              <NavLink
                to="/adminPasta"
                className={s.link}
                isActive={() => location.pathname === "/adminPasta"}
                style={{
                  color: location.pathname === "/adminPasta" ? "black" : "white",
                }}
              >
                Pâtes
              </NavLink>
            </li>
            <li className={s.li}>
              <NavLink
                to="/adminDesserts"
                className={s.link}
                isActive={() => location.pathname === "/adminDesserts"}
                style={{
                  color: location.pathname === "/adminDesserts" ? "black" : "white",
                }}
              >
                Desserts
              </NavLink>
            </li>
          </div>
          <li className={s.li}>
          <NavLink
                to="/adminLog"
                onClick={logoutHandler}
                className={s.link}
                isActive={() => location.pathname === "/adminDesserts"}
                style={{
                  color: location.pathname === "/adminDesserts" ? "black" : "white",
                }}
              >
              <FiLogOut />
            </NavLink>
          </li>
        </div>
      </ul>
    </nav>
  );
}
