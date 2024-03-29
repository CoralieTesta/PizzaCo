import { useEffect, useRef, useState } from "react"
import { AiOutlineCloseCircle, AiOutlineMenu, AiOutlineHome } from "react-icons/ai"
import { RiCake3Line } from "react-icons/ri";
import { NavLink} from "react-router-dom"
import { AiOutlineShoppingCart } from "react-icons/ai";
import s from "./style.module.css"
import { CiPizza } from "react-icons/ci";
import { GiHotMeal, GiPizzaSlice } from "react-icons/gi";
import { TbMessageCircle } from "react-icons/tb";
import { useSelector } from "react-redux";

export function NavASmall() {
    const [isShown, setIsShown] = useState(false)
    const [isMenuShown, setIsMenuShown] = useState(false)
    const menuRef = useRef(null);
    const quantity = useSelector((store) => store.CART.quantity);

    useEffect(() => {
        function handleClickOutside(event) {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuShown(false);
          }
        }
        document.addEventListener("click", handleClickOutside);
        return () => {
          document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return(
        <nav className={s.nav}>
            <NavLink to="/" className={s.pizzaIcon}><div style={{color:"white"}}><CiPizza size={40}/>PizzaCo</div></NavLink>
            <NavLink to="/cart" className={s.pizzaIcon}>
                <div style={{ position: "relative" }}>
                    <div style={{ color: "white" }}>
                    <AiOutlineShoppingCart
                        size={40}
                        className={s.descriptiveIcon}
                        style={{ paddingBottom: "5px" }}
                    />
                    </div>
                    <div className={s.cartItemCount}>{quantity}</div>
                </div>
            </NavLink>

            <AiOutlineMenu  
                className={s.menuIcon} 
                size={25}
                onClick={(event)=> {event.stopPropagation(); setIsMenuShown(true)}}
            />
            
            {isMenuShown &&
                    <div 
                        ref={menuRef}
                        onClick={()=> setIsMenuShown(false)}
                        className={s.menu}
                    >
                        <div className={s.close}>
                            <AiOutlineCloseCircle 
                                className={s.closeIcon} 
                                size={25}
                                onClick={()=> {setIsMenuShown(false); setIsShown(false);}}
                            />
                        </div>
                        <ul className={s.ul}>
                            <li className={s.liFirst}>
                                <NavLink to="/" className={s.link}>
                                    <AiOutlineHome 
                                        size={30} 
                                        className={s.descriptiveIcon} 
                                        style={{paddingBottom:"5px"}}
                                    /> 
                                    Accueil
                                </NavLink>
                            </li>
                            <li className={s.li}>
                                <NavLink to="/pizzas" className={s.link}>
                                    <GiPizzaSlice 
                                        size={32} 
                                        className={s.descriptiveIcon} 
                                        style={{paddingBottom:"5px"}}
                                    /> 
                                    Pizzas
                                </NavLink>
                            </li>
                            <li className={s.li}>
                                <NavLink to="/pates" className={s.link}>
                                    <GiHotMeal 
                                        size={32} 
                                        className={s.descriptiveIcon} 
                                        style={{paddingBottom:"5px"}}
                                    /> 
                                    Pâtes
                                </NavLink>
                            </li>
                            <li className={s.li}>
                                <NavLink to="/desserts" className={s.link}>
                                    <RiCake3Line 
                                        size={30} 
                                        className={s.descriptiveIcon} 
                                        style={{paddingBottom:"5px"}}
                                    /> 
                                    Desserts
                                </NavLink>
                            </li>
                            <li className={s.li}>
                                <NavLink to="/booking" className={s.link}>
                                    <TbMessageCircle 
                                        size={30} 
                                        className={s.descriptiveIcon} 
                                        style={{paddingBottom:"5px"}}
                                    /> 
                                    Réserver
                                </NavLink>
                            </li>
                            <li className={s.li}>
                                <NavLink to="/contact" className={s.link}>
                                    <TbMessageCircle 
                                        size={30} 
                                        className={s.descriptiveIcon} 
                                        style={{paddingBottom:"5px"}}
                                    /> 
                                    Contact
                                </NavLink>
                            </li>
                            <li className={s.li}>
                                <NavLink to="/cart" className={s.link}>
                                    <AiOutlineShoppingCart 
                                        size={32} 
                                        className={s.descriptiveIcon} 
                                        style={{paddingBottom:"5px"}}
                                    /> 
                                    Panier
                                </NavLink>
                            </li>
                        </ul>
                    </div> 
            }
        </nav>
    )
}