import React from 'react'
import CardDetailedPizza from '../../../components/User/CardDetailed/CardDetailed'
import { useEffect } from 'react';
import { PizzaAPI } from '../../../api/pizza-api';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CardDetailed from '../../../components/User/CardDetailed/CardDetailed';
import { useDispatch, useSelector } from 'react-redux';
import { setDesserts, setPasta, setPizzas, setQuantity, setTotal } from '../../../store/cart-slice'
import PizzaLoader from '../../../components/User/PizzaLoader/PizzaLoader';

const Pizza = () => {
  const [pizzaItem, setPizzaItem] = useState()
  const {_id} = useParams()
  const dispatch=useDispatch()
  const selectedPizza = useSelector(store => store.MENU.selectedPizza)
  useEffect(() => {
    async function getPizza() {
      const pizza = await PizzaAPI.getById(_id);
      setPizzaItem(pizza)
      
    }
    if(Object.entries(selectedPizza).length === 0) {
      getPizza();
    }
    else {
      setPizzaItem(selectedPizza)
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

  if(pizzaItem) {
    return (
      <div>
          <CardDetailed food={pizzaItem} type="pizza"/>
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

export default Pizza