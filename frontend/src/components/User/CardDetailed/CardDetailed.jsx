import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';
import { addDessert, addPasta, addPizza } from '../../../store/cart-slice';
import { GiFullPizza, GiHotMeal } from "react-icons/gi";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { v4 as uuidv4 } from 'uuid';


import s from "./style.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { BsFillCartPlusFill } from 'react-icons/bs';

const CardDetailed = ({food, type}) => {
    const pizzas = useSelector(store => store.CART.pizzas)
    const navigate = useNavigate()
    const [isAddingToCart, setIsAddingToCart] = useState(false);

    const [removedIngredients, setRemovedIngredients] = useState([]);
    const [extrasSelected,setExtrasSelected] = useState([])
    const extraPrice = extrasSelected.reduce((acc, currentValue) => acc + currentValue.price,
    0)
    const dispatch = useDispatch()
    const [size, setSize] = useState(1)
    const [quantity, setQuantity] = useState(1)

    const handleChangeExtra = (event, extra, isChecked) => {
        var newExtrasSelected;
        if(!isChecked) {
            newExtrasSelected = extrasSelected.concat(extra)
        }
        else {
            newExtrasSelected = extrasSelected.filter(extraSelected => extraSelected !== extra)
        }
        setExtrasSelected(newExtrasSelected)
    }
    const handleChangeIngredient = (event, ingredient, isChecked) => {
        var newRemovedIngredients;
        if(isChecked) {
            newRemovedIngredients = removedIngredients.concat(ingredient)
        }
        else {
            newRemovedIngredients = removedIngredients.filter(removedIngredient => removedIngredient !== ingredient)
        }
        setRemovedIngredients(newRemovedIngredients)
    }

    if(food) {
        const {_id, title, desc, image, prices, price, extras, ingredients} = food
    
        const totalPrice = price ? (price + extraPrice) : (prices[size] + extraPrice)

        const handleClick = () => {
            setIsAddingToCart(true);
            const extraOptions = extrasSelected.reduce(
                (acc, currentValue) => [...acc, currentValue.text],
                []
            );
            const uniqueId = uuidv4(); // Génère un identifiant unique
    
            setTimeout(() => {
                if(type=== "pizza") {
                    dispatch(addPizza({ title, 'extras': extraOptions, price: totalPrice, quantity, size, _id: `${_id}-${uniqueId}`, removedIngredients }))
                }
                else if(type === "pasta"){
                    dispatch(addPasta({ title, 'extras': extraOptions, price: totalPrice, quantity, size, _id: `${_id}-${uniqueId}`, removedIngredients }))
                }
                else {//dessert
                    dispatch(addDessert({ title, price, quantity, _id: `${_id}-${uniqueId}` }));
                }
                window.scrollTo(0, 0);
                navigate('/');
                window.scrollTo(0, 0);
            }, 800); // Temps d'attente avant d'ajouter le produit au panier (500 ms dans cet exemple)
        };

        const handleQuantityChange = (e) => {
            const value = parseInt(e.target.value);
            if (value > 0) {
              setQuantity(value);
            }
          };
        
        return(
            <div className={s.container}>
                <div className={s.imgContainer}>
                    <img src={image} className={s.img} alt="" />
                </div>
                <div className={s.textContainer}>
                    <div className={s.titleContainer}>
                        <h2 className={s.title}>{title}</h2>
                        <div className={s.price}>€{totalPrice*quantity}</div>
                    </div>
                    {type=== "dessert" ?
                    (<div className={s.desc}>
                        {desc}
                    </div>)
                    :
                    (<>
                        <div className={s.checkContainer}>
                        {ingredients.map((ingredient) => {
                            var isChecked =!removedIngredients.includes(ingredient)
                            return(
                                <div 
                                    key={ingredient} 
                                    className={s.checkItem}
                                    onClick={(event) => handleChangeIngredient(event, ingredient, isChecked)}
                                >
                                    { isChecked ? <ImCheckboxChecked className={s.checkIcon}/> : <ImCheckboxUnchecked className={s.checkIcon}/> }
                                    <span className={s.label}>{ingredient}</span>
                                </div>
                            )
                        })} 
                        </div>
                        <h3 className={s.sizeTitle}>
                            Choisis la taille
                        </h3>
                        <div className={s.sizeContainer}>
                            <div className={s.sizeItem} onClick={() => setSize(0)}>
                                {type === "pizza" &&
                                    <GiFullPizza 
                                        id='small' 
                                        style={{color:size===0 ? "red" : "black"}}
                                        size={40}
                                    />
                                }
                                {type === "pasta" &&
                                    <GiHotMeal
                                        id='small' 
                                        style={{color:size===0 ? "red" : "black"}}
                                        size={40}
                                    />
                                }
                                <label className={s.label} htmlFor='small'>Petite</label>
                            </div>
                            <div className={s.sizeItem} onClick={() => setSize(1)}>
                                {type === "pizza" &&
                                    <GiFullPizza 
                                    id='middle' 
                                    style={{color:size===1 ? "red" : "black"}}
                                    size={60}
                                    />
                                }
                                {type === "pasta" &&
                                    <GiHotMeal
                                    id='middle' 
                                    style={{color:size===1 ? "red" : "black"}}
                                    size={60}
                                    />
                                }
                                <label className={s.label} htmlFor='middle'>Moyenne</label>
                            </div>
                            <div className={s.sizeItem} onClick={() => setSize(2)}>
                                {type === "pizza" &&
                                    <GiFullPizza 
                                    id='big' 
                                    style={{color:size===2 ? "red" : "black"}}
                                    size={80}
                                    />
                                }
                                {type === "pasta" &&
                                    <GiHotMeal
                                    id='big' 
                                    style={{color:size===2 ? "red" : "black"}}
                                    size={80}
                                    />
                                }
                                <label className={s.label} htmlFor='big'>Grande</label>
                            </div>
                        </div>
                        <h3>
                            Choisis des ingrédients supplémentaires
                        </h3>
                        <div className={s.checkContainer}>
                            {extras.map((extra) => {
                                var isChecked =extrasSelected.includes(extra)
                                return(
                                <div 
                                    key={extra.text} 
                                    className={s.checkItem}
                                    onClick={(event) => handleChangeExtra(event, extra, isChecked)}>
                                    { isChecked ? <ImCheckboxChecked className={s.checkIcon}/> : <ImCheckboxUnchecked className={s.checkIcon}/> }
                                    <span className={s.label}>{extra.text} <span className={s.extraPrice}>({extra.price}€)</span></span>
                                </div>
                            )})}
                        </div>

                    </>)

                    }
                    
                    <div className={s.qttContainer}>
                        <input 
                            className={s.qtt}
                            onChange={handleQuantityChange} 
                            type='number' 
                            defaultValue={1}
                            min={1}
                        />
                        {isAddingToCart?
                        (
                        <BsFillCartPlusFill size={35}  style={{color: "green"}}/>
                        )
                        :
                        (
                        <button 
                            type='button' 
                            className={s.btn} 
                            onClick={handleClick}>
                            Ajouter
                        </button>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default CardDetailed