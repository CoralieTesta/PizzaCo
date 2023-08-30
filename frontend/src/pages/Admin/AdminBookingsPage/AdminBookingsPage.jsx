import React, { useEffect, useState } from 'react'
import { BookingAPI } from '../../../api/booking-api';
import { setConnect, setToken } from '../../../store/admin-slice'
import { useDispatch } from 'react-redux';
import AdminBookings from '../../../components/Admin/Bookings/AdminBookings/AdminBookings';
import { AiFillSetting } from "react-icons/ai"
import s from "./style.module.css"
import AdminBookingSettings from '../../../components/Admin/Bookings/AdminBookingSettings/AdminBookingSettings';
import { BookingSettingsAPI } from '../../../api/bookingSettings-api';

const AdminBookingsPage = () => {
  const [bookingArray, setBookingArray] = useState([])
  const [showSettings, setShowSettings] = useState(false)
  const [settingsLunch, setSettingsLunch] = useState()
  const [settingsDiner, setSettingsDiner] = useState()
  const dispatch = useDispatch()

  useEffect(() => {
    async function getAllBookings() {
      const bookings = await BookingAPI.getAll();
      setBookingArray(bookings)
      //console.log(bookings)
    }
    getAllBookings();
    // Démarrez l'intervalle de requête régulière
    const interval = setInterval(getAllBookings, 2000)
    // Nettoyez l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
    }, []);

    useEffect(() => {
      const data = localStorage.getItem('admin')
      const parseData = JSON.parse(data)
      if(parseData) {
        dispatch(setConnect(parseData.isConnect))
        dispatch(setToken({token:parseData.token}))
      }
      }, []);

    useEffect(() => {
      async function getLunch() {
        const settings = await BookingSettingsAPI.getLunch();
        setSettingsLunch(settings[0])
        console.log("use sett",settingsLunch)
      }
      async function getDiner() {
        const settings = await BookingSettingsAPI.getDiner();
        setSettingsDiner(settings[0])
        console.log(settings)
      }
      getLunch();
      getDiner()
    }, [])
  return (
    <div>
      <div className={s.settingsContianer}>
        <AiFillSetting 
          size={38}
          onClick={() => showSettings ? setShowSettings(false) : setShowSettings(true)}/> 
      </div>
      <h2 style={{marginTop:"20px", marginBottom:"50px"}}>Les réservations</h2>
      {showSettings?
        (<AdminBookingSettings settingsLunch={settingsLunch} settingsDiner={settingsDiner}/>)
        :
        (<AdminBookings bookingArray={bookingArray} />)
      }
    </div>
  )
}

export default AdminBookingsPage  