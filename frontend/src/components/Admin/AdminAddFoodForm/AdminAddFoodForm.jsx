import React, { useState } from 'react';
import { PizzaAPI } from '../../../api/pizza-api';
import 'bootstrap/dist/css/bootstrap.min.css';
import s from "./style.module.css"
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { PastaAPI } from '../../../api/pasta-api';
import axios from 'axios';
import { DessertAPI } from '../../../api/dessert-api';

const AdminAddFoodForm = ({foodList, setFoodList, setShowForm, type}) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState('');
  const [priceSmall, setPriceSmall] = useState(0)
  const [priceMiddle, setPriceMiddle] = useState(0)
  const [priceBig, setPriceBig] = useState(0)
  const [price, setPrice] = useState(0)
  const [ingredients, setIngredients] = useState([]);
  const [extras, setExtras] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "uploads");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dfaz49lpc/image/upload",
        data
      );
      const { url } = uploadRes.data;
      // Construire l'objet pizza à envoyer au backend
    var food
    if(type === "dessert") {
      food = {
        title,
        desc,
        image:url,
        price:price,
      };
    }
    else {
      food = {
        title,
        desc,
        image:url,
        prices:[priceSmall, priceMiddle, priceBig],
        ingredients,
        extras,
      };
    }
    if(type==="pizza"){
      PizzaAPI.create(food)
          .then((id) => {
          const newFoodList = [...foodList, { _id:id, ...food }];
          setFoodList(newFoodList);
          })
          .catch((error) => {
            console.error(error);
          });
    }
    else if(type==="pasta"){
      PastaAPI.create(food)
          .then((id) => {
          const newFoodList = [...foodList, { _id:id, ...food }];
          setFoodList(newFoodList);
          })
          .catch((error) => {
            console.error(error);
          });
    }
    else {//dessert
      DessertAPI.create(food)
          .then((id) => {
          const newFoodList = [...foodList, { _id:id, ...food }];
          setFoodList(newFoodList);
          })
          .catch((error) => {
            console.error(error);
          });
    }
    setShowForm(false)
    } 
    catch (err) {
      console.log(err);
    }     
    
  };


  const handleIngredientChange = (e, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = e.target.value;
    setIngredients(newIngredients);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const handleExtraOptionChange = (e, index) => {
    const { name, value } = e.target;
    const newExtras = [...extras];
    newExtras[index] = {
      ...newExtras[index],
      [name]: value,
    };
    setExtras(newExtras);
  };

  const handleRemoveExtra = (index) => {
    const newExtras = [...extras];
    newExtras.splice(index, 1);
    setExtras(newExtras);
  };

  const handleAddExtraOption = () => {
    setExtras([...extras, { text: '', price: 0 }]);
  };

  return (
    <form 
        onSubmit={handleSubmit}
        className={s.form}
    >
      <div className="mb-3">
        <h2>Création</h2>
        <label htmlFor="title" className="form-label">
          Nom: 
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="desc" className="form-label">
          Description:
          <textarea
            className="form-control"
            id="desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </label>
        <br />
        <label htmlFor="image" className="form-label">
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <br />
        {type === 'dessert'?
          (<label htmlFor="priceSmall" className="form-label">
              Prix:
              <input
                type="number"
                className="form-control"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>
          )
          :
          (<>
            <label htmlFor="priceSmall" className="form-label">
              Prix (petite):
              <input
                type="number"
                className="form-control"
                id="priceSmall"
                value={priceSmall}
                onChange={(e) => setPriceSmall(e.target.value)}
                required
              />
            </label>
            <br />
            <label htmlFor="priceMiddle" className="form-label">
              Prix (moyenne):
              <input
                type="number"
                className="form-control"
                id="priceMiddle"
                value={priceMiddle}
                onChange={(e) => setPriceMiddle(e.target.value)}
                required
              />
            </label>
            <br />
            <label htmlFor="priceBig" className="form-label">
              Prix (grande):
              <input
                type="number"
                className="form-control"
                id="priceBig"
                value={priceBig}
                onChange={(e) => setPriceBig(e.target.value)}
                required
              />
            </label>

            <br />

            <label className="form-label">
              Ingrédients:
              {ingredients.map((ingredient, index) => (
                <div key={index} className={s.ingredientContainer}>
                  <input
                    type="text"
                    className="form-control"
                    value={ingredient}
                    onChange={(e) => handleIngredientChange(e, index)}
                    required
                  />
                  <AiOutlineCloseCircle
                    size={30}
                    className={s.removeIcon}
                    onClick={() => handleRemoveIngredient(index)}
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary"
                style={{marginLeft: "5px"}}
                onClick={() => setIngredients([...ingredients, ''])}
              >
                Ajouter un ingrédient
              </button>
            </label>
            <br />
            <label className="form-label">
              Suppléments (Nom + Prix):
              {extras.map((option, index) => (
                <div className={s.extraInputContainer} key={index}>
                    <div>
                        <input
                            type="text"
                            placeholder='nom'
                            className="form-control"
                            name="text"
                            value={option.text}
                            onChange={(e) => handleExtraOptionChange(e, index)}
                            required
                        />
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            value={option.price}
                            placeholder="Prix (€)"
                            onChange={(e) => handleExtraOptionChange(e, index)}
                            required
                        />
                    </div>
                    <AiOutlineCloseCircle
                        size={30}
                        className={s.removeIcon}
                        onClick={() => handleRemoveExtra(index)}
                    />
                </div>
              ))}
              <button
                type="button"
                className="btn btn-secondary"
                style={{marginLeft: "5px"}}
                onClick={handleAddExtraOption}
              >
                Ajouter un supplément
              </button>
            </label>
            </>)
        }

        <br />
        <button type="submit" className="btn btn-primary">
          Ajouter
        </button>
      </div>
    </form>
  );
  
};

export default AdminAddFoodForm;
