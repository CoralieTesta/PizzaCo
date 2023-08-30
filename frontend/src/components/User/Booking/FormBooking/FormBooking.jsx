import React, { useState } from 'react';
import Calendar from '../Calendar/Calendar';
import { useDispatch } from 'react-redux';
import { setNumberPeople } from '../../../../store/booking-slice';
import s from "./style.module.css"
import { CiForkAndKnife } from 'react-icons/ci';
import { BsPeople } from 'react-icons/bs';

const FormBooking = () => {
  const maxNbPeople = 20;
  const maxNbPeopleArray = [];

  const dispatch = useDispatch();
  const [validateFirstPart, setValidateFirstPart] = useState(false);
  for (var i = 1; i <= maxNbPeople; i++) {
    maxNbPeopleArray.push(i);
  }
  const [lunchOrDiner, setLunchOrDiner] = useState('Lunch');
  const [nbPeople, setNbPeople] = useState(1);
  const [finishBooking, setFinishBooking] =useState(false)

  const handleChangeLunchOrDiner = (event) => {
    console.log(event.target.value);
    setLunchOrDiner(event.target.value);
  };

  const handleChangeNbPeople = (event) => {
    console.log(event.target.value);
    setNbPeople(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleValidate = (event) => {
    event.preventDefault();
    dispatch(setNumberPeople(nbPeople));
    setValidateFirstPart(true);
  };

  return (
    <div className={s.container}>
      <h1 className={`${s.title} ${s.fadeInDown}`}>Réserver une table</h1>
      <div className={s.text}>
        Remplissez le formulaire ci-dessous pour réserver votre table et nous serons ravis de vous accueillir.
      </div>
      
      <div 
        className={s.form} 
        style={{backgroundColor: finishBooking ? "rgba(0, 128, 0, 0.13)" : undefined}}
        onSubmit={handleSubmit}>
          
      {validateFirstPart ? (
        <div 
        className={s.formItem}
      >
          {finishBooking?
          (<h2 style={{textAlign:"center", marginBottom:"25px"}}>Nous avons bien reçu votre demande de réservation. Vous serez informé(e) par e-mail dès que celle-ci sera validée.</h2>)
          :
          (<h2 style={{textAlign:"center", marginBottom:"25px"}}>Quand voulez-vous venir manger ?</h2>)
          }
          <CiForkAndKnife/> {lunchOrDiner} - <BsPeople/>{nbPeople} personnes <span className={s.label}/>
          {!finishBooking &&
            <button className={s.archiveBtn} onClick={() => setValidateFirstPart(false)}>Modifier</button>
          }
          <Calendar lunchOrDiner={lunchOrDiner} finishBooking={finishBooking} setFinishBooking={setFinishBooking}/>
        </div>
      ) : (
        <>
          <div className={s.formItem}>
            <h2 style={{textAlign:"center", marginBottom:"25px"}}>Quand voulez-vous venir manger ?</h2>
            <label className={s.label}>Lunch/Diner:</label>
            <select value={lunchOrDiner} onChange={handleChangeLunchOrDiner}>
              <option value="Lunch">Lunch</option>
              <option value="Diner">Diner</option>
            </select>
          </div>
          <div className={s.formItem}>
            <label className={s.label}>Nombre de personnes:</label>
            <select value={nbPeople} onChange={handleChangeNbPeople}>
              {maxNbPeopleArray.map((nb) => (
                <option value={nb}>{nb} personne(s)</option>
              ))}
            </select> 
          </div>
          <div className={s.formItem}>
            <button className={s.validateBtn} onClick={handleValidate}>Valider</button>
          </div>
          </>
      )}
      </div>
    </div>
  );
};

export default FormBooking;
