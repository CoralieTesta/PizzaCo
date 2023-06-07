import React, { useEffect, useState } from 'react'
import { PizzaAPI } from '../../../api/pizza-api';
import s from "./style.module.css"
import FoodCard from '../FoodCard/FoodCard';

const FoodList = ({list, type}) => {
  return (
    <div className={s.container}>
        {type==="pizza" &&
          <h1 className={`${s.title} ${s.fadeInDown}`}>Nos Pizzas</h1>
        }
        {type==="pasta" &&
          <h1 className={`${s.title} ${s.fadeInDown}`}>Nos Pâtes</h1>
        }
        {type==="dessert" &&
          <h1 className={`${s.title} ${s.fadeInDown}`}>Nos Desserts</h1>
        }
        <div className={s.pizzaList}>
        {list?.map((food) => (
            <FoodCard food={food} foodType={type} key={food._id}/>
        ))}
        </div>
    </div>
  )
}

export default FoodList