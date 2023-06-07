import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AdminFoodList from '../../../components/Admin/AdminFoodList/AdminFoodList'
import { useState } from 'react'
import { useEffect } from 'react'
import { PastaAPI } from '../../../api/pasta-api'
import AdminNotConnect from '../../../components/Admin/AdminNotConnect/AdminNotConnect'
import { setConnect, setToken } from '../../../store/admin-slice'

const AdminPasta = () => {
  const isConnect = useSelector(store => store.ADMIN.isConnect)
  const [pastaList, setPastaList] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    async function getAllPasta() {
      const pasta = await PastaAPI.getAll();
      setPastaList(pasta)
    }
    getAllPasta();
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
            <h2 style={{marginTop:"20px"}}>Nos pâtes</h2>
            <AdminFoodList foodList={pastaList} setFoodList={setPastaList} type="pasta" />
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
  
export default AdminPasta