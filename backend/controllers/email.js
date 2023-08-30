const nodemailer = require('nodemailer');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

exports.sendBookingEmail = (req, res) => {//envoie d'un mail lors de la réservation
  console.log(req.body)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'testa.webdeveloper@gmail.com',
      pass: 'mtahlkkfjbwwilwb'
    }
  });

  const mailOptions = {
    from: 'PizzaCo <testa.webdeveloper@gmail.com>',
    to: `${req.body.email}`,
    subject: 'Votre réservation chez PizzaCo est en attente',
    text: 'Corps de l\'email',
    html: `<p>Merci ${req.body.surname} ${req.body.name},</p>
    <p>Votre demande de réservation est <b>en attente de confirmation</b>.</p>
    <p>Laissez-nous quelques instants pour nous assurer que nous avons de la place pour vous. Vous recevrez un autre e-mail de notre part bientôt.</p>
    <p><b>Les détails de votre réservation:</b><br>
    ${req.body.surname} ${req.body.name}<br>
    ${req.body.number} personne(s)<br>
    ${req.body.date} ${req.body.time}</p>
    <p>À très bientôt</p>
    PizzaCo
    `
  };

  const mailOptionsToPizzeria = {
    from: 'PizzaCo <testa.webdeveloper@gmail.com>',
    to: `contact@coral-dev.be`,
    subject: 'Nouvelle demande de réservation - PizzaCo',
    text: 'Corps de l\'email',
    html: `<p>Un client aimerait réserver une table.</p>
    <p>Gérer la réservation : https://pizza-co.vercel.app/adminBookings
    <p>
      <b>Les détails de la réservation:</b><br>
      ${req.body.surname} ${req.body.name}<br>
      ${req.body.number} personne(s)<br>
      ${req.body.date} ${req.body.time}<br>
      ${req.body.tel}
    </p>
    PizzaCo
    `
  };

  transporter.sendMail(mailOptionsToPizzeria, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error });
    } else {
      console.log('Email envoyé : ' + info.response);
      res.status(200).json({ message: 'Email envoyé avec succès' });
    }
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error });
    } else {
      console.log('Email envoyé : ' + info.response);
      res.status(200).json({ message: 'Email envoyé avec succès' });
    }
  });
};

exports.sendBookingConfirmation = (req, res) => {//lorsque l'admin confirme la réservation
  console.log(req.body)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'testa.webdeveloper@gmail.com',
      pass: 'mtahlkkfjbwwilwb'
    }
  });

  const mailOptions = {
    from: 'PizzaCo <testa.webdeveloper@gmail.com>',
    to: `${req.body.email}`,
    subject: 'Confirmation de votre réservation chez PizzaCo',
    text: 'Corps de l\'email',
    html: `<p>Merci ${req.body.surname} ${req.body.name},</p>
    <p>Votre demande de réservation est <b>confirmée</b>.</p>
    <p>Nous vous remercions d'avoir choisi notre pizzeria pour votre réservation. Nous sommes ravis de vous accueillir prochainement. </p>
    <p><b>Les détails de votre réservation:</b><br>
    ${req.body.surname} ${req.body.name}<br>
    ${req.body.number} personne(s)<br>
    ${req.body.date} ${req.body.time}</p>
    <p>À très bientôt</p>
    PizzaCo
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error });
    } else {
      console.log('Email envoyé : ' + info.response);
      res.status(200).json({ message: 'Email envoyé avec succès' });
    }
  });
};


exports.sendBookingRefusal = (req, res) => {
  console.log(req.body)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'testa.webdeveloper@gmail.com',
      pass: 'mtahlkkfjbwwilwb'
    }
  });

  const mailOptions = {
    from: 'PizzaCo <testa.webdeveloper@gmail.com>',
    to: `${req.body.email}`,
    subject: 'Réservation non disponible - PizzaCo',
    text: 'Corps de l\'email',
    html: `<p>Désolé ${req.body.surname} ${req.body.name},</p>
    <p>Votre demande de réservation est <b>refusée</b>.</p>
    <p>Nous avons bien pris en compte votre demande de réservation à notre pizzeria. Malheureusement, nous regrettons de vous informer que nous ne sommes pas en mesure d'honorer votre réservation pour la date et l'heure demandées. </p>
    <p>Cette décision est due à un nombre élevé de réservations ou à une capacité limitée dans notre établissement à ce moment-là. Nous nous excusons sincèrement pour tout inconvénient que cela pourrait causer.</p>
    <p><b>Les détails de votre réservation:</b><br>
    ${req.body.surname} ${req.body.name}<br>
    ${req.body.number} personne(s)<br>
    ${req.body.date} ${req.body.time}</p>
    <p>Cordialement,</p>
    PizzaCo
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error });
    } else {
      console.log('Email envoyé : ' + info.response);
      res.status(200).json({ message: 'Email envoyé avec succès' });
    }
  });
};

