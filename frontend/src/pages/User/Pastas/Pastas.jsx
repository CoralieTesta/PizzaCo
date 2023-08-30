import React from 'react'
import FoodList from '../../../components/User/FoodList/FoodList';
import { useState } from 'react';
import { useEffect } from 'react';
import { PastaAPI } from '../../../api/pasta-api';
import { useDispatch, useSelector } from 'react-redux';
import { setDesserts, setPasta, setPizzas, setQuantity, setTotal } from '../../../store/cart-slice'
import PizzaLoader from '../../../components/User/PizzaLoader/PizzaLoader';
import { setPastaListMenu } from '../../../store/menu-slice';
import AdminBookingItem from '../../../components/Admin/Bookings/AdminBookingItem/AdminBookingItem';

const Pastas = () => {
  const [pastaList, setPastaList] = useState()
  const dispatch=useDispatch()
  const pastaListMenu = useSelector(store => store.MENU.pastaListMenu)
  useEffect(() => {
    async function getAllPasta() {
      const pasta = await PastaAPI.getAll();
      setPastaList(pasta)
      dispatch(setPastaListMenu(pasta))
    }
    if(pastaListMenu.length === 0) {
      getAllPasta();
    }
    else {
      setPastaList(pastaListMenu)
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
  if(pastaList) {
    return (
      <div>
          <FoodList list={pastaList} type="pasta"/>
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

export default Pastas