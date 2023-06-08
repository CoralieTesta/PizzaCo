import React, { useEffect, useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import s from "./style.module.css"
import CartList from '../CartList/CartList';
import { FcMoneyTransfer } from "react-icons/fc";
import { AiOutlineCheck } from 'react-icons/ai';
import PDFDocument from '../PDFDocument/PDFDocument';
const Order = ({order}) => {
    const {_id, customer, address, method, status, total, pizzas, pasta, desserts} = order
    const [showDetails, setShowDetails] = useState(false);
    const currentDate = new Date();
  const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre',
  ];
  const formattedDate = `${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);
    const toggleDetails = () => {
        setShowDetails(!showDetails);
      };


  return (
    <div className={s.container}>
        
        <div className={s.saved}>
            Félicitations ! Votre commande a été confirmée avec succès. <AiOutlineCheck size={25}/>
        </div>
        <div>
            <div className={s.downloadText}>Téléchargez la confirmation de votre commande :</div>
            <PDFDocument
                formattedDate={formattedDate} 
                time={currentTime}
                id={_id}
                customer={customer}
                address={address}
                pizzas={pizzas}
                pasta={pasta}
                desserts={desserts}
                total={total}
                method={method}
            />
        </div>
        <h1 className={`${s.title} ${s.fadeInDown}`}>Récapitulatif de la commande :</h1>
        <div className={s.innerContainer}>
            <div className={s.item}>
                <div><b>Id de Commande</b></div>
                <div>{_id}</div>
            </div>
            <div className={s.item}>
                <div><b>Client</b></div>
                <div>{customer}</div>
            </div>
            <div className={s.item}>
                <div><b>Adresse</b></div>
                <div>{address}</div>
            </div>
            <div className={s.item}>
                <div><b>Total</b></div>
                <div>{total}€</div>
            </div>
            <div>
                <div><FcMoneyTransfer/></div>
                <div><b>Paiement</b></div>
                {method === 0 ?
                (<div>
                    Pas encore effectué
                </div>)
                :
                (<div>
                    Effectué <AiOutlineCheck/>
                </div>)}
            </div>
        </div>
        <div className={s.orderContainer}>
            <div><b>Commande</b></div>
            
            {showDetails ?
                (<div>
                    <button 
                        type='button'
                        onClick={toggleDetails}
                        className={s.btn}
                    >
                        Cacher les détails
                        <BiChevronUp className={s.icon} />
                    </button>
                    <CartList pizzas={pizzas} pasta={pasta} desserts={desserts} showPrices={true}/>
                </div>)
                :
                (<button 
                    type='button'
                    onClick={toggleDetails}
                    className={s.btn}
                    >
                    Voir les détails
                    <BiChevronDown className={s.icon} />
                </button>)
            }
        </div>
        <div className={s.text}>
            <hr/>
            <p className={s.confirmMessage}>
                Nous vous remercions pour votre confiance et nous nous efforcerons de préparer votre commande <span className={s.strong}> dans les meilleurs délais</span>. Si vous avez des questions ou des préoccupations,<i> n'hésitez pas à nous contacter</i>.
                <br/><br/>
                Merci encore et bonne dégustation ! 
                <br/><br/>
                <span className={s.teamName}>L'équipe de PizzaCo</span>
            </p>
        </div>
    </div>
  )
}

export default Order