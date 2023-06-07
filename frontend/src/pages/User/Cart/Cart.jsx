import React from 'react'
import CartList from '../../../components/User/CartList/CartList'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setDesserts, setPasta, setPizzas, setQuantity, setTotal } from '../../../store/cart-slice'


const Cart = () => {
  const pizzas = useSelector(store => store.CART.pizzas)
  const pasta = useSelector(store => store.CART.pasta)
  const desserts = useSelector(store => store.CART.desserts)
  const total = useSelector(store => store.CART.total)
  const dispatch=useDispatch()
  useEffect(() => {
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
  }, [])
  return (
    <div>
        <CartList pizzas={pizzas} pasta={pasta} desserts={desserts} total={total} showPrices={true}/>
    </div>
  )
}

export default Cart