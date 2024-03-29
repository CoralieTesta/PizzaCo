import React from 'react'
import { useState } from 'react';
import s from "./style.module.css"
import AdminBookingItem from '../AdminBookingItem/AdminBookingItem';

const AdminBookings = ({bookingArray, setBookingArray}) => {
    const [isFutureSelected, setIsFutureSelected] = useState(true)
    const date = new Date()
    const [month, day, year] = [
        date.getMonth()+1,
        date.getDate(),
        date.getFullYear(),
      ];
    const todayDateInNb = day+"/"+month+"/"+year

    console.log('today', todayDateInNb)
    console.log("array before",bookingArray)

    function getFirstPart(str) {
        return str.split('/')[0];
    }
    function getSecondPart(str) {
        return str.split('/')[1];
    }
    function getThirdPart(str) {
        return str.split('/')[2];
    }

    const getTimeInMinutes = (timeString) => {
        const [hours, minutes] = timeString.split('h').map(Number);
        return hours * 60 + minutes;
      };

    bookingArray.sort((a,b) => {
        const aDateFormat= getSecondPart(a.date)+"/"+getFirstPart(a.date)+"/"+getThirdPart(a.date)
        const bDateFormat= getSecondPart(b.date)+"/"+getFirstPart(b.date)+"/"+getThirdPart(b.date)
        const aDate=new Date(aDateFormat)
        const bDate=new Date(bDateFormat)
        //console.log("a", aDate, aDateFormat, a.date)
        if(a.date === b.date) {
            console.log(getTimeInMinutes(a.time),getTimeInMinutes(b.time), aDate.getTime()+getTimeInMinutes(a.time)-(bDate.getTime()+getTimeInMinutes(b.time)))
            return aDate.getTime()+getTimeInMinutes(a.time)-(bDate.getTime()+getTimeInMinutes(b.time))
        }
        return aDate.getTime()-bDate.getTime()
    })
    console.log("booking arr",bookingArray)
    const pastBookingArray = bookingArray.filter(day => {
        const dayDateFormat =getSecondPart(day.date)+"/"+getFirstPart(day.date)+"/"+getThirdPart(day.date)
        const dayDate=new Date(dayDateFormat)
        //console.log(day, dayDate.getTime(), date.getTime())
        return dayDate.getTime()<date.getTime()-90000000
    })
    pastBookingArray.reverse()

    const futureBookingArray = bookingArray.filter(day => {
        const dayDateFormat =getSecondPart(day.date)+"/"+getFirstPart(day.date)+"/"+getThirdPart(day.date)
        const dayDate=new Date(dayDateFormat)
        return dayDate.getTime()>=date.getTime()-90000000
    })

    //console.log("before",pastBookingArray, "fut", futureBookingArray)

    function onSelectPast() {
        setIsFutureSelected(false)
    }

    function onSelectFuture() {
        setIsFutureSelected(true)
    }


    if(bookingArray.length === 0) {
        return(
            <div className={s.noBooking}>
                Vous n'avez pas encore de réservation.
            </div>
        )
    }
    return(
        <div className={s.container}>
            <div className={s.buttons}>
                <button 
                    onClick={onSelectPast}
                    className={s.btn}
                    style={{
                        borderBottom: isFutureSelected? 'none': '3px solid black',
                        backgroundColor: isFutureSelected? 'white': '#EDEDED'
                    }}
                >
                    Passées
                </button>
                <button 
                    onClick={onSelectFuture}
                    className={s.btn}
                    style={{
                        borderBottom: isFutureSelected? '3px solid black' : 'none',
                        backgroundColor: isFutureSelected? '#EDEDED' : 'white'
                    }}
                >
                    À venir
                </button>
            </div>
            {isFutureSelected && futureBookingArray.length > 0 &&
                <ul className={s.ul}>
                    {futureBookingArray.map(booking =>
                        <li key={booking._id} className={s.li} >
                            <div>
                                <AdminBookingItem 
                                date={booking.date}
                                time={booking.time}
                                number={booking.number}
                                surname={booking.surname}
                                name={booking.name}
                                email={booking.email}
                                tel={booking.tel}
                                _id={booking._id}
                                status={booking.status}
                                future={true}
                                bookingArray={futureBookingArray}
                            />
                            </div>
                        </li>
                    )}
                </ul>
            }
            {!isFutureSelected && pastBookingArray.length>0 &&
                <ul className={s.ul}>
                    {pastBookingArray.map(booking =>
                        <li key={booking._id} className={s.li} >
                            <div>
                                <AdminBookingItem
                                date={booking.date}
                                time={booking.time}
                                number={booking.number}
                                surname={booking.surname}
                                name={booking.name}
                                email={booking.email}
                                tel={booking.tel}
                                _id={booking._id}
                                status={booking.status}
                                future={false}
                                bookingArray={pastBookingArray}
                            />
                            </div>
                        </li>
                    )}
                </ul>
            }

            {isFutureSelected && futureBookingArray.length === 0 &&
                <div className={s.noBooking}>
                    Vous n'avez pas de réservation à venir.
                </div>
            }
            {!isFutureSelected && pastBookingArray.length === 0 &&
                <div className={s.noBooking}>
                    Vous n'avez pas de réservation passée.
                </div>
            }
        </div>
    )
}

export default AdminBookings