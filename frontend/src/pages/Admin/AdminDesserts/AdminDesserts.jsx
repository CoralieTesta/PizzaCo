import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminFoodList from '../../../components/Admin/AdminFoodList/AdminFoodList'
import { useEffect } from 'react'
import { useState } from 'react'
import { DessertAPI } from '../../../api/dessert-api'
import AdminNotConnect from '../../../components/Admin/AdminNotConnect/AdminNotConnect'
import { setConnect, setToken } from '../../../store/admin-slice'

const AdminDesserts = () => {
  const dispatch=useDispatch()

  const isConnect = useSelector(store => store.ADMIN.isConnect)
  const [dessertList, setDessertList] = useState([])
  useEffect(() => {
    async function getAllDesserts() {
      const desserts = await DessertAPI.getAll();
      setDessertList(desserts)
    }
    getAllDesserts();

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
            <h2 style={{marginTop:"20px"}}>Nos desserts</h2>
            <AdminFoodList foodList={dessertList} setFoodList={setDessertList} type="dessert"/>
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
  
export default AdminDesserts