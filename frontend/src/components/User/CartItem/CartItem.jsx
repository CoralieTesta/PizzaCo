import React from 'react'
import { Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import s from "./style.module.css"
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
import { ImBin } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { addOne, addOneDessert, addOnePasta, addOnePizza, deleteFood, removeOne, removeOneDessert, removeOnePasta, removeOnePizza } from '../../../store/cart-slice';
import { AiOutlineMinus, AiOutlineMinusCircle, AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai';

const CartItem = ({food, type, showItems, showPrices}) => {
    const {title, quantity, price, extras, size, removedIngredients, _id} = food
    const dispatch = useDispatch()
    let sizeName=""
    if(size === 0) {sizeName="Petite"}
    else if(size === 1) {sizeName="Moyenne"}
    else{sizeName="Grande"}
  return (
    <Tr className={s.tr}>
        <Td className={s.td}>{title}</Td>
        {type=== "dessert" ?
          (<Td className={s.td}> </Td>):(<Td className={s.td}>{sizeName}</Td>)
        }
        {type=== "dessert" ?
          (<Td className={s.td}> </Td>):(<Td className={s.td}><ul>{extras.map((extra)=> (<li key={extra}>{extra}</li>))}</ul></Td>)
        }
        {type=== "dessert" ?
          (<Td className={s.td}> </Td>):(<Td className={s.td}><ul>{removedIngredients.map((ingredient)=> (<li key={ingredient}>{ingredient}</li>))}</ul></Td>)
        }
        {showPrices &&
          <Td className={s.td}>{price}€</Td>
        }
        <Td className={s.td}>
          {quantity} 
          {showItems && type==="pizza" &&
            <>
            <AiOutlineMinus
              onClick={() => dispatch(removeOnePizza({_id:_id,  price:price, type:type}))}
              className={s.minusIcon}
            /> 
            <AiOutlinePlus
              onClick={() => dispatch(addOnePizza({_id:_id, price:price}))}
              className={s.plusIcon}
          />
          </>
          }
          {showItems && type==="pasta" &&
            <>
            <AiOutlineMinus
              onClick={() => dispatch(removeOnePasta({_id:_id,  price:price, type:type}))}
              className={s.minusIcon}
            /> 
            <AiOutlinePlus
              onClick={() => dispatch(addOnePasta({_id:_id, price:price}))}
              className={s.plusIcon}
          />
          </>
          }
          {showItems && type==="dessert" &&
            <>
            <AiOutlineMinus
              onClick={() => dispatch(removeOneDessert({_id:_id,  price:price, type:type}))}
              className={s.minusIcon}
            /> 
            <AiOutlinePlus
              onClick={() => dispatch(addOneDessert({_id:_id, price:price}))}
              className={s.plusIcon}
          />
          </>
          }
        </Td>
        {showPrices &&
          <Td className={s.td}>{quantity*price}€</Td>
        }
        {showItems &&
          <Td><ImBin 
            className={s.binIcon} 
            size={25}
            onClick={() => dispatch(deleteFood({food, type}))}
          /></Td>
        }
    </Tr>
  )
}

export default CartItem