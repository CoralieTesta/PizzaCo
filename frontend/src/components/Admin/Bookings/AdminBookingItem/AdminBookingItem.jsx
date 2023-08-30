import React, { useEffect } from 'react'
import s from "./style.module.css"
import { BiCalendar } from 'react-icons/bi'
import { BsClock, BsEnvelope, BsPeople, BsPerson, BsTelephone } from 'react-icons/bs'
import { BookingAPI } from '../../../../api/booking-api'
import { useState } from 'react'
import { EmailAPI } from '../../../../api/email-api'

const AdminBookingItem = ({date, time, number, surname, name, email, tel, _id, status, future, bookingArray}) => {
    const [newBookingdata, setNewBookingData] =useState({date, time, number, surname, name, email, tel, _id})
    const [modify, setModify] = useState(false)
    //status En attente Confirmé, Refusé
    console.log("array",bookingArray)
    //const {date, time, number, surname, name, email, tel, future, _id}=bookingArray
    //<AdminBookingItem date="14/07/2023" time="12h30" number={5} surname="Coralie" name="Testa" email="coralie.testa@hotmail.com" tel="0498484393"/>
    function deleteHandler() {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?');
      if (confirmed) {
        BookingAPI.delete(_id)
      }
    }

    async function handleConfirm() {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir confirmer cette commande ?');
        if (confirmed) {
            await BookingAPI.update(_id, {...newBookingdata, status: "Confirmé"});
            EmailAPI.sendBookingConfirmation({date,time, number, surname, name, email})
        }
    }

    async function handleReject() {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir refuser cette commande ?');
        if (confirmed) {
            await BookingAPI.update(_id, {...newBookingdata, status: "Refusé"});
            EmailAPI.sendBookingRefusal({date,time, number, surname, name, email})
        }
    }

    function handleModify(){
        setModify(true)
    }

    function handleCancel() {
        const confirmed = window.confirm('Êtes-vous sûr de vouloir annuler cette commande ?');
      if (confirmed) {
        BookingAPI.delete(_id)
      }
    }

    function handleMailSend() {
        const mailtoUrl = `mailto:${email}?subject=Votre réservation chez PizzaCo`;
        window.location.href = mailtoUrl;
    }

    async function modifyHandler() {
        if(!isValidDate(newBookingdata.date)) {
            window.alert("La date doit avoir le format '09/05/2023'")
        }
        if(!isValidTime(newBookingdata.time)) {
            window.alert("L'heure doit avoir le format '09h05'")
        }
        else{
            setModify(false)
            await BookingAPI.update(_id, newBookingdata);
        }
    }

    function isValidDate(dateString) {
        // Expression régulière pour vérifier le format "jj/mm/aaaa"
        const regex = /^\d{2}\/\d{2}\/\d{4}$/;
      
        // Vérification du format de la date
        if (!regex.test(dateString)) {
          return false;
        }
        return true
    }

    function isValidTime(timeString) {
        // Expression régulière pour vérifier le format "hhh:mm"
        const regex = /^\d{2}h\d{2}$/;
      
        // Vérification du format de l'heure
        if (!regex.test(timeString)) {
          return false;
        }
        return true
    }

    if(modify) {
        return(
            <form className={s.form}>
                <div className={s.formContainer}>
                <div style={{marginBottom:"10px"}}>
                    <u><b>Modification</b></u>
                </div> 
                    <div class="row">
                        <div class="col">
                            <label>
                                Date
                            </label>
                            <input
                                value={newBookingdata.date}
                                onChange={(e) =>
                                    setNewBookingData({ ...newBookingdata, date: e.target.value })
                                }
                                class="form-control"
                            />
                        </div>
                        <div class="col">
                            <label>
                                Heure
                            </label>
                            <input
                                value={newBookingdata.time}
                                onChange={(e) =>
                                    setNewBookingData({ ...newBookingdata, time: e.target.value })
                                }
                                class="form-control"
                            />
                        </div>
                        <div class="col">
                            <label>
                                Nombre
                            </label>
                            <input
                                value={newBookingdata.number}
                                onChange={(e) =>
                                    setNewBookingData({ ...newBookingdata, number: e.target.value })
                                }
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <label>
                                Nom
                            </label>
                            <input
                                value={newBookingdata.name}
                                onChange={(e) =>
                                    setNewBookingData({ ...newBookingdata, name: e.target.value })
                                }
                                class="form-control"
                            />
                        </div>
                        <div class="col">
                            <label>
                                Prénom
                            </label>
                            <input
                                value={newBookingdata.surname}
                                onChange={(e) =>
                                    setNewBookingData({ ...newBookingdata, surname: e.target.value })
                                }
                                class="form-control"
                            />
                        </div>
                        <div class="col">
                            <label>
                                Email
                            </label>
                            <input
                                value={newBookingdata.email}
                                onChange={(e) =>
                                    setNewBookingData({ ...newBookingdata, email: e.target.value })
                                }
                                class="form-control"
                            />
                        </div>
                        <div class="col">
                            <label>
                                Téléphone
                            </label>
                            <input
                                value={newBookingdata.tel}
                                onChange={(e) =>
                                    setNewBookingData({ ...newBookingdata, tel: e.target.value })
                                }
                                class="form-control"
                            />
                        </div>
                    </div>
                    <div className={s.modifyBtnGroup}>
                        <button
                            onClick={modifyHandler}
                            type="button" 
                            class="btn btn-success"
                        > 
                            Modifier
                        </button>
                        <button
                            onClick={() => setModify(false)}
                            type="button" 
                            class="btn btn-light"
                        > 
                            Annuler
                        </button>
                    </div>
                </div>
            </form>
        )
    }
    return(  
        <div  
            style={{
                borderBottom:'1px solid grey', 
                paddingBottom:'20px',
                backgroundColor: status === "Confirmé" ? "#28a74632": 
                                status === "Refusé" ? "#dc35461f": "#cccccc9e",
            }}
        >  
            <div style={{
                paddingTop:"10px", 
                fontSize:"22px"}}
            >
                <u><b>{status}</b></u>
            </div>      
            <div 
            className={s.liContainer}>
                
                <div className={s.liItem}>
                    <BiCalendar size={22} className={s.icon} /><br/>
                    {date} 
                </div>
                <div className={s.liItem}>
                    <BsClock size={22} className={s.icon} /><br/>
                    {time} 
                </div>
                <div className={s.liItem}>
                    <BsPeople size={22} className={s.icon} /><br/>
                    {number} peronne(s)
                </div>
            </div>
            <div 
            className={s.liContainer}
            >
                <div className={s.liItem}>
                    <BsPerson size={22} className={s.icon} /><br/>
                    {surname} {name}
                </div>
                <div className={s.liItem}>
                    <BsEnvelope size={22} className={s.icon} /><br/>
                    {email}
                </div>
                <div className={s.liItem}>
                    <BsTelephone size={22} className={s.icon} /><br/>
                    {tel}
                </div>
            </div>
            
            <div>
                {future?
                (<div>
                    <button
                        className={s.acceptBtn}
                        onClick={handleConfirm}
                    >
                        Accepter
                    </button>
                    <button
                        className={s.rejectBtn}
                        onClick={handleReject}
                    >
                        Refuser
                    </button>
                    <button
                        className={s.modifyBtn}
                        onClick={handleModify}
                    >
                        Modifier
                    </button>
                    <button
                        className={s.cancelBtn}
                        onClick={handleCancel}
                    >
                        Annuler
                    </button>
                    <button 
                        onClick={handleMailSend}
                        className={s.mailBtn}
                    >
                        Envoyer un mail
                    </button>
                </div>)
                :
                (<button
                    className={s.btn}
                    onClick={deleteHandler}
                >
                    Supprimer
                </button>)
                }
            </div>
            
        </div>
    )
}

export default AdminBookingItem