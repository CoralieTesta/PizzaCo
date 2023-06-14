import React, { useState } from 'react';
import s from "./style.module.css"
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ButtonWrapper from '../ButtonWrapper/ButtonWrapper';
import { useNavigate } from 'react-router-dom';
import { OrderAPI } from '../../../api/order-api';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../../store/cart-slice';
import { useEffect } from 'react';
import PizzaLoader from '../PizzaLoader/PizzaLoader';

const FormCustomer = ({setCancel, total}) => {
    const pizzas = useSelector(store => store.CART.pizzas)
    const pastas = useSelector(store => store.CART.pasta)
    const desserts = useSelector(store => store.CART.desserts)
    const dispatch = useDispatch()
    const currency = "EUR";
    const navigate = useNavigate()
    const [order, setOrder] = useState({customer: "", address: ""})
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        street: '',
        number: '',
        city: '',
        postalCode: ''
    });
    const [id, setId] = useState()

  useEffect(() => {
    if (formSubmitted) {
      setIsLoading(true);
      // Attendre pendant 4 secondes
      const newOrder = {customer: formData.firstName+" "+formData.lastName,
                    address: formData.street+ " " + formData.number + ", " + formData.postalCode + " " + formData.city}
      setOrder(newOrder)
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [formSubmitted]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

    function createOrder(order) {
        OrderAPI.create(order)
            .then(response => {
                const orderId = response.data._id;
                /*emailjs.send("service_7evmqfl", "template_t4h76tm", 
                    {   message:"r", 
                        email:"coralie.testa@hotmail.com",
                        id:orderId,
                        address:order.address,
                        method:"Pas encore effectué",
                        total:total
                    }, "4hYGBSCs6ktE4hGtY");*/
                dispatch(reset())
                window.scrollTo(0, 0);
                navigate(`/order/${orderId}`)
            })
            .catch(error => {
                console.log("error",error)
            })
    }

  const onClickDeliveryHandler = () => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir passer cette commande ?');
    if (confirmed) {
        const pizzasWithoutId =pizzas.map(pizza => {
            const {_id, ...pizzaWithoutId} =pizza
            return(pizzaWithoutId)
        })
        const pastasWithoutId =pastas.map(pasta => {
            const {_id, ...pastaWithoutId} =pasta
            return(pastaWithoutId)
        })
        const dessertsWithoutId =desserts.map(pizza => {
            const {_id, ...dessertWithoutId} =pizza
            return(dessertWithoutId)
        })
        createOrder( { 
            ...order,
            pizzas:pizzasWithoutId,
            pasta: pastasWithoutId,
            desserts:dessertsWithoutId,
            total: total,
            method:0,//0 for cash
        })
        return (
            <div>
                <PizzaLoader/>
            </div>
        )
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Faire quelque chose avec les données du formulaire
    window.scrollTo(0, 0);
    setFormSubmitted(true)
  };  

  if(formSubmitted) {
    return(
        <div className={s.container}>
            <div className={s.form}>
                <div className={s.attention}>
                    Choisissez votre moyen de payement
                </div>
                <div className={s.toPay}>
                    À payer: {total}€
                </div>
                <div>
                    {isLoading &&
                            <div className={s.loader}>
                                <PizzaLoader/>
                            </div>
                    }
                    <button 
                        type='button'
                        className={s.paymentBtn}
                        onClick={onClickDeliveryHandler}
                    >
                        Payer à la livraison
                    </button>
                    <PayPalScriptProvider
                        className={s.paypalBtn}
                        options={{
                        'client-id': 'AbhjyKvE946AIvocAb4HNwYCWrdrujNPOaDBgUDaAENZQJh5EegrS7iSiYuGTA7e-FMbwvSA2aoZVxVR',
                        components: 'buttons',
                        currency: 'EUR',
                        "disable-funding": 'sofort,bancontact',
                        }}
                    >
                        <ButtonWrapper currency={currency} showSpinner={false} order={order} />
                    </PayPalScriptProvider>

                    <button 
                        type='button'
                        className={s.cancelBtn}
                        onClick={() => {window.scrollTo(0, 0); setCancel(true)}}
                    >
                        Retourner au panier
                    </button>
                </div>
            </div>
        </div>
    )
  }

  return (
    <div className={s.container}>
        Veuillez remplir le formulaire ci-dessous avec vos coordonnées personnelles
        <form className={s.form} onSubmit={handleSubmit}>
            <div className={s.line}>
                <div className={s.formItem}>
                    <label htmlFor="firstName">Prénom :</label>
                    <input
                    className={s.input}
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    />
                </div>
                <div className={s.formItem}>
                    <label htmlFor="lastName">Nom :</label>
                    <input
                    className={s.input}
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    />
                </div>
        </div>
        <div className={s.line}>
            <div className={s.formItem}>
                <label htmlFor="street">Rue :</label>
                <input
                className={s.input}
                style={{width:"300px"}}
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                required
                />
            </div>
            <div className={s.formItem}>
                <label htmlFor="number">Numéro :</label>
                <input
                className={s.input}
                style={{width:"60px"}}
                type="number"
                id="number"
                name="number"
                min={1}
                value={formData.number}
                onChange={handleChange}
                required
                />
            </div>
        </div>
        <div className={s.line}>
            <div className={s.formItem}>
                <label htmlFor="postalCode">Code postal :</label>
                <input
                className={s.input}
                style={{width:"80px"}}
                type="number"
                min={1}
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                />
            </div>
            <div className={s.formItem}>
                <label htmlFor="city">Ville :</label>
                <input
                className={s.input}
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                />
            </div>
        </div>
        <button type='button' onClick={() => {window.scrollTo(0, 0); setCancel(true);}} style={{marginRight:"10px"}} className={s.btn}>Retour</button>
        <button type="submit" className={s.btn}>Soumettre</button>
        </form>
    </div>
  );
};

export default FormCustomer;
