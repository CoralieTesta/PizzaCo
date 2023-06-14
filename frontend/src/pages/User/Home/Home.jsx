import React, { useEffect } from 'react'
import Hero from '../../../components/User/Hero/Hero'
import HomePresentation from '../../../components/User/HomePresentation/HomePresentation'
import FoodList from '../../../components/User/FoodList/FoodList'
import { useState } from 'react'
import { PizzaAPI } from '../../../api/pizza-api'
import { PastaAPI } from '../../../api/pasta-api'
import { DessertAPI } from '../../../api/dessert-api'
import { setDesserts, setPasta, setPizzas, setQuantity, setTotal } from '../../../store/cart-slice'
import { useDispatch, useSelector } from 'react-redux'
import { setDessertListMenu, setPastaListMenu, setPizzaListMenu } from '../../../store/menu-slice'

const Home = () => {
  const [pizzaList, setPizzaList] = useState()
  const [pastaList, setPastaList] = useState()
  const [dessertList, setDessertList] = useState()
  const pizzaListMenu = useSelector(store => store.MENU.pizzaListMenu)
  const pastaListMenu = useSelector(store => store.MENU.pastaListMenu)
  const dessertListMenu = useSelector(store => store.MENU.dessertListMenu)
  const dispatch = useDispatch()
  useEffect(() => {
      async function getAllPizzas() {
        const pizzas = await PizzaAPI.getAll();
        setPizzaList(pizzas)
        dispatch(setPizzaListMenu(pizzas))
        //localStorage.setItem('pizzas', JSON.stringify(pizzas));
      }
      async function getAllPasta() {
        const pasta = await PastaAPI.getAll();
        setPastaList(pasta)
        dispatch(setPastaListMenu(pasta))
      }
      async function getAllDesserts() {
        const desserts = await DessertAPI.getAll();
        setDessertList(desserts)
        dispatch(setDessertListMenu(desserts))
      }
      
      async function fetchData() {
        if (pizzaListMenu.length === 0) {
          await getAllPizzas();
        } else {
          setPizzaList(pizzaListMenu);
        }
    
        if (pastaListMenu.length === 0) {
          await getAllPasta();
        } else {
          setPastaList(pastaListMenu);
        }
    
        if (dessertListMenu.length === 0) {
          await getAllDesserts();
        } else {
          setDessertList(dessertListMenu);
        }
      }
    
      fetchData();

      const data = localStorage.getItem('cart')
      const parseData = JSON.parse(data)
      if(parseData) {
          if(parseData.payload) {
            dispatch(setPizzas(parseData.payload.pizzas))
            dispatch(setPasta(parseData.payload.pasta))
            dispatch(setDesserts(parseData.payload.desserts))
            dispatch(setTotal(parseData.payload.total))
            dispatch(setQuantity(parseData.payload.quantity))
          }
          else {
            dispatch(setPizzas(parseData.pizzas))
            dispatch(setPasta(parseData.pasta))
            dispatch(setDesserts(parseData.desserts))
            dispatch(setTotal(parseData.total))
            dispatch(setQuantity(parseData.quantity))
          }     
      }
    }, []);
    
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