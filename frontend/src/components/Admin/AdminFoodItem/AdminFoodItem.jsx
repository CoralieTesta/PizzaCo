import React, { useState } from 'react'
import { Tr, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import s from "./style.module.css"
import { PizzaAPI } from '../../../api/pizza-api';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { PastaAPI } from '../../../api/pasta-api';
import axios from 'axios';
import { DessertAPI } from '../../../api/dessert-api';

const AdminFoodItem = ({food, foodList, setFoodList, type}) => {
  const {_id, image, title, desc,  prices, price, ingredients, extras} = food
  const [showEditRadio, setShowEditRadio] = useState(false)
  const [selectedOption, setSelectedOption] = useState('');
  const [showOverlay, setShowOverlay] = useState(false)
  const [newTitle, setNewTitle] = useState(title);
  const [newDesc, setNewDesc] = useState(desc);
  const [newImage, setNewImage] = useState(image);
  const [newIngredients, setNewIngredients] = useState(ingredients)
  const [newExtras, setNewExtras] = useState(extras)
  const [newPrices, setNewPrices] = useState(prices)
  const [newPrice, setNewPrice] = useState(price)

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  function onDeleteHandler() {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')
    if(confirmed && type==="pizza"){
      PizzaAPI.delete(_id)
      const newFoodList = foodList.filter(foodItem => foodItem !== food)
      setFoodList(newFoodList)
    }

    else if(confirmed && type==="pasta"){
      PastaAPI.delete(_id)
      const newFoodList = foodList.filter(foodItem => foodItem !== food)
      setFoodList(newFoodList)
    }

    else {//dessert
      DessertAPI.delete(_id)
      const newFoodList = foodList.filter(foodItem => foodItem !== food)
      setFoodList(newFoodList)
    }
  }

  function onEditHandler() {
    setShowEditRadio(true)
    alert("Séléctionnez la case à modifier et appuyez sur 'Modifier cet élément'")
  }

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...newIngredients]; // Create a new array
    updatedIngredients.splice(index, 1); // Remove the ingredient at the specified index
    setNewIngredients(updatedIngredients); // Update the state with the new array
  };

  const handleRemoveExtra = (index) => {
    const editExtras = [...newExtras];
    editExtras.splice(index, 1);
    setNewExtras(editExtras);
  };

  function onCheckClickHandler() {
    const newFoodList=foodList
    const isSelecetedOption = (food) =>food._id === _id
    const index = newFoodList.findIndex(isSelecetedOption)
    if(type==="pizza"){
      switch(selectedOption) {
        case 'title':
            PizzaAPI.update(_id, {...food, title: newTitle})
            newFoodList[index].title=newTitle
            setFoodList(newFoodList)
            break;
        case 'desc':
          PizzaAPI.update(_id, {...food, desc: newDesc})
          newFoodList[index].desc=newDesc
          setFoodList(newFoodList)
          break;
        case 'image':
          PizzaAPI.update(_id, {...food, image: newImage})
          newFoodList[index].image=newImage
          setFoodList(newFoodList)
          break;
        case 'ingredients':
          PizzaAPI.update(_id, {...food, ingredients: newIngredients})
          newFoodList[index].ingredients=newIngredients
          setFoodList(newFoodList)
          break;
        case 'extras':
          PizzaAPI.update(_id, {...food, extras: newExtras})
          newFoodList[index].extras=newExtras
          setFoodList(newFoodList)
          break;
          case 'prices':
            PizzaAPI.update(_id, {...food, prices: newPrices})
            newFoodList[index].prices=newPrices
            setFoodList(newFoodList)
            break;
        default:
          console.log("error")
      }
    }
    else if(type==="pasta"){
      switch(selectedOption) {
        case 'title':
          PastaAPI.update(_id, {...food, title: newTitle})
          newFoodList[index].title=newTitle
          setFoodList(newFoodList)
          break;
        case 'desc':
          PastaAPI.update(_id, {...food, desc: newDesc})
          newFoodList[index].desc=newDesc
          setFoodList(newFoodList)
          break;
        case 'image':
          PastaAPI.update(_id, {...food, image: newImage})
          newFoodList[index].image=newImage
          setFoodList(newFoodList)
          break;
        case 'ingredients':
          PastaAPI.update(_id, {...food, ingredients: newIngredients})
          newFoodList[index].ingredients=newIngredients
          setFoodList(newFoodList)
          break;
        case 'extras':
          PastaAPI.update(_id, {...food, extras: newExtras})
          newFoodList[index].extras=newExtras
          setFoodList(newFoodList)
          break;
          case 'prices':
            PastaAPI.update(_id, {...food, prices: newPrices})
            newFoodList[index].prices=newPrices
            setFoodList(newFoodList)
            break;
        default:
          console.log("error")
      }
    }

    else { //dessert
      switch(selectedOption) {
        case 'title':
          DessertAPI.update(_id, {...food, title: newTitle})
          newFoodList[index].title=newTitle
          setFoodList(newFoodList)
          break;
        case 'desc':
          DessertAPI.update(_id, {...food, desc: newDesc})
          newFoodList[index].desc=newDesc
          setFoodList(newFoodList)
          break;
        case 'image':
          DessertAPI.update(_id, {...food, image: newImage})
          newFoodList[index].image=newImage
          setFoodList(newFoodList)
          break;
          case 'price':
            DessertAPI.update(_id, {...food, price: newPrice})
            newFoodList[index].price=newPrice
            setFoodList(newFoodList)
            break;
        default:
          console.log("error")
      }
    }

    setShowOverlay(false)
    setShowEditRadio(false)
  }

  const handleImageChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'uploads');
  
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dfaz49lpc/image/upload',
        formData
      );
      const imageUrl = response.data.url;
      setNewImage(imageUrl);
    } catch (error) {
      console.log(error);
    }
  };
  
  
return (
  <Tr className={s.tr}>
      <Td className={s.td}>
        <div className={s.id}>
          {_id}
        </div>
      </Td>
      <Td className={s.td}>
        {title}
        {showEditRadio &&
          (<div>
            <input
              type="radio"
              className={s.radio}
              value="title"
              checked={selectedOption === 'title'}
              onChange={handleOptionChange}
            />
          </div>)
        }
      </Td>
      <Td className={s.td}>
          <img src={image} className={s.img} alt="photo de nourriture"/>
          {showEditRadio &&
            (<div>
              <input
                type="radio"
                className={s.radio}
                value="image"
                checked={selectedOption === 'image'}
                onChange={handleOptionChange}
              />
            </div>)}
      </Td>
      <Td className={s.td}>
        {desc}
        {showEditRadio &&
          (<div>
            <input
              type="radio"
              className={s.radio}
              value="desc"
              checked={selectedOption === 'desc'}
              onChange={handleOptionChange}
            />
          </div>)}
      </Td>
      {type === "dessert"?
      (<>
      <Td className={s.td}>{price}€ 
          {showEditRadio &&
            (<div>
              <input
                type="radio"
                className={s.radio}
                value="price"
                checked={selectedOption === 'price'}
                onChange={handleOptionChange}
              />
            </div>)}
        </Td>
      </>)
      :
      (<>
          <Td className={s.td}>
          <ul>{ingredients.map((ingredient)=> (<li key={ingredient}>{ingredient}</li>))}</ul>
          {showEditRadio &&
            (<div>
              <input
                type="radio"
                className={s.radio}
                value="ingredients"
                checked={selectedOption === 'ingredients'}
                onChange={handleOptionChange}
              />
            </div>)}
          </Td>
          <Td className={s.td}>
            <ul>{extras.map((extra)=> (<li key={extra.text}>{extra.text} {extra.price}€</li>))}</ul>
            {showEditRadio &&
              (<div>
                <input
                  type="radio"
                  className={s.radio}
                  value="extras"
                  checked={selectedOption === 'extras'}
                  onChange={handleOptionChange}
                />
            </div>)}
          </Td>
          <Td className={s.td}>{prices[0]}€ {prices[1]}€ {prices[2]}€
            {showEditRadio &&
              (<div>
                <input
                  type="radio"
                  className={s.radio}
                  value="prices"
                  checked={selectedOption === 'prices'}
                  onChange={handleOptionChange}
                />
              </div>)}
          </Td>
      </>)
      }
      
      <Td>
      {showEditRadio?
        (<>
        <button 
          type='button'
          onClick={() => setShowOverlay(true)}
          className={s.editBtn}
        >
          Modifier cet élément
        </button>
        <button 
          type='button'
          onClick={() => setShowEditRadio(false)}
          className={s.cancelBtn}
        >
          Annuler
        </button>
        </>)
        :
        (<>
          <button 
            type='button'
            onClick={onEditHandler}
            className={s.editBtn}
          >
            Modifier
          </button>
          <button 
            type='button'
            onClick={onDeleteHandler}
            className={s.deleteBtn}
          >
              Supprimer
          </button>
        </>)
      }
      {showOverlay &&
      <div className={s.overlay}>
        <div className={s.overlayContent}>
          <button className={s.closeBtn} onClick={() => {setShowOverlay(false); setShowEditRadio(false)}}>x</button>
          <h3>Modification</h3>
          {selectedOption === "title" &&
            <>
              <label htmlFor="title" className="form-label">
                Nom: 
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={newTitle}
                  onChange={(e) => {setNewTitle(e.target.value)}}
                  required
                />
              </label>
              <div>
                <button
                  className={s.editBtn}
                  onClick={onCheckClickHandler}
                >
                  Valider
                </button>
              </div>
            </>}
            {selectedOption === "desc" &&
            <>
              <label htmlFor="desc" className="form-label">
                Description: 
                <textarea
                  //type="text"
                  className="form-control"
                  style={{width:"300px", height:"150px", maxWidth:"90%"}}
                  id="desc"
                  value={newDesc}
                  onChange={(e) => {setNewDesc(e.target.value)}}
                  required
                />
              </label>
              <div>
                <button
                  className={s.editBtn}
                  onClick={onCheckClickHandler}
                >
                  Valider
                </button>
              </div>
            </>}
            {selectedOption === "image" &&
            <>
              <label htmlFor="image" className="form-label">
                Image:
                <label htmlFor="image" className="form-label">
                  <input 
                    type="file" 
                    onChange={handleImageChange}
                  />
                </label>
              </label>
              <div>
                <button
                  className={s.editBtn}
                  onClick={onCheckClickHandler}
                >
                  Valider
                </button>
              </div>
            </>}
            {selectedOption === "ingredients" &&
            <div>
              <label htmlFor="ingredients" className="form-label">
                Ingrédients: 
                {
                  newIngredients.map((ingredient, i) => (
                    <div className={s.flex} key={`ingredient-${i}`}>
                      <input
                        type="text"
                        className="form-control"
                        id={`ingredient-${i}`}
                        value={newIngredients[i]}
                        onChange={(e) => {
                          const updatedIngredients = [...newIngredients];
                          updatedIngredients[i] = e.target.value;
                          setNewIngredients(updatedIngredients);
                        }}
                        required
                      />
                      <AiOutlineCloseCircle
                        size={35}
                        className={s.removeIcon}
                        onClick={() => handleRemoveIngredient(i)}
                      />
                    </div>
                  ))
                }

              </label>
              <div>
                <button 
                  className={s.cancelBtn}
                  style={{marginRight: "15px"}}
                  onClick={() => setNewIngredients([...newIngredients, ""])}
                >
                  + Ajouter
                </button>
                <button
                  className={s.editBtn}
                  onClick={onCheckClickHandler}
                >
                  Valider
                </button>
              </div>
            </div>}
            {selectedOption === "extras" &&
            <div>
              <label htmlFor="extras" className="form-label">
                Suppléments: 
                {
                  newExtras.map((extra,i) => {
                    return(<div className={s.flex} key={i}>
                    <input
                      type="text"
                      className="form-control"
                      id="extra"
                      value={newExtras[i].text}
                      onChange={(e) => {
                        const updatedExtras = [...newExtras];
                        updatedExtras[i].text = e.target.value;
                        setNewExtras(updatedExtras);
                      }}
                      required
                    />
                    <input
                      type="number"
                      className="form-control"
                      id="extra"
                      value={newExtras[i].price}
                      onChange={(e) => {
                        const updatedExtras = [...newExtras];
                        updatedExtras[i].price = e.target.value;
                        setNewExtras(updatedExtras);
                      }}
                      required
                    />
                    <AiOutlineCloseCircle
                      size={45}
                      className={s.removeIcon}
                      onClick={() => handleRemoveExtra(i)}
                    />
                    </div>)
                  })
                }
                
              </label>
              <div>
                <button 
                  className={s.cancelBtn}
                  style={{marginRight: "15px"}}
                  onClick={() => setNewExtras([...newExtras, {text:"", price:0}])}
                >
                  + Ajouter
                </button>
                <button
                  className={s.editBtn}
                  onClick={onCheckClickHandler}
                >
                  Valider
                </button>
              </div>
            </div>}
            {selectedOption === "price" &&
            <>
              <label htmlFor="price" className="form-label">
                Prix: 
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  value={newPrice}
                  onChange={(e) => {setNewPrice(e.target.value)}}
                  required
                />
              </label>
              <div>
                <button
                  className={s.editBtn}
                  onClick={onCheckClickHandler}
                >
                  Valider
                </button>
              </div>
            </>}
            {selectedOption === "prices" &&
            <div>
              <label htmlFor="prices" className="form-label">
                Prix: 
                {
                  newPrices.map((price,i) => {
                    return(<div className={s.flex} key={i}>
                    <input
                      type="number"
                      className="form-control"
                      id="prices"
                      value={newPrices[i]}
                      onChange={(e) => {
                        const updatedPrices = [...newPrices];
                        updatedPrices[i] = e.target.value;
                        setNewPrices(updatedPrices);
                      }}
                      required
                    />
                    </div>)
                  })
                }
                
              </label>
              <div>
                <button
                  className={s.editBtn}
                  onClick={onCheckClickHandler}
                >
                  Valider
                </button>
              </div>
            </div>}
        </div>
      </div>}
      </Td>
  </Tr>
)}

export default AdminFoodItem