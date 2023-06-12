import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { DessertAPI } from '../../../api/dessert-api';
import FoodList from '../../../components/User/FoodList/FoodList';
import { useDispatch, useSelector } from 'react-redux';
import { setDesserts, setPasta, setPizzas, setQuantity, setTotal } from '../../../store/cart-slice';
import PizzaLoader from '../../../components/User/PizzaLoader/PizzaLoader';
import { setDessertListMenu } from '../../../store/menu-slice';

const Desserts = () => {
  const [dessertList, setDessertList] = useState();
  const dispatch = useDispatch();
  const dessertListMenu = useSelector(store => store.MENU.dessertListMenu)

  useEffect(() => {
    async function getAllDesserts() {
      const desserts = await DessertAPI.getAll();
      setDessertList(desserts);
      dispatch(setDessertListMenu(desserts))
    }
    if(dessertListMenu.length === 0) {
      getAllDesserts();
    }
    else {
      setDessertList(dessertListMenu)
    }
    const data = localStorage.getItem('cart');
    const parseData = JSON.parse(data);

    if (parseData) {
      if (parseData.payload) {
        dispatch(setPizzas(parseData.payload.pizzas));
        dispatch(setPasta(parseData.payload.pasta));
        dispatch(setDesserts(parseData.payload.desserts));
        dispatch(setTotal(parseData.payload.total));
        dispatch(setQuantity(parseData.payload.quantity));
      } else {
        dispatch(setPizzas(parseData.pizzas));
        dispatch(setPasta(parseData.pasta));
        dispatch(setDesserts(parseData.desserts));
        dispatch(setTotal(parseData.total));
        dispatch(setQuantity(parseData.quantity));
      }
    }

  }, []);

  if (dessertList) {
    return (
      <div>
        <FoodList list={dessertList} type="dessert" />
      </div>
    );
  } else {
    return (
      <div>
        <PizzaLoader />
      </div>
    );
  }
};

export default Desserts;
