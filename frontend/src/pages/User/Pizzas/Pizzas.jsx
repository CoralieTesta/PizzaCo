import React, { useEffect, useState } from 'react'
import { PizzaAPI } from '../../../api/pizza-api';
import FoodList from '../../../components/User/FoodList/FoodList';
import { useDispatch, useSelector } from 'react-redux';
import { setDesserts, setPasta, setPizzas, setQuantity, setTotal } from '../../../store/cart-slice'
import PizzaLoader from '../../../components/User/PizzaLoader/PizzaLoader';
import { setPizzaListMenu } from '../../../store/menu-slice';

const Pizzas = () => {
  const [pizzaList, setPizzaList] = useState()
  const dispatch=useDispatch()
  const pizzaListMenu = useSelector(store => store.MENU.pizzaListMenu)
  useEffect(() => {
    async function getAllPizzas() {
      const pizzas = await PizzaAPI.getAll();
      setPizzaList(pizzas)    
      dispatch(setPizzaListMenu(pizzas))
    }
    
    if(pizzaListMenu.length === 0) {
      getAllPizzas();
    }
    else {
      setPizzaList(pizzaListMenu)
    }
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
  if(pizzaList) {
    return (
      <div>
          <FoodList list={pizzaList} type="pizza"/>
      </div>
    )
  }
  else {
    return (
    <div>
      <PizzaLoader/>
    </div>)
  }
}

export default Pizzas