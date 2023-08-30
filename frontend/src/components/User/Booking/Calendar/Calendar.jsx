import s from "./style.module.css"
import React, { useEffect, useState } from 'react';
import CalendarElement from 'react-calendar';
import TimeIntervals from "../TimeIntervals/TimeIntervals";
import { useDispatch } from "react-redux";
import { setChosenDate } from "../../../../store/booking-slice";
import { BookingSettingsAPI } from "../../../../api/bookingSettings-api";
import { AiOutlineCalendar } from "react-icons/ai";

const Calendar = ({lunchOrDiner, finishBooking, setFinishBooking}) => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingSettings, setBookingSettings]= useState({})
  const dispatch = useDispatch()
  const {startingHour, closingHour, eatingTime, intervalBetweenServices}=bookingSettings
  /**const startingHour = "11h45"
  const closingHour = "14h00"
  const eatingTime = "01h15"
  const intervalBetweenServices = "00h15"*/
  async function getBookingSettingsDiner() {
    const settings = await BookingSettingsAPI.getDiner()
    setBookingSettings(settings[0])
    //console.log(bookingSettings)
    //localStorage.setItem('bookingSettings-info', JSON.stringify(settings));
}
async function getBookingSettingsLunch() {
  const settings = await BookingSettingsAPI.getLunch()
  setBookingSettings(settings[0])
  //console.log(bookingSettings)
  //localStorage.setItem('bookingSettings-info', JSON.stringify(settings));
}
  useEffect(() => {
    if(lunchOrDiner === "Lunch") {
      getBookingSettingsLunch()
    }
    else {
      getBookingSettingsDiner()
    }
    
  },[])

  function addWeeks(date, weeks) {
    date.setDate(date.getDate() + 7 * weeks);
    return date;
    }
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const max_date = new Date()
  addWeeks(max_date,2)
  const current_date = new Date()

  const handleDateClick = (date) => {
    console.log()
    setShowCalendar(false);
    setSelectedDate(date);
    dispatch(setChosenDate(date.toLocaleDateString()))   
  };

  const isCurrentDate = selectedDate && selectedDate.toLocaleDateString() === current_date.toLocaleDateString();


  return (
    <div className={s.container}>
      
      {showCalendar ? (
        <div className={s.container}>
        <h3 className='text-center'>Choisissez une date</h3>
        <CalendarElement 
            className={s.calendar} 
            minDate={current_date}
            maxDate={max_date}
            onClickDay={handleDateClick} />
        </div>
      ) : (
        <>
        <div className={s.selectedDate}>
            <AiOutlineCalendar/> {selectedDate.toLocaleDateString(undefined, options)} <span className={s.label}/>
            {!finishBooking &&
              <button className={s.archiveBtn} onClick={() => setShowCalendar(true)}>Modifier</button>
            }
            <TimeIntervals startingHour={startingHour} closingHour={closingHour} eatingTime={eatingTime} intervalBetweenServices={intervalBetweenServices} isCurrentDate={isCurrentDate} lunchOrDiner={lunchOrDiner} finishBooking={finishBooking} setFinishBooking={setFinishBooking}/>
        </div>
        </>
      )}
    </div>
  );
};

export default Calendar;
