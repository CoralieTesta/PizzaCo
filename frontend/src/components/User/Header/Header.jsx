import React from 'react'
import s from './style.module.css'
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'

const Header = () => {
  const phoneNumber = '+32493484292'
  const email = 'pizzaCo@gmail.com'
  const onPhoneClickHandler = () => {
    window.location.href = `tel:${phoneNumber}`;
  }
  const onMailClickHandler = () => {
    window.location.href = `mailto:${email}`;
  }
  return (
    <header 
      className={s.container}
    >
      <p className={s.p} onClick={onPhoneClickHandler}><AiOutlinePhone size={30} className={s.icon}/> {phoneNumber}</p>
      <p className={s.p} onClick={onMailClickHandler}><AiOutlineMail size={30} className={s.icon}/> {email}</p>
    </header>
  )
}

export default Header