import React from 'react'
import Login from '../../../components/Admin/AdminLogin/AdminLogin'
import AdminLogin from '../../../components/Admin/AdminLogin/AdminLogin'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setConnect, setToken } from '../../../store/admin-slice';

const AdminLog = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const data = localStorage.getItem('admin')
    const parseData = JSON.parse(data)
    if(parseData) {
      dispatch(setConnect(parseData.isConnect))
      dispatch(setToken({token:parseData.token}))
    }
  }, []);
  return (
    <div>
        <AdminLogin/>
    </div>
  )
}

export default AdminLog