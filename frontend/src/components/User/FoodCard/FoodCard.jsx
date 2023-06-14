import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import s from "./style.module.css"
import { useDispatch } from 'react-redux'
import { setSelectedDessert, setSelectedPasta, setSelectedPizza} from '../../../store/menu-slice'

const FoodCard = ({food, foodType}) => {
    const {_id, title, desc, image, prices} = food
    const navigate= useNavigate()
    const dispatch = useDispatch()
    if(foodType==="pasta") {
      foodType="pates"
    }
    const onClickHandler = () => {
      if (foodType==="pizza") {
      dispatch(setSelectedPizza(_id))
      }
      else if(foodType==="pates") {
        dispatch(setSelectedPasta(_id))
      }
      else {
        dispatch(setSelectedDessert(_id))
      }
      navigate(`/${foodType}/${_id}`)
    }
  return (
    <div style={{
      backgroundImage:`url(${image})`}} className={s.container}
    >
        <div className={s.link} onClick={onClickHandler}>
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
        </div>
    </div>
  )
}

export default FoodCard