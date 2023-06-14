import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { PastaAPI } from '../../../api/pasta-api'
import CardDetailed from '../../../components/User/CardDetailed/CardDetailed'
import { useDispatch, useSelector } from 'react-redux';
import { setDesserts, setPasta, setPizzas, setQuantity, setTotal } from '../../../store/cart-slice'
import PizzaLoader from '../../../components/User/PizzaLoader/PizzaLoader'


const Pasta = () => {
    const [pastaItem, setPastaItem] = useState()
    const {_id} = useParams()
    const dispatch=useDispatch()
    const selectedPasta = useSelector(store => store.MENU.selectedPasta)
    useEffect(() => {
    async function getPasta() {
      const pasta = await PastaAPI.getById(_id);
      setPastaItem(pasta)
    }
    if(Object.entries(selectedPasta).length === 0) {
      getPasta();
    }
    else {
      setPastaItem(selectedPasta)
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
    if(pastaItem) {
      return (
        <div>
            <CardDetailed food={pastaItem} type="pasta"/>
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
  

export default Pasta