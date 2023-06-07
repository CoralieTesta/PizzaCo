import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartItem from '../CartItem/CartItem'
import s from "./style.module.css"

import { Table, Thead, Tbody, Tr, Th } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import EmptyCart from '../EmptyCart/EmptyCart'
import { useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { OrderAPI } from '../../../api/order-api'
import ButtonWrapper from '../ButtonWrapper/ButtonWrapper'
import FormCustomer from '../FormCustomer/FormCustomer'
import { BsFillCartXFill } from 'react-icons/bs'
import { reset } from '../../../store/cart-slice'

const CartList = ({pizzas, pasta, desserts, total, showPrices}) => {//si total est défini, on doit afficher le total, -+ et la poubelle
    const [confirm, setConfirm] = useState(false)
    const [openPayment, setOpenPayment] = useState(false)
    const dispatch = useDispatch()

    const setCancel = (bool) => {
        if(bool) {
            setConfirm(false)
        }
        else {
            setConfirm(true)
        }
    }

    const emptyHandler = () => {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir vider votre panier ?');
        if (confirmed) {
        dispatch(reset())
        }
    }
    
    const currency = "EUR";
    
    if(pizzas.length === 0 && pasta.length === 0 && desserts.length === 0) {
        return(
            <EmptyCart/>
        )
    }
    if(confirm) {
        return(
            <FormCustomer setCancel={setCancel} total={total}/>
        )
    }
  return (
    <div className={s.container}>
        {total &&
        (<>
            <h1 className={`${s.title} ${s.fadeInDown}`}>Vos commandes</h1>
            <button onClick={emptyHandler} className={s.emptyBtn}>Vider le panier <BsFillCartXFill/></button>
        </>
        )}
        <div className={s.tableTotal}>
            <Table>
                <Thead> 
                    <Tr>
                        <Th className={s.th}>Nom</Th>
                        <Th className={s.th}>Taille</Th>
                        <Th className={s.th}>Supplément(s)</Th>
                        <Th className={s.th}>Retrait(s)</Th>
                        {showPrices &&
                            <Th className={s.th}>Prix</Th>
                        }
                        <Th className={s.th}>Quantité</Th>
                        {showPrices &&
                            <Th className={s.th}>Total</Th>
                        }
                        
                    </Tr>
                </Thead>
                <Tbody>
                    {pizzas && pizzas.length > 0 &&
                        pizzas.map((pizza,i) => 
                            <CartItem
                                key={i}
                                food={pizza}
                                type="pizza"
                                showItems={total}
                                showPrices={showPrices}
                            />
                        )
                    }
                    {pasta && pasta.length > 0 &&
                        pasta.map((pasta,i) => 
                        <CartItem
                            key={i}
                            food={pasta}
                            type="pasta"
                            showItems={total}
                            showPrices={showPrices}
                        />
                        )
                    }
                    {desserts && desserts.length > 0 &&
                        desserts.map((dessert,i) => 
                            <CartItem
                                key={i}
                                food={dessert}
                                type="dessert"
                                showItems={total}
                                showPrices={showPrices}
                            />
                        )
                    }
                </Tbody>
            </Table>
            {total?(
            <div className={s.total}>
                <h3>Total</h3>
                <p className={s.price}>{total}€</p>
                {openPayment?
                (
                    <div>
                        <button 
                            type='button'
                            className={s.paymentBtn}
                        >
                            Payer à la livraison
                        </button>
                        <PayPalScriptProvider
                            options={{
                            'client-id': 'AbhjyKvE946AIvocAb4HNwYCWrdrujNPOaDBgUDaAENZQJh5EegrS7iSiYuGTA7e-FMbwvSA2aoZVxVR',
                            components: 'buttons',
                            currency: 'EUR',
                            "disable-funding": 'card,sofort,bancontact',
                            }}
                        >
                            <ButtonWrapper currency={currency} showSpinner={false} />
                        </PayPalScriptProvider>
                    </div>
                )
                :
                (
                    <button 
                        type='button' 
                        className={s.btn}
                        onClick={() => setConfirm(true)}
                    >
                        Valider
                    </button>
                )}
            </div>): null}
        </div>
    </div>
  )
}

export default CartList