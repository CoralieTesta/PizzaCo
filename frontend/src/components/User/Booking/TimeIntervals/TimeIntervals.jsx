import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setTime } from '../../../../store/booking-slice';
import BookingPersonalData from '../BookingPersonalData/BookingPersonalData';
import s from "./style.module.css"
import { AiOutlineClockCircle } from 'react-icons/ai';

const TimeIntervals = ({ startingHour, closingHour, eatingTime, intervalBetweenServices, isCurrentDate, lunchOrDiner, setFinishBooking, finishBooking }) => {
    const dispatch = useDispatch()

  const [selectedInterval, setSelectedInterval] = useState(null);
  const [isTimeChosen, setIsTimeChosen] = useState(false)

  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      const belgiumTime = new Date().toLocaleString('en-US', {
        timeZone: 'Europe/Brussels',
      });
      setCurrentTime(belgiumTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const isTimeValid = (time) => {
    const timeArray = time.split('h');
    const timeHours = parseInt(timeArray[0]);
    const timeMinutes = parseInt(timeArray[1]);

    const currentTimeObj = new Date(currentTime);
    const currentTimeHours = currentTimeObj.getHours();
    const currentTimeMinutes = currentTimeObj.getMinutes();

    
    if (timeHours > currentTimeHours) {
      return true;
    } else if (timeHours === currentTimeHours && timeMinutes > currentTimeMinutes) {
      return true;
    } else {
      return false;
    }
  };
  const generateIntervals = () => {
    const intervals = [];
    let actualTime = startingHour;
    console.log(!isCurrentDate)
    while (addTime(actualTime, eatingTime) <= closingHour) {
      console.log(addTime(actualTime, eatingTime),closingHour)
      if(!isCurrentDate || isTimeValid(actualTime)) {
      intervals.push(
        <button
          key={actualTime}
          className={`time-interval ${selectedInterval === actualTime ? 'selected' : ''}`}
          onClick={e => handleIntervalClick(e, "value")}
          value={actualTime}
        >
          {actualTime}
        </button>
      );
      }
      actualTime = addTime(actualTime, intervalBetweenServices);
    }

    return intervals;
  };

  const addTime = (time, duration) => {
    const [hours, minutes] = time.split('h');
    const [durationHours, durationMinutes] = duration.split('h');

    let totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
    totalMinutes += parseInt(durationHours) * 60 + parseInt(durationMinutes);

    const newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;

    return `${newHours.toString().padStart(2, '0')}h${newMinutes.toString().padStart(2, '0')}`;
  };

  const handleIntervalClick = (e) => {
    console.log(e.target.value)
    dispatch(setTime(e.target.value))
    setSelectedInterval(e.target.value);
    // Affiche le contenu du bouton dans la console
    setIsTimeChosen(true)
  };
  if(isTimeChosen) {
    return (
      <div className={s.container}>
        <div className={s.formItem}>
          <AiOutlineClockCircle/> {selectedInterval} <span className={s.label}/>
          {!finishBooking &&
            <button className={s.archiveBtn} onClick={() => setIsTimeChosen(false)}>Modifier</button>
          }
          <BookingPersonalData finishBooking={finishBooking} setFinishBooking={setFinishBooking}/>
      </div>
    </div>)
  }
  else {
    return (
    <div className={s.container}>
      {generateIntervals().length !== 0 ?
        (<>
        <h3 className='text-center'>Choisissez une heure</h3>
        <>{generateIntervals()}</>
        </>)
        :
        (lunchOrDiner === "Lunch" ?
        (<div style={{color:"red"}}>
          Il n'y a plus de réservation pour le lunch, choisissez 'Diner'.
        </div>
        )
        :
        (<div style={{color:"red"}}>Désolé, il n'y a plus de réservation aujourd'hui.</div>))
    }
      
    </div>)
  }
};

export default TimeIntervals;
