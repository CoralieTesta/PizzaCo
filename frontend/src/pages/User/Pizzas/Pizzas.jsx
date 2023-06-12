import React, { useEffect, useState } from 'react'
import { PizzaAPI } from '../../../api/pizza-api';
import FoodList from '../../../components/User/FoodList/FoodList';
import { useDispatch } from 'react-redux';
import { setDesserts, setPasta, setPizzas, setQuantity, setTotal } from '../../../store/cart-slice'
import PizzaLoader from '../../../components/User/PizzaLoader/PizzaLoader';
import FoodCard from '../../../components/User/FoodCard/FoodCard';

const Pizzas = () => {
  const [pizzaList, setPizzaList] = useState()
  const  [pizzaItem, setPizzaItem] =useState()
  const dispatch=useDispatch()
  useEffect(() => {
    async function getAllPizzas() {
      const pizzas = await PizzaAPI.getAll();
      setPizzaList(pizzas)
    }
    async function getOnePizza() {
      const pizza = await PizzaAPI.getById("646375e3ca67cb3b34b11d6c");
      setPizzaItem(pizza)
    }
    getOnePizza()
    getAllPizzas();
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
  console.log(pizzaItem)
  if(pizzaList || pizzaItem) {
    return (
      <div>
          <FoodCard type="pizza" food={pizzaItem}/>
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