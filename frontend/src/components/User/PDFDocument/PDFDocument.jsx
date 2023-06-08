import React, { useState } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import s from './style.module.css'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

function PDFDocument({formattedDate, time, id, customer, address,pizzas, pasta, desserts, total,method}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleDownloadPDF = () => {
    console.log(firstName)
    const documentDefinition = {
      content: [
        { text: 'Confirmation de Commande - PizzaCo', bold: true, fontSize: 20 },
        { text: '\n \n \n' },

        { text: 'Détails de la commande :',bold: true },
        { text: `Date de la commande : ${formattedDate}` },
        { text: `Heure de la commande : ${time}` },
        { text: `Numéro de commande : ${id}` },
        { text: '\n \n' },

        { text: 'Détails de la livraison :',bold: true },
        { text: `Nom : ${customer}` },
        { text: `Adresse de livraison : ${address}` },
        { text: '\n \n \n' },

        { text: 'Produits commandés :',bold: true },
        { text: '\n' },
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: [
              [
                'Nom',
                'Taille',
                'Supplément(s)',
                'Retrait(s)',
                'Prix',
                'Quantité',
                'Total',
              ],
              ...(pizzas.map((pizza) => [
                  pizza.title,
                  pizza.size === 0 ? 'Petite' : pizza.size === 1 ? 'Moyenne' : 'Grande',
                  pizza.extras.join(', '),
                  pizza.removedIngredients.join(', '),
                  pizza.price + '€',
                  pizza.quantity,
                  pizza.price * pizza.quantity + '€',
                ])),
                ...(pasta.map((pasta) => [
                    pasta.title,
                    pasta.size === 0 ? 'Petite' : pasta.size === 1 ? 'Moyenne' : 'Grande',
                    pasta.extras.join(', '),
                    pasta.removedIngredients.join(', '),
                    pasta.price + '€',
                    pasta.quantity,
                    pasta.price * pasta.quantity + '€',
                ])),
                ...(desserts.map((dessert) => [
                    dessert.title,
                    '',
                    '',
                    '',
                    dessert.price + '€',
                    dessert.quantity,
                    dessert.price * dessert.quantity + '€',
                ])),
            ],
          },
        },
        { text: '\n \n \n' },
        { text: `Total de la commande : ${total}€`,bold: true },
        { text: method === 0 ? "Paiement à effectuer" : "Paiement effectué"}
      ],
    };

    pdfMake.createPdf(documentDefinition).download('PizzaCo.pdf');
  };

  return (
    <div>
      <button className={s.btn} onClick={handleDownloadPDF}>Télécharger PDF</button>
    </div>
  );
}

export default PDFDocument;
