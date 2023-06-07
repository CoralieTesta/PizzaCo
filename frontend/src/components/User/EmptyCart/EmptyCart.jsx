import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import s from "./style.module.css"
import ButtonsItaly from "../ButtonsItaly/ButtonsItaly";

const EmptyCart = () => {
  return (
    <div className={s.container}>
      Votre panier est vide. <AiOutlineShoppingCart/>
      <ButtonsItaly/>
    </div>
  );
};

export default EmptyCart;