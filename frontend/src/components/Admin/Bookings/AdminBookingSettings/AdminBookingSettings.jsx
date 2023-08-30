import React from 'react'
import s from "./style.module.css"
import { useState } from 'react'
import { BookingSettingsAPI } from '../../../../api/bookingSettings-api'

const AdminBookingSettings = ({settingsLunch, settingsDiner}) => {
    console.log("ooo",settingsLunch._id)
    const [newSettingsLunch, setNewSettingsLunch] = useState(settingsLunch)
    const [newSettingsDiner, setNewSettingsDiner] = useState(settingsDiner)
    const handleChangeLunch = (e) => {
        const name = e.target.name
        const value = e.target.value;
        setNewSettingsLunch(values => ({...values, [name]: value}))
    }

    const handleChangeDiner = (e) => {
        const name = e.target.name
        const value = e.target.value;
        setNewSettingsDiner(values => ({...values, [name]: value}))
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

    async function submitLunchHandler(e) {
        e.preventDefault()
        if(!isValidTime(newSettingsLunch.startingHour) || 
           !isValidTime(newSettingsLunch.closingHour) || 
           !isValidTime(newSettingsLunch.intervalBetweenServices) ||
           !isValidTime(newSettingsLunch.eatingTime)) {
            window.alert("Toutes les entrées doivent avoir le format '00h15'")
        }
        else{
            await BookingSettingsAPI.update(settingsLunch._id, newSettingsLunch);
            window.alert("La modification a bien été effectuée")
        }
    }
    async function submitDinerHandler(e) {
        e.preventDefault()
        if(!isValidTime(newSettingsDiner.startingHour) || 
           !isValidTime(newSettingsDiner.closingHour) || 
           !isValidTime(newSettingsDiner.intervalBetweenServices) ||
           !isValidTime(newSettingsDiner.eatingTime)) {
            window.alert("Toutes les entrées doivent avoir le format '00h15'")
        }
        else{
            await BookingSettingsAPI.update(settingsDiner._id, newSettingsDiner);
            window.alert("La modification a bien été effectuée")
        }
    }
  return (
    <div>
        <h3>Réglages</h3>
        <div className={s.container}>
            <form className={s.subContainer}>
                <h4 className={s.h4}>Lunch</h4>
                <div class="row">
                    <div class="col">
                        <label>Heure d'ouverture* </label><br/>
                        <input 
                            type="text"
                            name="startingHour"
                            value={newSettingsLunch.startingHour || ""}
                            required
                            onChange={handleChangeLunch}
                            class="form-control"
                            className={s.input}
                        />
                    </div>
                    <div class="col">
                        <label>Heure de fermeture </label><br/>
                        <input 
                            type="text"
                            name="closingHour"
                            value={newSettingsLunch.closingHour || ""}
                            required
                            onChange={handleChangeLunch}
                            class="form-control"
                            className={s.input}
                        />
                    </div>
                </div><br/>
                <div class="row">
                    <div class="col">
                        <label>Durée du repas</label><br/>
                        <input 
                            type="text"
                            name="eatingTime"
                            value={newSettingsLunch.eatingTime || ""}
                            required
                            onChange={handleChangeLunch}
                            class="form-control"
                            className={s.input}
                        />
                    </div>
                    <div class="col">
                        <label>Intervalle de temps</label><br/>
                        <input 
                            type="text"
                            name="intervalBetweenServices"
                            value={newSettingsLunch.intervalBetweenServices || ""}
                            required
                            onChange={handleChangeLunch}
                            class="form-control"
                            className={s.input}
                        />
                    </div>
                </div>
                <button
                    onClick={submitLunchHandler}
                    className={s.archiveBtn}
                >
                    Modifier
                </button>
            </form>
            <form className={s.subContainer}>
                <h4 className={s.h4}>Diner</h4>
                <div class="row">
                    <div class="col">
                        <label>Heure d'ouverture* </label><br/>
                        <input 
                            type="text"
                            name="startingHour"
                            value={newSettingsDiner.startingHour || ""}
                            required
                            onChange={handleChangeDiner}
                            class="form-control"
                            className={s.input}
                        />
                    </div>
                    <div class="col">
                        <label>Heure de fermeture </label><br/>
                        <input 
                            type="text"
                            name="closingHour"
                            value={newSettingsDiner.closingHour || ""}
                            required
                            onChange={handleChangeDiner}
                            class="form-control"
                            className={s.input}
                        />
                    </div>
                    </div><br/>
                <div class="row">
                    <div class="col">
                        <label>Durée du repas</label><br/>
                        <input 
                            type="text"
                            name="eatingTime"
                            value={newSettingsDiner.eatingTime || ""}
                            required
                            onChange={handleChangeDiner}
                            class="form-control"
                            className={s.input}
                        />
                    </div>
                    <div class="col">
                        <label>Intervalle de temps</label><br/>
                        <input 
                            type="text"
                            name="intervalBetweenServices"
                            value={newSettingsDiner.intervalBetweenServices || ""}
                            required
                            onChange={handleChangeDiner}
                            class="form-control"
                            className={s.input}
                        />
                    </div>
                </div>
                <button
                    onClick={submitDinerHandler}
                    className={s.archiveBtn}
                >
                    Modifier
                </button>
            </form>
        </div>
    </div>
  )
}

export default AdminBookingSettings