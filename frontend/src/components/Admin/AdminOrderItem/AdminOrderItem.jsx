import React, { useState } from 'react'
import CartList from '../../User/CartList/CartList'
import { format } from 'date-fns';
import s from "./style.module.css";
import { OrderAPI } from '../../../api/order-api';

const AdminOrderItem = ({
    order, isActual, setActualOrderList,actualOrderList, orderList, setOrderList,pastOrderList, setPastOrderList
}) => {
    const {_id, customer, address, createdAt, desserts, pasta, pizzas,method, status, total}=order
    const [newStatus, setNewStatus] = useState(status)
    const formattedDate = format(new Date(createdAt), "dd/MM/yyyy HH:mm:ss");

    function archiveHandler() {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir archiver cette commande ?');
        if (confirmed) {
            OrderAPI.update(_id, {...order, status:1})
            .then((resp) => {
                const updatedActualOrderList = actualOrderList.filter(
                order => order._id !== _id
                );
                setActualOrderList(updatedActualOrderList);
            })
            .catch(error => {
                console.log('Error archiving order:', error);
            });
        }
    };

    function deleteHandler() {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?');
        if (confirmed) {
            OrderAPI.delete(_id)
            .then((resp) => {
                const updatedPastOrderList = pastOrderList.reverse().filter(
                    order => order._id !== _id
                );
                setPastOrderList(updatedPastOrderList);
                const updatedOrderList = orderList.filter(
                    order => order._id !== _id
                );
                setOrderList(updatedOrderList);
                })
                .catch(error => {
                    console.log('Error archiving order:', error);
                });
        }
    }
  return (
    <div className={s.container}>
        <div className={s.customerInfo}>
            <div className={s.info}>
                <b>Client(e)</b> {customer}
            </div>
            <div className={s.info}>
                <b>Adresse</b> {address}
            </div>
            <div className={s.info}>
                <b>Date de la commande</b> {formattedDate}
            </div>
            <div className={s.info}>
                <b>Total</b> {total}€
            </div>  
            <div className={s.info}>
                <b>Paiement </b>
                {method===0?
                (<>À la livraison</>)
                :
                (<>Effectué</>)
                }
            </div> 
            <div className={s.info}>
                {isActual?
                    (<button className={s.archiveBtn} onClick={archiveHandler}>Archiver</button>)
                    :
                    (<button className={s.deleteBtn} onClick={deleteHandler}>Supprimer</button>)
                }
                
            </div>
            <div className={s.info}>
                <b>Commande</b> : 
            </div>
            
        </div>
        <CartList pizzas={pizzas} pasta={pasta} desserts={desserts} showPrices={false} />
        <hr/>
        
    </div>
  )
}

export default AdminOrderItem