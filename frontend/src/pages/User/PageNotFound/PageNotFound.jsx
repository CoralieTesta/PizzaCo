import { NotFound } from "../../../components/User/NotFound/NotFound";
import { useDispatch } from 'react-redux';
import { setDesserts, setPasta, setPizzas, setQuantity, setTotal } from '../../../store/cart-slice'
import { useEffect } from 'react';

export function PageNotFound() {
    const dispatch=useDispatch()
    useEffect(() => {
        const data = localStorage.getItem('cart')
        const parseData = JSON.parse(data)
        if(parseData) {
          if(parseData.payload) {
            dispatch(setPizzas(parseData.payload.pizzas))
            dispatch(setPasta(parseData.payload.pasta))
            dispatch(setDesserts(parseData.payload.desserts))
            dispatch(setTotal(parseData.payload.total))
            dispatch(setQuantity(parseData.payload.quantity))
          }
          else {
            dispatch(setPizzas(parseData.pizzas))
            dispatch(setPasta(parseData.pasta))
            dispatch(setDesserts(parseData.desserts))
            dispatch(setTotal(parseData.total))
            dispatch(setQuantity(parseData.quantity))
          }     
      }
      }, [])
    return(
        <div>
            <NotFound />
        </div>
    )
}