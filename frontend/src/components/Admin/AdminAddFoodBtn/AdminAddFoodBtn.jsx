import React, { useState } from 'react'
import s from "./style.module.css"
import AdminAddFoodForm from '../AdminAddFoodForm/AdminAddFoodForm'
import { AiOutlineClose } from 'react-icons/ai'
import { MdAddCircleOutline } from 'react-icons/md'

const AdminAddFoodBtn = ({foodList, setFoodList, type}) => {
    const [showForm, setShowForm] = useState(false)
    function onClickHandler() {
        setShowForm(true)
    }

    function onCloseHandler() {
        setShowForm(false)
    }
  return (
    <div>
        
        {showForm?
        (
            <div className={s.formContainer}>
            <button
                type='button'
                className={s.btn}
                onClick={onCloseHandler}
            >
                Fermer <AiOutlineClose/>
            </button>
            <AdminAddFoodForm 
                foodList={foodList} 
                setFoodList={setFoodList}
                setShowForm={setShowForm}
                type={type}
            />
            </div>
        )
        : 
        (<button
            type='button'
            className={s.btn}
            onClick={onClickHandler}
        >
            Ajouter <MdAddCircleOutline />
        </button>)
        }
    </div>
  )
}

export default AdminAddFoodBtn