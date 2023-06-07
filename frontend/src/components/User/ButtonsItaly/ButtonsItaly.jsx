import React from 'react'
import s from "./style.module.css"
import { useNavigate } from 'react-router-dom'

const ButtonsItaly = () => {
  const navigate = useNavigate()
  return (
    <div className={s.btnContainer}>
        <button className={s.pizzaBtn} onClick={() => navigate("/pizzas")}>Voir les pizzas</button>
        <button className={s.pastaBtn} onClick={() => navigate("/pates")}>Voir des pâtes</button>
        <button className={s.dessertBtn} onClick={() => navigate("/desserts")}>Voir les desserts</button>
    </div>
  )
}

export default ButtonsItaly