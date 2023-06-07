import React from 'react'
import { Link } from 'react-router-dom'
import s from "./style.module.css"

const FoodCard = ({food, foodType}) => {
    const {_id, title, desc, image, prices} = food

    if(foodType==="pasta") {
      foodType="pates"
    }
  return (
    <div style={{
      backgroundImage:`url(${image})`}} className={s.container}
    >
        <Link className={s.link} to={`/${foodType}/${_id}`}>
          <div className={s.innerContainer}>
            <div className={s.textContainer}>
              <h2>{title}</h2>
              {foodType === "dessert" ?
              (<span className={s.price}>{food.price}€</span>)
              :
              (<span className={s.price}>{prices[0]}€</span>)
              }
              
              <p>
                  {desc}
              </p>
              <button className={s.btn} type='button'>Commander</button>
            </div>
          </div>
        </Link>
    </div>
  )
}

export default FoodCard