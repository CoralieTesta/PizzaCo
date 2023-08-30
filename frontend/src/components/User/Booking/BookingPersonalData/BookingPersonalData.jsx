import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEmail, setName, setSurname, setTel } from '../../../../store/booking-slice'
import { EmailAPI } from '../../../../api/email-api'
import { BookingAPI } from '../../../../api/booking-api'
import s from "./style.module.css"
import { BsEnvelope, BsPerson, BsTelephone } from 'react-icons/bs'

const BookingPersonalData = ({setFinishBooking, finishBooking}) => {
    const [personalData, setPersonalData] = useState({})
    const [isPersonalDataValidate,setIsPersonalDataValidate] = useState(false)
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false)
    const dispatch = useDispatch()
    const numberPeople = useSelector(store => store.BOOKING.numberPeople)
    const chosenDate = useSelector(store => store.BOOKING.chosenDate)
    const time = useSelector(store => store.BOOKING.time)

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value;
        setPersonalData(values => ({...values, [name]: value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPersonalDataValidate(true);
      };      
    const submitHandler = (event) => {
        if(!isPrivacyChecked) {
            window.alert("Vous devez accepter la politique de confidentialité pour pouvoir réserver.")
        }
        else {
            const confirmed = window.confirm('Confirmez-vous la demande de réservation ?')
            if(confirmed){
                console.log("oo",personalData.surname, numberPeople,time)
                event.preventDefault();
                dispatch(setName(personalData.name))
                dispatch(setSurname(personalData.surname))
                dispatch(setEmail(personalData.email))
                dispatch(setTel(personalData.tel))
                setFinishBooking(true)
                BookingAPI.create({
                    surname: personalData.surname, 
                    name: personalData.name, 
                    email: personalData.email,
                    number: numberPeople,
                    date: chosenDate,
                    time: time, 
                    tel: personalData.tel,
                    status:"En attente"
                })
                EmailAPI.sendBookingEmail({
                    surname: personalData.surname, 
                    name: personalData.name, 
                    email: personalData.email,
                    number: numberPeople,
                    date:chosenDate,
                    time:time,
                    tel: personalData.tel
                })
            }
        }
        //alert(personalData.tel);
      }
  return (
    <div className={s.container}>
        {!finishBooking && 
            <h2>Données personnelles</h2>
        }
        {finishBooking}
        {isPersonalDataValidate}
        {isPersonalDataValidate?
            (<div className={s.container}>
                <div className={s.formItem}>
                    <BsPerson/> {personalData.surname} {personalData.name} <span className={s.label}/>
                    {!finishBooking &&
                        <button className={s.archiveBtn} onClick={() => setIsPersonalDataValidate(false)}>Modifier</button>
                    }
                </div>
                <div className={s.formItem}>
                    <BsEnvelope/> {personalData.email} <span className={s.label}/>
                    {!finishBooking &&
                        <button className={s.archiveBtn} onClick={() => setIsPersonalDataValidate(false)}>Modifier</button>
                    }
                </div>
                <div className={s.formItem}>
                    <BsTelephone/> {personalData.tel} <span className={s.label}/>
                    {!finishBooking &&
                        <button className={s.archiveBtn} onClick={() => setIsPersonalDataValidate(false)}>Modifier</button>
                    }
                </div>
                {!finishBooking &&
                    <div class="form-group row">
                        <div class="col-auto"></div>
                            <div class="col-auto">
                                <div class="form-check">
                                    <input 
                                        class="form-check-input" 
                                        type="checkbox" 
                                        id="gridCheck1"
                                        checked={isPrivacyChecked}
                                        onChange={(e) => {setIsPrivacyChecked(e.target.checked)}}
                                    />
                                    <label class="form-check-label" htmlFor="gridCheck1">
                                        J'accepte la <span className={s.link}>politique de confidentialité</span>
                                    </label>
                                </div>
                        </div>
                    </div>
                }
                {!finishBooking &&
                    <div>
                        <button
                            className={s.bookBtn}
                            onClick={submitHandler}
                        >
                            Réserver
                        </button>
                    </div>
                }
            </div>)
            :
            (<form onSubmit={handleSubmit}>
                <div class="row">
                    <div class="col">
                    <label>Prénom* </label>
                        <input 
                            type="text"
                            name="surname"
                            value={personalData.surname || ""}
                            required
                            onChange={handleChange}
                            class="form-control"
                        />
                    </div>
                    <div class="col">
                        <label>Nom* </label>
                            <input 
                                type="text"
                                name="name"
                                value={personalData.name || ""}
                                required
                                onChange={handleChange}
                                class="form-control"
                            />
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <label>E-mail* </label>
                        <input 
                            type="email"
                            name="email"
                            value={personalData.email || ""}
                            required
                            onChange={handleChange}
                            class="form-control"
                        />
                    </div>
                    <div class="col">
                        <label>Téléphone* </label>
                        <input 
                            type="tel"
                            name="tel"
                            value={personalData.tel || ""}
                            required
                            onChange={handleChange}
                            class="form-control"
                        />
                    </div>
                </div>
                
                <button 
                    type="submit"
                    className={s.validateBtn}
                >
                    Valider
                </button>
                
            </form>)
        }
        
    </div>
  )
}

export default BookingPersonalData