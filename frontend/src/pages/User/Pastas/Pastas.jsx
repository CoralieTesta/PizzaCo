import React from 'react'
import FoodList from '../../../components/User/FoodList/FoodList';
import { useState } from 'react';
import { useEffect } from 'react';
import { PastaAPI } from '../../../api/pasta-api';
import { useDispatch } from 'react-redux';
import { setDesserts, setPasta, setPizzas, setQuantity, setTotal } from '../../../store/cart-slice'

const Pastas = () => {
  const [pastaList, setPastaList] = useState()
  const dispatch=useDispatch()
  useEffect(() => {
    async function getAllPasta() {
      const pasta = await PastaAPI.getAll();
      setPastaList(pasta)
    }
    getAllPasta();

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
        <FoodList list={pastaList} type="pasta"/>
    </div>
  )
}

export default Pastas