import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminFoodList from '../../../components/Admin/AdminFoodList/AdminFoodList'
import { useEffect } from 'react'
import { useState } from 'react'
import {PizzaAPI} from '../../../api/pizza-api'
import AdminNotConnect from '../../../components/Admin/AdminNotConnect/AdminNotConnect'
import { setConnect, setToken } from '../../../store/admin-slice'


const AdminPizzas = () => {
  const isConnect = useSelector(store => store.ADMIN.isConnect)
  const token = useSelector(store => store.ADMIN.token)
  const [pizzaList, setPizzaList] = useState([])
  const dispatch = useDispatch()
  useEffect(() => {
      async function getAllPizzas() {
        const pizzas = await PizzaAPI.getAll();
        setPizzaList(pizzas)
      }
      getAllPizzas();
      const data = localStorage.getItem('admin')
      const parseData = JSON.parse(data)
      if(parseData) {
        dispatch(setConnect(parseData.isConnect))
        dispatch(setToken({token:parseData.token}))
      }
    }, []);
  if(isConnect) {
    return (
      <div>
          <h2 style={{marginTop:"20px"}}>Nos pizzas</h2>
          <AdminFoodList foodList={pizzaList} setFoodList={setPizzaList} type="pizza"/>
      </div>
    )
  }
  else {
    return(
      <div>
        <AdminNotConnect/>
      </div>
    )
  }
}

export default AdminPizzas