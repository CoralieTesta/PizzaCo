import React from 'react'
import HeroImage from '../../../assets/heroHome.jpg'
import s from './style.module.css'
import ButtonsItaly from '../ButtonsItaly/ButtonsItaly'

const Hero = () => {
  return (
    <div className={s.container} 
        style={{
        backgroundImage:`url(${HeroImage})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',}}>
        <div className={s.supBackground}>
            <div className={s.text}>
              Découvrez l'authenticité italienne dans chaque bouchée
            </div>
            <ButtonsItaly/>
        </div>
    </div>
  )
}

export default Hero