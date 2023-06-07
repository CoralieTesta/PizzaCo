import React, { useEffect, useState } from 'react'
import { OrderAPI } from '../../../api/order-api'
import { useParams } from 'react-router-dom'
import Order from '../../../components/User/Order/Order'
import { useDispatch } from 'react-redux'
import { reset } from '../../../store/cart-slice'
import PizzaLoader from '../../../components/User/PizzaLoader/PizzaLoader'

const OrderPage = () => {
  const {_id} = useParams()
  const [order, setOrder] = useState()
  const dispatch= useDispatch()
  
  useEffect(() => {
    async function getOrder() {
      const order = await OrderAPI.getById(_id);
      setOrder(order)
    }
    getOrder();
    dispatch(reset)
  }, []);
  
  if(order) {
    
    //dispatch(setOrder({orderId:_id}))
    return(
      <div>
        <Order order={order}/>
      </div>
    )
  }
  return(
    <div>
      <PizzaLoader/>
    </div>
  )
  
}

export default OrderPage;
