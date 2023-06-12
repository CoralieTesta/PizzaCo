import React, { useEffect } from 'react'
import Hero from '../../../components/User/Hero/Hero'
import HomePresentation from '../../../components/User/HomePresentation/HomePresentation'
import FoodList from '../../../components/User/FoodList/FoodList'
import { useState } from 'react'
import { PizzaAPI } from '../../../api/pizza-api'
import { PastaAPI } from '../../../api/pasta-api'
import { DessertAPI } from '../../../api/dessert-api'
import { setDesserts, setPasta, setPizzas, setQuantity, setTotal } from '../../../store/cart-slice'
import { useDispatch } from 'react-redux'

const Home = () => {
  const [pizzaList, setPizzaList] = useState()
  const [pastaList, setPastaList] = useState()
  const [dessertList, setDessertList] = useState()
  const dispatch = useDispatch()
  
    
  return (
    <div>
        <Hero/>
        <HomePresentation/>
        {pizzaList && <FoodList list={pizzaList} type="pizza"/>}
        {pastaList && <FoodList list={pastaList} type="pasta"/>}
        {dessertList && <FoodList list={dessertList} type="dessert"/>}
    </div>
  )
}

export default Home