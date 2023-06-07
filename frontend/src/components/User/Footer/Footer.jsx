import React from 'react';
import './Footer.css';
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';

const Footer = () => {
  const phoneNumber = '+32493484292'
  const email = 'pizzaCo@gmail.com'
  const onPhoneClickHandler = () => {
    window.location.href = `tel:${phoneNumber}`;
  }
  const onMailClickHandler = () => {
    window.location.href = `mailto:${email}`;
  }
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Adresse</h3>
          <p>123 Rue de la Pizza</p>
          <p>75000 Paris</p>
        </div>
        <div className="footer-section">
          <h3>Horaires</h3>
          <p>Lun - Ven: 10h - 22h</p>
          <p>Sam - Dim: 11h - 23h</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p onClick={onPhoneClickHandler} className='pointer'><AiOutlinePhone size={25}/> {phoneNumber}</p>
          <p onClick={onMailClickHandler} className='pointer'><AiOutlineMail size={25}/> {email}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
