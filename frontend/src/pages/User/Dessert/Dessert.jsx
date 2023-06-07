import React from 'react'
import { useEffect } from 'react';
import { PizzaAPI } from '../../../api/pizza-api';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CardDetailed from '../../../components/User/CardDetailed/CardDetailed';
import { DessertAPI } from '../../../api/dessert-api';
import { useDispatch } from 'react-redux';
import { setDesserts, setPasta, setPizzas, setQuantity, setTotal } from '../../../store/cart-slice'

const Dessert = () => {
  const [dessertItem, setDessertItem] = useState()
  const {_id} = useParams()
  const dispatch=useDispatch()
  useEffect(() => {
    async function getDessert() {
      const dessert = await DessertAPI.getById(_id);
      setDessertItem(dessert)
    }
    getDessert();
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
      <CardDetailed food={dessertItem} type="dessert"/> 
    </div>
  )
}

export default Dessert