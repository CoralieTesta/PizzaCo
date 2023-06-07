import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pizzas: [],
  pasta: [],
  desserts: [],
  quantity:0,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setPizzas: (currentState, action) => {
      currentState.pizzas= action.payload
    },
    setPasta: (currentState, action) => {
      currentState.pasta= action.payload
    },
    setDesserts: (currentState, action) => {
      currentState.desserts= action.payload
    },
    setTotal: (currentState, action) => {
      currentState.total= action.payload
    },
    setQuantity: (currentState, action) => {
      currentState.quantity= action.payload
    },
    addPizza: (currentState, action) => {//action c'est les arguments donnés qd on appelle la fct
      var isInCart=false
      const newPizzas = currentState.pizzas.map((pizza) => {
        if (
          action.payload.title === pizza.title &&
          action.payload.size === pizza.size &&
          action.payload.extras.length === pizza.extras.length &&
          action.payload.extras.every((extras) => pizza.extras.includes(extras)) &&
          action.payload.removedIngredients.length === pizza.removedIngredients.length &&
          action.payload.removedIngredients.every((removedIngredient) => pizza.removedIngredients.includes(removedIngredient))
        ) {
          var newPizza = { ...pizza, quantity: pizza.quantity * 1 + action.payload.quantity * 1 };
          isInCart = true;
          return newPizza;
        }
        return pizza;
      });
            
      if(isInCart){
        currentState.pizzas= newPizzas
      }
      else{
        currentState.pizzas.push(action.payload);
      }
      currentState.quantity += 1*action.payload.quantity;
      currentState.total += action.payload.price * action.payload.quantity;
      localStorage.setItem("cart", JSON.stringify(currentState))
    },

    addOnePizza: (currentState, action) => {
      const newPizzas = currentState.pizzas.map(pizza => {
        if(pizza._id === action.payload._id) {
          const newPizza = {...pizza, quantity: pizza.quantity*1+1}
          return(
            newPizza
          )
        }
        else {
          return(
            pizza
          )
        }
      } )
      currentState.quantity ++
      currentState.total += action.payload.price
      currentState.pizzas= newPizzas
      localStorage.setItem("cart", JSON.stringify(currentState))
    },

    removeOnePizza: (currentState, action) => {
      const pizzaIndex = currentState.pizzas.findIndex(
        (pizza) => pizza._id === action.payload._id
      );
    
      if (pizzaIndex !== -1) {
        const pizza = currentState.pizzas[pizzaIndex];
    
        if (pizza.quantity === 1) {
          currentState.pizzas.splice(pizzaIndex, 1);
          currentState.quantity -= pizza.quantity;
          currentState.total -= pizza.price;
          currentState = deleteFood(currentState, action);
        } else {
          currentState.pizzas[pizzaIndex] = {
            ...pizza,
            quantity: pizza.quantity - 1,
          };
          currentState.quantity--;
          currentState.total -= pizza.price;
        }
      }
      localStorage.setItem("cart", JSON.stringify(currentState))
    },

    addPasta: (currentState, action) => {
      var isInCart=false
      const newPasta = currentState.pasta.map((pasta) => {
        if (
          action.payload.title === pasta.title &&
          action.payload.size === pasta.size &&
          action.payload.extras.length === pasta.extras.length &&
          action.payload.extras.every((extra) => pasta.extras.includes(extra)) &&
          action.payload.removedIngredients.length === pasta.removedIngredients.length &&
          action.payload.removedIngredients.every((removedIngredient) => pasta.removedIngredients.includes(removedIngredient))
        ) {
          var newPasta = { ...pasta, quantity: pasta.quantity * 1 + action.payload.quantity * 1 };
          isInCart = true;
          return newPasta;
        }
        return pasta;
      });
            
      if(isInCart){
        currentState.pasta= newPasta
      }
      else{
        currentState.pasta.push(action.payload);
      }
      currentState.quantity += 1*action.payload.quantity;
      currentState.total += action.payload.price * action.payload.quantity;
      localStorage.setItem("cart", JSON.stringify(currentState))
    },

    deleteFood: (currentState, action) => {
      if(action.payload.type === "pasta"){
        const newPasta =currentState.pasta.filter(pasta => pasta._id !== action.payload.food._id)
        currentState.pasta = newPasta
      }
      if(action.payload.type === "pizza"){
        const newPizza =currentState.pizzas.filter(pizza => pizza._id !== action.payload.food._id)
        currentState.pizzas = newPizza
        }

      if(action.payload.type === "dessert"){
        const newDessert =currentState.desserts.filter(dessert => dessert._id !== action.payload.food._id)
        currentState.desserts = newDessert
        }
      currentState.quantity -= 1*action.payload.food.quantity
      currentState.total -= action.payload.food.price * action.payload.food.quantity
      localStorage.setItem("cart", JSON.stringify(currentState))
  },

  addOnePasta: (currentState, action) => {
    const newPasta = currentState.pasta.map(pasta => {
      if(pasta._id === action.payload._id) {
        const newPasta = {...pasta, quantity: pasta.quantity*1+1}
        return(
          newPasta
        )
      }
      else {
        return(
          pasta
        )
      }
    } )
    currentState.quantity ++
    currentState.total += action.payload.price
    currentState.pasta= newPasta
    localStorage.setItem("cart", JSON.stringify(currentState))
  },

  removeOnePasta: (currentState, action) => {
    const pastaIndex = currentState.pasta.findIndex(
      (pasta) => pasta._id === action.payload._id
    );
  
    if (pastaIndex !== -1) {
      const pasta = currentState.pasta[pastaIndex];
  
      if (pasta.quantity === 1) {
        currentState.pasta.splice(pastaIndex, 1);
        currentState.quantity -= pasta.quantity;
        currentState.total -= pasta.price;
        currentState = deleteFood(currentState, action);
      } else {
        currentState.pasta[pastaIndex] = {
          ...pasta,
          quantity: pasta.quantity - 1,
        };
        currentState.quantity--;
        currentState.total -= pasta.price;
      }
    }
    localStorage.setItem("cart", JSON.stringify(currentState))
  },

  addDessert: (currentState, action) => {//action c'est les arguments donnés qd on appelle la fct
    var isInCart=false
    const newDesserts = currentState.desserts.map((dessert) => {
      if (action.payload.title === dessert.title) {
        var newDessert = { ...dessert, quantity: dessert.quantity * 1 + action.payload.quantity * 1 };
        isInCart = true;
        return newDessert;
      }
      return dessert;
    });
          
    if(isInCart){
      currentState.desserts= newDesserts
    }
    else{
      currentState.desserts.push(action.payload);
    }
    currentState.quantity += 1*action.payload.quantity;
    currentState.total += action.payload.price * action.payload.quantity;
    localStorage.setItem("cart", JSON.stringify(currentState))
  },

  addOneDessert: (currentState, action) => {
    const newDesserts = currentState.desserts.map(dessert => {
      if(dessert._id === action.payload._id) {
        const newDessert = {...dessert, quantity: dessert.quantity*1+1}
        return(
          newDessert
        )
      }
      else {
        return(
          dessert
        )
      }
    } )
    currentState.quantity ++
    currentState.total += action.payload.price
    currentState.desserts= newDesserts
    localStorage.setItem("cart", JSON.stringify(currentState))
  },

  removeOneDessert: (currentState, action) => {
    const dessertIndex = currentState.desserts.findIndex(
      (dessert) => dessert._id === action.payload._id
    );
  
    if (dessertIndex !== -1) {
      const dessert = currentState.desserts[dessertIndex];
  
      if (dessert.quantity === 1) {
        currentState.desserts.splice(dessertIndex, 1);
        currentState.quantity -= dessert.quantity;
        currentState.total -= dessert.price;
        currentState = deleteFood(currentState, action);
      } else {
        currentState.desserts[dessertIndex] = {
          ...dessert,
          quantity: dessert.quantity - 1,
        };
        currentState.quantity--;
        currentState.total -= dessert.price;
      }
    }
    localStorage.setItem("cart", JSON.stringify(currentState))
  },


    reset: (currentState) => {
      currentState.pizzas = []
      currentState.pasta = []
      currentState.desserts = []
      currentState.quantity = 0
      currentState.total = 0
      localStorage.setItem("cart", JSON.stringify(currentState))
    },
  },
});

export const {setPizzas, setPasta, setDesserts, setTotal, setQuantity, addPizza, deleteFood, addOnePizza, removeOnePizza, addPasta, addOnePasta, removeOnePasta, addDessert, addOneDessert, removeOneDessert, reset} = cartSlice.actions
export const cartReducer = cartSlice.reducer