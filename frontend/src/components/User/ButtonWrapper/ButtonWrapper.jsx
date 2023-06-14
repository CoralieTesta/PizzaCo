import { useNavigate } from "react-router-dom";
import { reset } from "../../../store/cart-slice";
import s from "./style.module.css"
import PizzaLoader from "../PizzaLoader/PizzaLoader";

const { usePayPalScriptReducer, PayPalButtons } = require("@paypal/react-paypal-js");
const { useEffect } = require("react");
const { OrderAPI } = require("../../../api/order-api");
const { useSelector, useDispatch } = require("react-redux");

const ButtonWrapper = ({ currency, showSpinner, order }) => {//order contient customer et address
  const pizzas = useSelector(store => store.CART.pizzas)
  const pasta = useSelector(store => store.CART.pasta)
  const desserts = useSelector(store => store.CART.desserts)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function createOrder(order) {
      OrderAPI.create(order)
        .then(response => {
          const orderId = response.data._id;
          /*emailjs.send("service_7evmqfl", "template_t4h76tm", 
              {   message:"r", 
                  email:"coralie.testa@hotmail.com",
                  id:orderId,
                  address:order.address,
                  method:"Effectué avec Paypal",
                  total:total
              }, "4hYGBSCs6ktE4hGtY");*/
          dispatch(reset())
          navigate(`/order/${orderId}`)
        })
        .catch(error => {
          console.log("error")
        })
        return (
          <div>
              <PizzaLoader/>
          </div>
      )
  }
  const total = useSelector(store => store.CART.total)

  // This values are the props in the UI
  const amount = total;
  const style = {"layout":"vertical"};
  const [{ options, isPending }, dispatch2] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch2({
      type: 'resetOptions',
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <div className={s.container}>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={(data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount
                  }
                }
              ]
            })
            .then(orderId => {
              // Your code here after create the order
              return orderId;
            });
        }}
        onApprove={function(data, actions) {
          const pizzasWithoutId =pizzas.map(pizza => {
            const {_id, ...pizzaWithoutId} =pizza
            return(pizzaWithoutId)
        })
        const pastasWithoutId =pasta.map(pasta => {
            const {_id, ...pastaWithoutId} =pasta
            return(pastaWithoutId)
        })
        const dessertsWithoutId =desserts.map(pizza => {
            const {_id, ...dessertWithoutId} =pizza
            return(dessertWithoutId)
        })
          return actions.order.capture().then(function(details) {
            createOrder( { 
              ...order,
              pizzas:pizzasWithoutId,
              pasta:pastasWithoutId,
              desserts:dessertsWithoutId,
              total: total,
              method:1,//1 for paypal
          })
          });
        }}
      />
    </div>
  );
};

export default ButtonWrapper