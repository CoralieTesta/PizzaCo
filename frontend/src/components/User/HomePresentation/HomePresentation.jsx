import React from 'react'
import s from './style.module.css'

const HomePresentation = () => {
  return (
    <div className={s.container}>
        <p style={{fontWeight: 800, fontSize:"30px"}}>
            Bienvenue chez PizzaCo !
        </p>
        <p>
            Chez PizzaCo, nous nous efforçons de créer les pizzas les plus délicieuses et savoureuses qui vous transporteront directement en Italie. Notre équipe de chefs talentueux utilise des ingrédients frais et de qualité supérieure pour préparer chaque pizza avec soin et passion.
        </p>
        <p>
            Que vous préfériez une classique Margherita, une Pizza Pepperoni épicée ou une création unique avec des ingrédients gourmands, notre menu varié saura satisfaire toutes les envies. Nous proposons également des options végétariennes pour les amateurs de cuisine sans viande.
        </p>
        <p>
            Commandez en ligne et laissez-nous vous livrer une pizza fraîchement sortie du four, directement à votre porte. Profitez du confort de déguster une pizza artisanale sans quitter le confort de votre foyer.
        </p>
        <p>
            Nous sommes fiers de servir notre communauté et de créer des moments de convivialité autour de chaque bouchée. Rejoignez-nous pour une expérience culinaire inoubliable et laissez-nous vous régaler avec nos pizzas authentiques et délicieuses.
        </p>
        <p>
            PizzaCo - L'essence de l'Italie dans chaque pizza.
        </p>
    </div>
  )
}

export default HomePresentation