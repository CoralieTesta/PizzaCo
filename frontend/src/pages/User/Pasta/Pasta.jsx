import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { PastaAPI } from '../../../api/pasta-api'
import CardDetailed from '../../../components/User/CardDetailed/CardDetailed'
import { useDispatch } from 'react-redux';
import { setDesserts, setPasta, setPizzas, setQuantity, setTotal } from '../../../store/cart-slice'


const Pasta = () => {
    const [pastaItem, setPastaItem] = useState()
    const {_id} = useParams()
    const dispatch=useDispatch()
    useEffect(() => {
    async function getPasta() {
      const pasta = await PastaAPI.getById(_id);
      setPastaItem(pasta)
    }
    getPasta();
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
          <CardDetailed food={pastaItem} type="pasta"/>
      </div>
    )
  }
  

export default Pasta