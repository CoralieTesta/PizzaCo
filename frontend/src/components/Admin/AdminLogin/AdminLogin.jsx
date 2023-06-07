import React from 'react'
import s from "./style.module.css"
import { AdminLogout, Logout } from '../AdminLogout/AdminLogout'
import { AdminLoginForm, LoginForm } from '../AdminLoginForm/AdminLoginForm'
import { useSelector } from 'react-redux'

const AdminLogin = () => {
    const isConnect = useSelector(store => store.ADMIN.isConnect)
  return (
    <div className={s.container}>
            {isConnect ?
                (<div>
                    <h1  className={`${s.title} ${s.fadeInDown}`}>Logout</h1>
                    <AdminLogout />
                </div>
                )
                :
                (<>
                    <h1  className={`${s.title} ${s.fadeInDown}`}>Admin Login</h1>
                    <div>
                        <AdminLoginForm />
                    </div>
                </>
                )
            }
        </div>
  )
}

export default AdminLogin